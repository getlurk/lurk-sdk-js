import { describe, expect, it } from "vitest";
import { isRetryable, Lurk, LurkConnectionError, LurkError } from "./index.ts";

// Built from parts so that no key-shaped text sits in the source: the public export refuses anything that looks like one.
const KEY = ["lurk_sk", "test", "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG"].join("_");
const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", ...init.headers },
    ...init,
  });
const failure = (
  status: number,
  code: string,
  extra: Record<string, unknown> = {},
  headers: Record<string, string> = {},
) =>
  json(
    {
      error: {
        status,
        code,
        message: `message for ${code}`,
        request_id: "req_abc",
        doc_url: `https://docs.getlurk.com/errors#${code}`,
        next_step: `next step for ${code}`,
        ...extra,
      },
    },
    { status, headers },
  );

interface Call {
  url: string;
  init: RequestInit;
  body: Record<string, unknown> | undefined;
}
function setup(...answers: (Response | Error | (() => Promise<Response>))[]) {
  const calls: Call[] = [];
  const sleeps: number[] = [];
  const queue = [...answers];
  const fetchFn = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    calls.push({
      url: String(input),
      init,
      body: typeof init.body === "string" ? JSON.parse(init.body) : undefined,
    });
    const next = queue.length > 1 ? queue.shift() : queue[0];
    if (next instanceof Error) throw next;
    if (typeof next === "function") return next();
    return (next as Response).clone();
  }) as typeof fetch;
  const lurk = new Lurk({
    apiKey: KEY,
    baseUrl: "https://api.example.test/",
    fetch: fetchFn,
    sleep: async (ms) => void sleeps.push(ms),
  });
  return { lurk, calls, sleeps };
}
const headersOf = (c: Call | undefined) => (c?.init.headers ?? {}) as Record<string, string>;
const receipt = {
  activity: "act_1",
  user: "maya@example.com",
  event: "checkin.scanned",
  receipts: [],
  skipped: [],
};

describe("sending a call", () => {
  it("posts JSON with the key, and makes an idempotency key you did not give", async () => {
    const { lurk, calls } = setup(json(receipt));
    const result = await lurk.events.send({ event: "checkin.scanned", user: "maya@example.com" });
    expect(result).toEqual(receipt);
    const call = calls[0];
    expect(call?.url).toBe("https://api.example.test/v1/events");
    expect(call?.init.method).toBe("POST");
    expect(headersOf(call).authorization).toBe(`Bearer ${KEY}`);
    expect(headersOf(call)["content-type"]).toBe("application/json");
    expect(headersOf(call)["x-lurk-sdk"]).toMatch(/^typescript\//);
    expect(call?.body).toMatchObject({ event: "checkin.scanned", user: "maya@example.com" });
    expect(call?.body?.idempotency_key).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("keeps the idempotency key you give, in the body or as an option", async () => {
    const a = setup(json(receipt));
    await a.lurk.events.send({ event: "a.b", user: "u", idempotency_key: "mine" });
    expect(a.calls[0]?.body?.idempotency_key).toBe("mine");
    const b = setup(json(receipt));
    await b.lurk.events.send({ event: "a.b", user: "u" }, { idempotencyKey: "from-option" });
    expect(b.calls[0]?.body?.idempotency_key).toBe("from-option");
  });

  it("puts path parameters in the path and query parameters in the query", async () => {
    const { lurk, calls } = setup(
      json({ id: "rule_1", status: "live" }),
      json({ data: [], has_more: false, next_cursor: null }),
    );
    await lurk.rules.publish({ id: "rule_a/b" });
    expect(calls[0]?.url).toBe("https://api.example.test/v1/rules/rule_a%2Fb/live");
    expect(calls[0]?.body).toEqual({});
    await lurk.apiKeys.list({ limit: 5, cursor: "abc" });
    expect(calls[1]?.url).toBe("https://api.example.test/v1/api-keys?limit=5&cursor=abc");
    expect(calls[1]?.init.method).toBe("GET");
    expect(calls[1]?.init.body).toBeUndefined();
    expect(headersOf(calls[1])["content-type"]).toBeUndefined();
  });

  it("lets a list be called with nothing", async () => {
    const { lurk, calls } = setup(json({ data: [], has_more: false, next_cursor: null }));
    await lurk.webhookEndpoints.list();
    expect(calls[0]?.url).toBe("https://api.example.test/v1/webhook-endpoints");
  });

  it("sends the idempotency key as a header where the body has none", async () => {
    const { lurk, calls } = setup(json({ id: "rule_1" }, { status: 201 }));
    await lurk.rules.create({
      name: "Tap",
      when: { event: "card.tapped" },
      do: [{ unit: "beans", add: 1 }],
    });
    expect(headersOf(calls[0])["idempotency-key"]).toMatch(/^[0-9a-f-]{36}$/);
    expect(calls[0]?.body).not.toHaveProperty("idempotency_key");
  });
});

describe("errors", () => {
  it("turns an error body into a LurkError with everything to act on", async () => {
    const { lurk } = setup(failure(422, "validation_failed", { param: "event" }));
    const error = await lurk.events.send({ event: "Bad", user: "u" }).catch((e) => e);
    expect(error).toBeInstanceOf(LurkError);
    expect(error).toMatchObject({
      name: "LurkError",
      status: 422,
      code: "validation_failed",
      param: "event",
      requestId: "req_abc",
      docUrl: "https://docs.getlurk.com/errors#validation_failed",
      nextStep: "next step for validation_failed",
      message: "message for validation_failed",
    });
  });

  it("says which errors are worth sending again", async () => {
    const retryable = new LurkError({ status: 429, code: "rate_limited", message: "x" });
    const refused = new LurkError({ status: 422, code: "validation_failed", message: "x" });
    expect(isRetryable(retryable)).toBe(true);
    expect(isRetryable(new LurkConnectionError("no answer"))).toBe(true);
    expect(isRetryable(refused)).toBe(false);
    expect(isRetryable(new Error("x"))).toBe(false);
  });

  it("does not retry a client error", async () => {
    const { lurk, calls } = setup(failure(401, "invalid_key"));
    await expect(lurk.events.send({ event: "a.b", user: "u" })).rejects.toMatchObject({
      code: "invalid_key",
    });
    expect(calls).toHaveLength(1);
  });

  it("copes with an answer that is not ours (a proxy, an outage)", async () => {
    const { lurk } = setup(new Response("<html>Bad gateway</html>", { status: 502 }));
    const error = await lurk.apiKeys.list({}, { maxRetries: 0 }).catch((e) => e);
    expect(error).toMatchObject({
      status: 502,
      code: "internal",
      message: "The API answered 502.",
    });
  });
});

describe("retries", () => {
  it("retries a write that carries a key, with the same key, until it works", async () => {
    const { lurk, calls, sleeps } = setup(
      failure(503, "internal"),
      new Error("socket hang up"),
      json(receipt),
    );
    const result = await lurk.events.send({ event: "a.b", user: "u" });
    expect(result).toEqual(receipt);
    expect(calls).toHaveLength(3);
    expect(new Set(calls.map((c) => c.body?.idempotency_key)).size).toBe(1);
    expect(sleeps).toHaveLength(2);
    expect(sleeps.every((ms) => ms > 0 && ms <= 8_000)).toBe(true);
  });

  it("gives up after the retries and says what failed", async () => {
    const { lurk, calls } = setup(failure(500, "internal"));
    await expect(lurk.events.send({ event: "a.b", user: "u" })).rejects.toMatchObject({
      status: 500,
    });
    expect(calls).toHaveLength(3); // the first try and two retries
    const none = setup(failure(500, "internal"));
    await expect(
      none.lurk.events.send({ event: "a.b", user: "u" }, { maxRetries: 0 }),
    ).rejects.toBeInstanceOf(LurkError);
    expect(none.calls).toHaveLength(1);
  });

  it("never repeats a write that has no key after a server error or a lost connection", async () => {
    const a = setup(failure(500, "internal"));
    await expect(a.lurk.apiKeys.create({ name: "x" })).rejects.toMatchObject({ status: 500 });
    expect(a.calls).toHaveLength(1);
    const b = setup(new Error("connection reset"));
    await expect(
      b.lurk.webhookEndpoints.create({ url: "https://example.com/h" }),
    ).rejects.toBeInstanceOf(LurkConnectionError);
    expect(b.calls).toHaveLength(1);
  });

  it("waits as long as the API asks when rate limited, for any call", async () => {
    const { lurk, calls, sleeps } = setup(
      failure(429, "rate_limited", {}, { "retry-after": "2" }),
      json({ id: "key_1", secret: "lurk_sk_test_x" }, { status: 201 }),
    );
    await lurk.apiKeys.create({ name: "x" });
    expect(sleeps).toEqual([2000]);
    expect(calls).toHaveLength(2);
  });

  it("does not wait minutes: a long Retry-After fails the call so you can decide", async () => {
    const { lurk, calls, sleeps } = setup(
      failure(429, "rate_limited", {}, { "retry-after": "300" }),
    );
    const error = await lurk.events.send({ event: "a.b", user: "u" }).catch((e) => e);
    expect(error).toMatchObject({ code: "rate_limited", retryAfterSeconds: 300 });
    expect(calls).toHaveLength(1);
    expect(sleeps).toEqual([]);
  });

  it("retries a read", async () => {
    const { lurk, calls } = setup(
      failure(502, "internal"),
      json({ data: [], has_more: false, next_cursor: null }),
    );
    await lurk.apiKeys.list();
    expect(calls).toHaveLength(2);
  });
});

describe("timeouts and cancelling", () => {
  const hangs = () => (init: RequestInit) =>
    new Promise<Response>((_, reject) => {
      init.signal?.addEventListener("abort", () =>
        reject(init.signal?.reason ?? new Error("aborted")),
      );
    });

  it("cuts a call off that never answers", async () => {
    const lurk = new Lurk({
      apiKey: KEY,
      fetch: ((_: unknown, init: RequestInit) => hangs()(init)) as typeof fetch,
      sleep: async () => {},
    });
    const error = await lurk.apiKeys.create({ name: "x" }, { timeoutMs: 20 }).catch((e) => e);
    expect(error).toBeInstanceOf(LurkConnectionError);
    expect(error.message).toBe("The API did not answer in time.");
  });

  it("stops when you cancel", async () => {
    const controller = new AbortController();
    const lurk = new Lurk({
      apiKey: KEY,
      fetch: ((_: unknown, init: RequestInit) => hangs()(init)) as typeof fetch,
      sleep: async () => {},
    });
    const pending = lurk.events
      .send({ event: "a.b", user: "u" }, { signal: controller.signal })
      .catch((e) => e);
    controller.abort();
    const error = await pending;
    expect(error).toBeInstanceOf(LurkConnectionError);
    expect(error.message).toBe("The call was cancelled.");
  });
});

describe("setting up", () => {
  it("wants a project key, from the options or from LURK_KEY", () => {
    const saved = process.env.LURK_KEY;
    try {
      delete process.env.LURK_KEY;
      expect(() => new Lurk()).toThrow(/LURK_KEY/);
      process.env.LURK_KEY = KEY;
      expect(() => new Lurk()).not.toThrow();
    } finally {
      if (saved === undefined) delete process.env.LURK_KEY;
      else process.env.LURK_KEY = saved;
    }
    expect(() => new Lurk({ apiKey: "" })).toThrow(/lurk_sk_/);
    expect(() => new Lurk({ apiKey: "sk-something-else" })).toThrow(/lurk_sk_/);
  });
});
