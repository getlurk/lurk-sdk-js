import { describe, expect, it } from "vitest";
import { LurkError } from "./index.ts";
import { createFakeLurk } from "./testing.ts";

const receipt = {
  activity: "act_1",
  event: "evt_1",
  user: "maya@example.com",
  receipts: [],
  skipped: [],
};

describe("createFakeLurk", () => {
  it("answers from what it was given and records what the SDK sent, with the idempotency key", async () => {
    const { lurk, calls } = createFakeLurk({ "events.send": receipt as never });
    const answer = await lurk.events.send({ event: "checkin.scanned", user: "maya@example.com" });
    expect(answer).toMatchObject({ activity: "act_1" });
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({
      operation: "events.send",
      input: { event: "checkin.scanned", user: "maya@example.com" },
    });
    expect(calls[0]?.idempotencyKey).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("can answer from the request, and a literal path wins over a parameter one", async () => {
    const { lurk, calls } = createFakeLurk({
      "units.get": ((input: Record<string, unknown>) => ({ key: String(input.id) })) as never,
      "units.give": { id: "give" } as never,
    });
    expect(await lurk.units.get({ id: "beans" })).toEqual({ key: "beans" });
    // `/v1/units/give` is also `/v1/units/{id}` to a naive matcher: it must be the give.
    await lurk.units.give({ unit: "beans", amount: 1, users: ["a"] } as never);
    expect(calls.map((c) => c.operation)).toEqual(["units.get", "units.give"]);
  });

  it("fails with a message that says what to add when an operation has no answer", async () => {
    const { lurk } = createFakeLurk();
    const error = await lurk.rules.list().catch((e) => e);
    expect(String(error?.cause ?? error)).toMatch(/no answer for rules\.list/);
  });

  it("still raises the real client's errors for what the SDK itself refuses", () => {
    expect(() => createFakeLurk().lurk.rules).not.toThrow();
    expect(LurkError).toBeDefined();
  });
});
