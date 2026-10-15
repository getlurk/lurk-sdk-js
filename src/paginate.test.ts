import { describe, expect, it } from "vitest";
import { paginate, toArray } from "./index.ts";

type Rule = { key: string };
interface Page {
  data: Rule[];
  has_more: boolean;
  next_cursor: string | null;
}

/** A list that answers three pages of two, and remembers what it was asked. */
function list() {
  const asked: { limit?: number; cursor?: string | undefined }[] = [];
  const pages: Record<string, Page> = {
    "": { data: [{ key: "a" }, { key: "b" }], has_more: true, next_cursor: "p2" },
    p2: { data: [{ key: "c" }, { key: "d" }], has_more: true, next_cursor: "p3" },
    p3: { data: [{ key: "e" }], has_more: false, next_cursor: null },
  };
  const fn = async (input: { limit?: number; cursor?: string | undefined }) => {
    asked.push(input);
    return pages[input.cursor ?? ""] as Page;
  };
  return { fn, asked };
}

describe("paginate", () => {
  it("yields every item of every page, asking for the next page only when it is wanted", async () => {
    const { fn, asked } = list();
    const seen: string[] = [];
    for await (const rule of paginate(fn, { limit: 2 })) {
      seen.push(rule.key);
      if (rule.key === "b") expect(asked).toHaveLength(1);
    }
    expect(seen).toEqual(["a", "b", "c", "d", "e"]);
    expect(asked.map((a) => a.cursor)).toEqual([undefined, "p2", "p3"]);
    expect(asked.every((a) => a.limit === 2)).toBe(true);
  });

  it("stops early when the loop does, without fetching the rest", async () => {
    const { fn, asked } = list();
    for await (const rule of paginate(fn, {})) if (rule.key === "a") break;
    expect(asked).toHaveLength(1);
  });

  it("starts from a cursor you give, and collects with toArray", async () => {
    const { fn } = list();
    expect((await toArray(paginate(fn, { cursor: "p2" }))).map((r) => r.key)).toEqual([
      "c",
      "d",
      "e",
    ]);
  });

  it("passes the call options to every page", async () => {
    const seen: unknown[] = [];
    const fn = async (
      _input: { cursor?: string | undefined },
      options?: { timeoutMs?: number },
    ) => {
      seen.push(options);
      return { data: [], has_more: false, next_cursor: null };
    };
    await toArray(paginate(fn, {}, { timeoutMs: 5 }));
    expect(seen).toEqual([{ timeoutMs: 5 }]);
  });
});
