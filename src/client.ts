import { LurkConnectionError, LurkError } from "./errors.ts";
import { type OperationId, operations } from "./generated/operations.ts";
import { createResources } from "./generated/resources.ts";
import type { RequestOptions } from "./types.ts";

export const SDK_VERSION = "0.2.0";

export interface LurkOptions {
  /** A project key (`lurk_sk_…`). Keep it on your server, never in an app or a browser. Defaults to the `LURK_KEY` environment variable. */
  apiKey?: string;
  /** Defaults to `https://api.getlurk.com`. */
  baseUrl?: string;
  /** How many times to retry a call that is safe to retry. Default 2. */
  maxRetries?: number;
  /** Cut a call off after this many milliseconds. Default 30000. */
  timeoutMs?: number;
  /** Use another `fetch` (a test double, a proxy-aware one). */
  fetch?: typeof fetch;
  /** Replace the wait between retries (tests). */
  sleep?: (ms: number) => Promise<void>;
}

const DEFAULT_BASE_URL = "https://api.getlurk.com";
/** If the API asks for a longer wait than this, the call fails with `rate_limited` instead of hanging. */
const MAX_RETRY_AFTER_MS = 60_000;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** The Lurk API. Every method is generated from the OpenAPI file, so it matches the API exactly. */
export interface Lurk extends ReturnType<typeof createResources> {}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: see the interface above
export class Lurk {
  readonly #apiKey: string;
  readonly #baseUrl: string;
  readonly #maxRetries: number;
  readonly #timeoutMs: number;
  readonly #fetch: typeof fetch;
  readonly #sleep: (ms: number) => Promise<void>;

  constructor(options: LurkOptions = {}) {
    const apiKey =
      options.apiKey ?? (typeof process === "undefined" ? undefined : process.env.LURK_KEY);
    if (!apiKey?.startsWith("lurk_sk_")) {
      throw new Error(
        "Lurk: no project key. Pass { apiKey } or set LURK_KEY to a key that starts with lurk_sk_.",
      );
    }
    this.#apiKey = apiKey;
    this.#baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.#maxRetries = options.maxRetries ?? 2;
    this.#timeoutMs = options.timeoutMs ?? 30_000;
    this.#fetch = options.fetch ?? ((input, init) => globalThis.fetch(input, init));
    this.#sleep = options.sleep ?? wait;
    Object.assign(
      this,
      createResources((id, input, o) => this.#call(id, input, o)),
    );
  }

  async #call(id: OperationId, input: unknown, options: RequestOptions = {}): Promise<unknown> {
    const op = operations[id];
    const rest: Record<string, unknown> = { ...(input as Record<string, unknown> | undefined) };

    let path: string = op.path;
    for (const name of op.pathParams) {
      path = path.replace(`{${name}}`, encodeURIComponent(String(rest[name])));
      delete rest[name];
    }
    const query = new URLSearchParams();
    for (const name of op.queryParams) {
      if (rest[name] !== undefined) query.set(name, String(rest[name]));
      delete rest[name];
    }

    // One key per call, reused on every retry: that is what makes a retry safe.
    let key: string | undefined;
    if (op.idempotency !== null) {
      key =
        options.idempotencyKey ??
        (typeof rest.idempotency_key === "string" ? rest.idempotency_key : undefined) ??
        crypto.randomUUID();
      if (op.idempotency === "body") rest.idempotency_key = key;
    }

    const headers: Record<string, string> = {
      authorization: `Bearer ${this.#apiKey}`,
      accept: "application/json",
      "x-lurk-sdk": `typescript/${SDK_VERSION}`,
      ...options.headers,
    };
    if (op.idempotency === "header" && key) headers["idempotency-key"] = key;
    let body: string | undefined;
    if (op.body) {
      headers["content-type"] = "application/json";
      body = JSON.stringify(rest);
    }
    const url = `${this.#baseUrl}${path}${query.size > 0 ? `?${query}` : ""}`;

    // A retry is safe when repeating the call cannot do the thing twice: reads, and writes that carry a key.
    // A rate-limit answer is always safe to retry, because the API refuses before it does anything.
    const safe = op.method === "GET" || op.idempotency !== null;
    const maxRetries = options.maxRetries ?? this.#maxRetries;

    for (let attempt = 0; ; attempt++) {
      let response: Response;
      try {
        response = await this.#send(
          url,
          { method: op.method, headers, ...(body === undefined ? {} : { body }) },
          options,
        );
      } catch (error) {
        if (options.signal?.aborted)
          throw new LurkConnectionError("The call was cancelled.", { cause: error });
        if (safe && attempt < maxRetries) {
          await this.#sleep(backoff(attempt));
          continue;
        }
        throw new LurkConnectionError(
          error instanceof Error && error.name === "TimeoutError"
            ? "The API did not answer in time."
            : "Could not reach the API.",
          { cause: error },
        );
      }

      if (response.ok) return parse(response);

      const error = await toError(response);
      const retryable =
        response.status === 429 || (safe && (response.status === 408 || response.status >= 500));
      if (retryable && attempt < maxRetries) {
        const asked =
          error.retryAfterSeconds === undefined ? undefined : error.retryAfterSeconds * 1000;
        if (asked === undefined || asked <= MAX_RETRY_AFTER_MS) {
          await this.#sleep(asked ?? backoff(attempt));
          continue;
        }
      }
      throw error;
    }
  }

  async #send(url: string, init: RequestInit, options: RequestOptions): Promise<Response> {
    const timeout = AbortSignal.timeout(options.timeoutMs ?? this.#timeoutMs);
    const signal = options.signal ? AbortSignal.any([timeout, options.signal]) : timeout;
    return this.#fetch(url, { ...init, signal });
  }
}

/** Half a second, doubling, never more than eight, with jitter so clients do not retry in step. */
function backoff(attempt: number): number {
  return Math.min(8_000, 500 * 2 ** attempt) * (0.5 + Math.random() / 2);
}

async function parse(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;
  try {
    return await response.json();
  } catch {
    throw new LurkError({
      status: response.status,
      code: "internal",
      message: "The API answered with something that isn't JSON.",
      requestId: response.headers.get("request-id") ?? undefined,
    });
  }
}

async function toError(response: Response): Promise<LurkError> {
  const requestId = response.headers.get("request-id") ?? undefined;
  const retryAfter = Number(response.headers.get("retry-after"));
  const retryAfterSeconds = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : undefined;
  try {
    const { error } = (await response.json()) as {
      error: {
        status: number;
        code: LurkError["code"];
        message: string;
        param?: string;
        request_id?: string;
        doc_url?: string;
        next_step?: string;
      };
    };
    return new LurkError({
      status: response.status,
      code: error.code,
      message: error.message,
      param: error.param,
      requestId: error.request_id ?? requestId,
      docUrl: error.doc_url,
      nextStep: error.next_step,
      retryAfterSeconds,
    });
  } catch {
    // Not our envelope: a proxy or an outage in front of the API.
    return new LurkError({
      status: response.status,
      code: response.status === 429 ? "rate_limited" : "internal",
      message: `The API answered ${response.status}.`,
      requestId,
      retryAfterSeconds,
    });
  }
}
