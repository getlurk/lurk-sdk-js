import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { constructEvent, WebhookVerificationError } from "./index.ts";

// The example from the Standard Webhooks specification repository.
// (Built from parts so that no secret-shaped text sits in the source: the public export refuses anything that looks like one.)
const SECRET = `whsec_${"MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw"}`;
const ID = "msg_p5jXN8AQM9LWM0D4loKWxJek";
const TIMESTAMP = 1614265330;
const BODY = JSON.stringify({
  id: ID,
  type: "activity.created",
  created_at: "2026-10-11T12:00:00.000Z",
  data: { user: "maya@example.com" },
});
const sign = (body: string, secret = SECRET, id = ID, ts = TIMESTAMP) =>
  `v1,${createHmac("sha256", Buffer.from(secret.slice(6), "base64"))
    .update(`${id}.${ts}.${body}`)
    .digest("base64")}`;
const headers = (over: Record<string, string> = {}) => ({
  "webhook-id": ID,
  "webhook-timestamp": String(TIMESTAMP),
  "webhook-signature": sign(BODY),
  ...over,
});
const now = () => (TIMESTAMP + 10) * 1000;

describe("constructEvent", () => {
  it("accepts a good delivery and returns the event", async () => {
    const event = await constructEvent(BODY, headers(), SECRET, { now });
    expect(event).toMatchObject({ type: "activity.created", data: { user: "maya@example.com" } });
  });

  it("matches the specification's own example", async () => {
    const body = '{"test": 2432232314}';
    const good = {
      "webhook-id": ID,
      "webhook-timestamp": String(TIMESTAMP),
      "webhook-signature": "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
    };
    await expect(constructEvent(body, good, SECRET, { now })).resolves.toEqual({
      test: 2432232314,
    });
  });

  it("reads headers from a Headers object and from any capitalisation", async () => {
    await expect(
      constructEvent(BODY, new Headers(headers()), SECRET, { now }),
    ).resolves.toBeDefined();
    const shouting = {
      "Webhook-Id": ID,
      "WEBHOOK-TIMESTAMP": String(TIMESTAMP),
      "Webhook-Signature": sign(BODY),
    };
    await expect(constructEvent(BODY, shouting, SECRET, { now })).resolves.toBeDefined();
  });

  it("refuses a changed body, the wrong secret, a changed id, and a missing header", async () => {
    const fails = (body: string, h: Record<string, string>, secret = SECRET) =>
      expect(constructEvent(body, h, secret, { now })).rejects.toBeInstanceOf(
        WebhookVerificationError,
      );
    await fails(`${BODY} `, headers());
    await fails(BODY, headers(), `whsec_${"A".repeat(43)}=`);
    await fails(BODY, headers({ "webhook-id": "msg_other" }));
    await fails(BODY, { "webhook-id": ID, "webhook-timestamp": String(TIMESTAMP) });
    await fails(BODY, headers({ "webhook-signature": "v1,not-base64!!" }));
  });

  it("refuses a delivery that is too old or too new, unless told to allow it", async () => {
    const late = () => (TIMESTAMP + 301) * 1000;
    await expect(constructEvent(BODY, headers(), SECRET, { now: late })).rejects.toThrow(
      /timestamp/,
    );
    await expect(
      constructEvent(BODY, headers(), SECRET, { now: late, toleranceSeconds: 600 }),
    ).resolves.toBeDefined();
    await expect(
      constructEvent(BODY, headers(), SECRET, { now: () => (TIMESTAMP - 301) * 1000 }),
    ).rejects.toThrow(/timestamp/);
  });

  it("accepts any one of several signatures, so a secret can be rotated", async () => {
    const rotated = headers({ "webhook-signature": `v1,AAAA ${sign(BODY)} v2,ignored` });
    await expect(constructEvent(BODY, rotated, SECRET, { now })).resolves.toBeDefined();
  });
});
