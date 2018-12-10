import { fillGridWithCoordinates, getClosests, getLargestFiniteArea } from "./";

test("examples", () => {
  const { grid, coordinates } = fillGridWithCoordinates(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`);

  expect(grid.map(r => r.join("")).join("\n")).toBe(`aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf`);

  expect(getClosests(coordinates, 0, 0)).toEqual(["A"]);
  expect(getClosests(coordinates, 1, 0)).toEqual(["A"]);
  expect(getClosests(coordinates, 4, 0)).toEqual(["A"]);
  expect(getClosests(coordinates, 5, 0)).toEqual(["A", "E"]);
  expect(getClosests(coordinates, 9, 0)).toEqual(["C"]);
  expect(getClosests(coordinates, 3, 3)).toEqual(["D"]);
  expect(getClosests(coordinates, 0, 4)).toEqual(["B", "D"]);

  expect(
    getLargestFiniteArea(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`)
  ).toEqual(17);
});
