import { readFileSync } from "fs";
import { resolve } from "path";

import getFrequency from "./";

test("examples", () => {
  expect(getFrequency("+1, -2, +3, +1")).toBe(3);
  expect(getFrequency("+1, +1, +1")).toBe(3);
  expect(getFrequency("+1, +1, -2")).toBe(0);
  expect(getFrequency("-1, -2, -3")).toBe(-6);
});

test("edge cases", () => {
  expect(getFrequency("+1,,,")).toBe(1);
  expect(getFrequency("")).toBe(0);
});

test("delimiter", () => {
  expect(
    getFrequency(
      `+1
+2
+3
-2
`,
      "\n"
    )
  ).toBe(4);
});

test("examples 2", () => {
  expect(getFrequency("+1, -2, +3, +1", undefined, true)).toBe(2);
  expect(getFrequency("+1, -1", undefined, true)).toBe(0);
  expect(getFrequency("+3, +3, +4, -2, -4", undefined, true)).toBe(10);
  expect(getFrequency("-6, +3, +8, +5, -6", undefined, true)).toBe(5);
  expect(getFrequency("+7, +7, -2, -7, -4", undefined, true)).toBe(14);
});
