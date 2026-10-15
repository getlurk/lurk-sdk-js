import { WebhookVerificationError } from "./errors.ts";
import type { Receipt } from "./generated/schema.ts";

/** A person did something that a rule paid for. `data` is the same receipt `events.send` returned. */
export interface ActivityCreatedEvent {
  /** The delivery id (`whd_…`). The same on every retry: use it to ignore repeats. */
  id: string;
  type: "activity.created";
  created_at: string;
  data: {
    activity: string;
    event: string | null;
    /** Your own identifier for the person, as you sent it. */
    user: string;
    receipts: Receipt[];
  };
}

export interface RuleLiveEvent {
  id: string;
  type: "rule.live";
  created_at: string;
  data: { rule: string; key: string; name: string; version: number };
}

/** Someone redeemed some of a unit (`units.use`): a coupon at the till, a ticket at the door. */
export interface UnitUsedEvent {
  id: string;
  type: "unit.used";
  created_at: string;
  data: {
    /** The receipt's ID (`act_…`). */
    activity: string;
    /** Your own identifier for the person, as you sent it. */
    user: string;
    unit: string;
    amount: number;
    /** What they hold of it now. */
    balance: number;
    /** Your own scan or redemption ID, if you sent one. */
    reference: string | null;
    reason: string | null;
  };
}

/**
 * What a delivery can be. Lurk adds event types over time, and `constructEvent` returns one it does not know as it arrived: end a
 * `switch (event.type)` with a `default` that ignores the rest, and treat every field you do not read as none of your business.
 */
export type WebhookEvent = ActivityCreatedEvent | RuleLiveEvent | UnitUsedEvent;

type Headers = Record<string, string | string[] | undefined> | { get(name: string): string | null };

const DEFAULT_TOLERANCE_SECONDS = 300;
const encoder = new TextEncoder();

function header(headers: Headers, name: string): string | undefined {
  if ("get" in headers && typeof headers.get === "function") return headers.get(name) ?? undefined;
  const found = Object.entries(headers as Record<string, string | string[] | undefined>).find(
    ([k]) => k.toLowerCase() === name,
  )?.[1];
  return Array.isArray(found) ? found[0] : found;
}

function base64ToBytes(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Checks a webhook delivery and returns the event. Pass the raw body text (not parsed JSON), the request headers and the
 * endpoint's secret (`whsec_…`). Throws `WebhookVerificationError` if the signature does not match or the timestamp is
 * more than five minutes off. Standard Webhooks signing: HMAC-SHA-256 over `<id>.<timestamp>.<body>`.
 */
export async function constructEvent(
  body: string,
  headers: Headers,
  secret: string,
  options: { toleranceSeconds?: number; now?: () => number } = {},
): Promise<WebhookEvent> {
  const id = header(headers, "webhook-id");
  const timestamp = Number(header(headers, "webhook-timestamp"));
  const signatures = header(headers, "webhook-signature");
  if (!id || !signatures || !Number.isInteger(timestamp)) {
    throw new WebhookVerificationError("The webhook headers are missing.");
  }
  const now = Math.floor((options.now?.() ?? Date.now()) / 1000);
  if (Math.abs(now - timestamp) > (options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS)) {
    throw new WebhookVerificationError("The webhook timestamp is too old or too new.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    base64ToBytes(secret.startsWith("whsec_") ? secret.slice(6) : secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const signed = encoder.encode(`${id}.${timestamp}.${body}`);
  for (const candidate of signatures.split(" ")) {
    const [version, value] = candidate.split(",");
    if (version !== "v1" || !value) continue;
    let bytes: Uint8Array<ArrayBuffer>;
    try {
      bytes = base64ToBytes(value);
    } catch {
      continue;
    }
    // `verify` compares in constant time.
    if (await crypto.subtle.verify("HMAC", key, bytes, signed)) {
      try {
        return JSON.parse(body) as WebhookEvent;
      } catch {
        throw new WebhookVerificationError("The webhook body isn't JSON.");
      }
    }
  }
  throw new WebhookVerificationError("The webhook signature does not match.");
}
