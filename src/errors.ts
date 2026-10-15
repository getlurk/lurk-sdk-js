import type { ErrorBody } from "./generated/schema.ts";

/** Every error code the API can return (the `code` field of the error body). */
export type ErrorCode = ErrorBody["error"]["code"];

/**
 * The API answered with an error. `code` is the stable part to branch on; `message` is a sentence you can show.
 * `requestId` is what to quote to support, and `docUrl` explains the code.
 */
export class LurkError extends Error {
  readonly status: number;
  readonly code: ErrorCode;
  readonly param: string | undefined;
  readonly requestId: string | undefined;
  readonly docUrl: string | undefined;
  /** What to do about this kind of error, in one sentence (the same text as the docs). */
  readonly nextStep: string | undefined;
  /** For `rate_limited`: how long the API asked you to wait. */
  readonly retryAfterSeconds: number | undefined;

  constructor(init: {
    status: number;
    code: ErrorCode;
    message: string;
    param?: string | undefined;
    requestId?: string | undefined;
    docUrl?: string | undefined;
    nextStep?: string | undefined;
    retryAfterSeconds?: number | undefined;
  }) {
    super(init.message);
    this.name = "LurkError";
    this.status = init.status;
    this.code = init.code;
    this.param = init.param;
    this.requestId = init.requestId;
    this.docUrl = init.docUrl;
    this.nextStep = init.nextStep;
    this.retryAfterSeconds = init.retryAfterSeconds;
  }
}

/** Whether sending the same request again, with the same idempotency key, can work: Lurk did not take it and may next time. */
export const isRetryable = (error: unknown): boolean =>
  error instanceof LurkConnectionError ||
  (error instanceof LurkError &&
    (error.code === "rate_limited" || error.code === "internal" || error.code === "unavailable"));

/** The request never got an answer: no connection, a timeout, or it was cancelled. */
export class LurkConnectionError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "LurkConnectionError";
  }
}

/** The webhook's signature did not check out, or its timestamp is too old. Do not trust the body. */
export class WebhookVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookVerificationError";
  }
}
