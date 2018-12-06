import { resultPolimer, polimerLength } from "./";

test("examples", () => {
  expect(resultPolimer("aA")).toBe("");
  expect(resultPolimer("bbbbbaAbbbbbb")).toBe("bbbbbbbbbbb");
  expect(resultPolimer("abBA")).toBe("");
  expect(resultPolimer("aabAAB")).toBe("aabAAB");
  expect(resultPolimer("dabAcCaCBAcCcaDA")).toBe("dabCBAcaDA");

  expect(polimerLength("dabAcCaCBAcCcaDA")).toBe(10);
});
