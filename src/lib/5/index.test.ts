import {
  resultPolimer,
  polimerLength,
  gatherDiffertentUnits,
  removeUnitFromPolimer,
  polimerLengthAfterRemovingUnit,
  shortestResultPolimer
} from "./";

test("examples", () => {
  expect(resultPolimer("aA")).toBe("");
  expect(resultPolimer("bbbbbaAbbbbbb")).toBe("bbbbbbbbbbb");
  expect(resultPolimer("abBA")).toBe("");
  expect(resultPolimer("aabAAB")).toBe("aabAAB");
  expect(resultPolimer("dabAcCaCBAcCcaDA")).toBe("dabCBAcaDA");

  expect(polimerLength("dabAcCaCBAcCcaDA")).toBe(10);
});

test("examples 2", () => {
  expect(gatherDiffertentUnits("aA")).toEqual(new Set(["a"]));
  expect(gatherDiffertentUnits("baAB")).toEqual(new Set(["b", "a"]));
  expect(gatherDiffertentUnits("dabAcCaCBAcCcaDA")).toEqual(
    new Set(["b", "a", "d", "c"])
  );

  expect(removeUnitFromPolimer("dabAcCaCBAcCcaDA", "a")).toBe("dbcCCBcCcD");
  expect(removeUnitFromPolimer("dabAcCaCBAcCcaDA", "A")).toBe("dbcCCBcCcD");
  expect(removeUnitFromPolimer("dabAcCaCBAcCcaDA", "z")).toBe(
    "dabAcCaCBAcCcaDA"
  );

  expect(polimerLengthAfterRemovingUnit("dabAcCaCBAcCcaDA", "a")).toBe(6);
  expect(polimerLengthAfterRemovingUnit("dabAcCaCBAcCcaDA", "b")).toBe(8);
  expect(polimerLengthAfterRemovingUnit("dabAcCaCBAcCcaDA", "c")).toBe(4);
  expect(polimerLengthAfterRemovingUnit("dabAcCaCBAcCcaDA", "d")).toBe(6);

  expect(shortestResultPolimer("dabAcCaCBAcCcaDA")).toBe(4);
});
