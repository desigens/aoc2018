import { fillFabricHelper, getMarkedInchesCount, findNotOverlaped } from "./";

test("examples", () => {
  expect(
    fillFabricHelper(
      `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,
      8
    )
  ).toBe(`........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........`);
  expect(
    getMarkedInchesCount(
      `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`
    )
  ).toBe(4);
});

test("rich ids", () => {
  expect(
    getMarkedInchesCount(
      `#3 @ 5,5: 2x2
#123 @ 1,3: 4x4
#4567 @ 3,1: 4x4`
    )
  ).toBe(4);
});

test("examples 2", () => {
  expect(
    findNotOverlaped(
      `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,
      8
    )
  ).toBe("3");
});
