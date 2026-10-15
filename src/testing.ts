import { Lurk } from "./client.ts";
import { type OperationId, operations } from "./generated/operations.ts";
import type { OperationOutputs } from "./generated/outputs.ts";

/** What a fake answers an operation with: the answer, or a function of the request's input. */
type Answer<Id extends OperationId> =
  | OperationOutputs[Id]
  | ((input: Record<string, unknown>, call: FakeCall) => OperationOutputs[Id]);

export type FakeAnswers = { [Id in OperationId]?: Answer<Id> };

/** One request a fake received, as the SDK made it. */
export interface FakeCall {
  operation: OperationId;
  /** The body (or the query, for a read) the SDK sent, without the idempotency key. */
  input: Record<string, unknown>;
  /** The idempotency key the SDK made or was given; the same on every retry of one call. */
  idempotencyKey: string | undefined;
}

const template = (path: string): RegExp =>
  new RegExp(`^${path.replace(/\{[^}]+\}/g, "([^/]+)").replace(/\//g, "\\/")}$`);
const matchers = (Object.keys(operations) as OperationId[]).map((id) => ({
  id,
  method: operations[id].method as string,
  path: template(operations[id].path),
  // A literal segment (`/v1/units/give`) must win over a parameter one (`/v1/units/{id}`).
  specificity: operations[id].path.split("/").filter((s) => !s.startsWith("{")).length,
}));

/**
 * A client for your own tests, with no network: a real `Lurk` (so it makes idempotency keys, reads answers and raises the errors the real one
 * does) whose `fetch` answers from what you give it, and a list of the calls it received.
 *
 * ```ts
 * const { lurk, calls } = createFakeLurk({ "events.send": { activity: "act_1", event: "x", user: "u", receipts: [], skipped: [] } });
 * await lurk.events.send({ event: "checkin.scanned", user: "maya@example.com" });
 * expect(calls[0]?.operation).toBe("events.send");
 * ```
 *
 * An operation you did not give an answer for fails the test with a message that says so, instead of quietly returning nothing.
 */
export function createFakeLurk(answers: FakeAnswers = {}): { lurk: Lurk; calls: FakeCall[] } {
  const calls: FakeCall[] = [];
  const fake: typeof fetch = async (input, init) => {
    const url = new URL(String(input));
    const method = init?.method ?? "GET";
    const found = matchers
      .filter((m) => m.method === method && m.path.test(url.pathname))
      .sort((a, b) => b.specificity - a.specificity)[0];
    if (!found) throw new Error(`createFakeLurk: no operation for ${method} ${url.pathname}`);
    // What the SDK took out of the body and put in the path (`{id}`) is part of the input a test cares about.
    const fromPath = Object.fromEntries(
      operations[found.id].pathParams.map((name, i) => [
        name,
        decodeURIComponent(found.path.exec(url.pathname)?.[i + 1] ?? ""),
      ]),
    );
    const sent = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : {};
    const headers = new Headers(init?.headers);
    const { idempotency_key: bodyKey, ...rest } = sent;
    const call: FakeCall = {
      operation: found.id,
      input: { ...fromPath, ...Object.fromEntries(url.searchParams), ...rest },
      idempotencyKey:
        headers.get("idempotency-key") ?? (typeof bodyKey === "string" ? bodyKey : undefined),
    };
    calls.push(call);
    const answer = answers[found.id] as Answer<typeof found.id> | undefined;
    if (answer === undefined) {
      throw new Error(
        `createFakeLurk: no answer for ${found.id}. Give one: createFakeLurk({ "${found.id}": … })`,
      );
    }
    const body = typeof answer === "function" ? answer(call.input, call) : answer;
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json", "request-id": "req_fake" },
    });
  };
  return {
    lurk: new Lurk({
      apiKey: "lurk_sk_fake_for_tests",
      baseUrl: "https://fake.lurk.test",
      fetch: fake,
      maxRetries: 0,
    }),
    calls,
  };
}
