export interface RequestOptions {
  /** Overrides the client's retry count for this call. */
  maxRetries?: number;
  /** Overrides the client's timeout (milliseconds) for this call. */
  timeoutMs?: number;
  /** Cancels the call. */
  signal?: AbortSignal;
  /** Your own idempotency key for this call. Left out, the SDK makes one and reuses it on every retry. */
  idempotencyKey?: string;
  /** Extra headers, such as `traceparent` to join your trace to ours. */
  headers?: Record<string, string>;
}
