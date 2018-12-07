import { drawGrid } from "./";

test("examples", () => {
  expect(
    drawGrid(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`)
  ).toBe(`..........
.A........
..........
........C.
...D......
.....E....
.B........
..........
..........
........F.`);
});
