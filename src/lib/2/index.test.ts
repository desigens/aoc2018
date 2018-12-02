import boxesChecksum, { counterHelper } from "./";

test("helper", () => {
  expect(counterHelper("abcdef", 2)).toBe(0);
  expect(counterHelper("abcdef", 3)).toBe(0);

  expect(counterHelper("bababc", 2)).toBe(1);
  expect(counterHelper("bababc", 3)).toBe(1);

  expect(counterHelper("abbcde", 2)).toBe(1);
  expect(counterHelper("abbcde", 3)).toBe(0);

  expect(counterHelper("abcccd", 2)).toBe(0);
  expect(counterHelper("abcccd", 3)).toBe(1);

  expect(counterHelper("aabcdd", 2)).toBe(1);
  expect(counterHelper("aabcdd", 3)).toBe(0);

  expect(counterHelper("abcdee", 2)).toBe(1);
  expect(counterHelper("abcdee", 3)).toBe(0);

  expect(counterHelper("ababab", 2)).toBe(0);
  expect(counterHelper("ababab", 3)).toBe(1);
});

test("examples", () => {
  expect(
    boxesChecksum([
      "abcdef",
      "bababc",
      "abbcde",
      "abcccd",
      "aabcdd",
      "abcdee",
      "ababab"
    ])
  ).toBe(12);
});
