# @getlurk/sdk

The official Lurk API client for TypeScript and JavaScript. It runs in Node 20 and newer, browsers, Cloudflare Workers, Bun and Deno, and has no
runtime dependencies.

```bash
npm install @getlurk/sdk
```

```ts
import { Lurk } from "@getlurk/sdk";

const lurk = new Lurk(); // reads the key from LURK_KEY
const receipt = await lurk.events.send({ event: "checkin.scanned", user: "maya@example.com" });
```

**Keep the key on your server.** A secret key (`lurk_sk_…`) must never reach a browser or an app. Start in a Staging project so nothing reaches
real people until you mean it. See [docs.getlurk.com](https://docs.getlurk.com) for the guides.

## What it does for you

- **Idempotency keys.** Every write that can carry one gets one, made once per call and sent again on every retry.
- **Retries, only where they are safe.** Reads and writes with a key are retried on a connection error, `408` and `5xx`, twice by default, with jittered backoff. A rate-limit answer (`429`) is retried
  after the `Retry-After` it gives (up to 60 seconds; longer fails the call so you can decide). A write with no key (`api_keys.create`, `webhook_endpoints.create`: they return a secret that is shown once) is never repeated.
- **Typed errors.** `LurkError` has `status`, `code`, `param`, `requestId`, `docUrl` and `retryAfterSeconds`; `LurkConnectionError` means there was no answer.
- **Webhook checks.** `constructEvent(body, headers, secret)` verifies a delivery's signature and returns a typed event. It uses Web Crypto, so it runs everywhere above.
- **Cancellation and timeouts.** `{ signal }` and `{ timeoutMs }` per call or per client.

`keys.*` calls need a person (an owner or admin signed in to the dashboard); a project key gets `forbidden`. They are in the SDK because it covers the whole API.

## Lists and pages

```ts
import { Lurk, paginate, toArray } from "@getlurk/sdk";

for await (const rule of paginate(lurk.rules.list, { status: "live" })) console.log(rule.key);
const all = await toArray(paginate(lurk.units.list)); // when you know the list is short
```

`paginate` asks for the next page only when your loop wants it, and stops when the API says there are no more.

## Webhooks

```ts
const event = await constructEvent(rawBody, request.headers, process.env.LURK_WEBHOOK_SECRET!);
switch (event.type) {
  case "activity.created": /* event.data.receipts */ break;
  case "unit.used": /* event.data.unit, event.data.amount, event.data.reference */ break;
  default: /* a type Lurk adds later: ignore it */
}
```

A delivery's `id` is the same on every retry: keep the ones you have handled and skip repeats. A delivery whose timestamp is more than five minutes off is refused, so a captured one cannot be replayed later.

## Testing your own code

`@getlurk/sdk/testing` gives you a real client with no network, and a list of what it was asked:

```ts
import { createFakeLurk } from "@getlurk/sdk/testing";

const { lurk, calls } = createFakeLurk({ "events.send": { activity: "act_1", event: "evt_1", user: "u", receipts: [], skipped: [] } });
await lurk.events.send({ event: "checkin.scanned", user: "maya@example.com" });
// calls[0] is { operation: "events.send", input: { … }, idempotencyKey: "…" }
```

An operation you gave no answer for fails with a message that says what to add. For a full run against Lurk itself, use a Staging project and its key.

## Errors

A `LurkError` has `status`, `code`, `param`, `requestId`, `docUrl` and `nextStep` (one sentence on what to do), and `isRetryable(error)` says whether sending the same request again can work. Tolerate what you do not know: Lurk adds fields, enum values and event types over time, and never removes or renames one inside a version.

## Versions and changes

The SDK follows [semantic versioning](https://semver.org). The API's changes and the SDK's are in the [changelog](https://docs.getlurk.com/changelog).
Only the latest major version receives fixes.

## Help

Open an [issue](https://github.com/getlurk/lurk-sdk-js/issues) (never include a key; the `request_id` of an error is enough), or read
[CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). Licensed under the Apache License 2.0 (see [LICENSE](LICENSE) and [NOTICE](NOTICE)).
