import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { Lurk } from "./index.ts";

const dir = new URL("./", import.meta.url);
const sources = readdirSync(dir).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"));
const all = [
  ...sources,
  ...readdirSync(new URL("./generated/", import.meta.url)).map((f) => `generated/${f}`),
];

describe("the SDK runs where Node is not", () => {
  it("imports nothing from Node: not a node: module, not Buffer, not require", () => {
    for (const file of all) {
      const text = readFileSync(new URL(file, dir), "utf8");
      expect(text, file).not.toMatch(/from\s+["']node:|require\(|\bBuffer\b|\bprocess\.(?!env)/);
    }
  });

  it("works with no `process` at all (a browser, a Worker) when it is given the key", async () => {
    vi.stubGlobal("process", undefined);
    try {
      const fetched: string[] = [];
      const lurk = new Lurk({
        apiKey: "lurk_sk_test_portable",
        baseUrl: "https://example.test",
        fetch: async (url) => {
          fetched.push(String(url));
          return new Response(JSON.stringify({ data: [], has_more: false, next_cursor: null }), {
            headers: { "content-type": "application/json" },
          });
        },
      });
      await lurk.rules.list();
      expect(fetched).toEqual(["https://example.test/v1/rules"]);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
