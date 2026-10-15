import type { RequestOptions } from "./types.ts";

/** What every paged list answers with. */
interface Page<T> {
  data: T[];
  has_more: boolean;
  next_cursor: string | null;
}

/**
 * Every item of a paged list, fetching the next page as you go:
 *
 * ```ts
 * for await (const rule of paginate(lurk.rules.list, { status: "live" })) console.log(rule.key);
 * ```
 *
 * Stops when the API says there are no more. `options` (a signal, a timeout) applies to every page.
 */
export async function* paginate<I extends { cursor?: string | undefined }, T>(
  list: (input: I, options?: RequestOptions) => Promise<Page<T>>,
  input: Omit<I, "cursor"> & { cursor?: string | undefined } = {} as I,
  options?: RequestOptions,
): AsyncGenerator<T, void, undefined> {
  let cursor: string | undefined = input.cursor;
  for (;;) {
    const page = await list(
      { ...input, ...(cursor === undefined ? {} : { cursor }) } as I,
      options,
    );
    yield* page.data;
    if (!page.has_more || !page.next_cursor) return;
    cursor = page.next_cursor;
  }
}

/** Collects what `paginate` yields: `await toArray(paginate(lurk.rules.list))`. Use it when you know the list is short. */
export async function toArray<T>(items: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const item of items) out.push(item);
  return out;
}
