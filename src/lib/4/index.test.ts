import {
  parseRecord,
  fillTimes,
  processMinutes,
  getNextDay,
  getSleepyhead,
  getMostMinuteAsleep,
  strategy,
  strategy2
} from "./";

const input = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;

test("examples", () => {
  const times = fillTimes(input.split("\n").map(parseRecord));
  expect(
    Object.keys(times)
      .map(
        date => `${date}  ${times[date].guard}  ${times[date].minutes.join("")}`
      )
      .join("\n")
  )
    .toBe(`11-01  #10  .....####################.....#########################.....
11-02  #99  ........................................##########..........
11-03  #10  ........................#####...............................
11-04  #99  ....................................##########..............
11-05  #99  .............................................##########.....`);

  expect(getSleepyhead(times)).toBe("#10");

  expect(getMostMinuteAsleep(times, "#10")).toBe(24);

  expect(getMostMinuteAsleep(times, "#99")).toBe(45);

  expect(strategy(input)).toBe(240);

  expect(strategy2(input)).toBe(4455);
});

test("helpers", () => {
  expect(
    parseRecord(`[1518-11-01 00:00] Guard #10 begins shift`)
  ).toMatchObject({
    date: "11-01",
    minute: 0,
    guard: "#10",
    action: "."
  });

  expect(parseRecord(`[1518-11-01 00:05] falls asleep`)).toMatchObject({
    date: "11-01",
    minute: 5,
    guard: undefined,
    action: "falls"
  });

  expect(
    parseRecord(`[1518-11-01 23:58] Guard #99 begins shift`)
  ).toMatchObject({
    date: "11-02",
    minute: 0,
    guard: "#99",
    action: "."
  });

  expect(parseRecord(`[1518-11-01 00:55] wakes up`)).toMatchObject({
    date: "11-01",
    minute: 55,
    guard: undefined,
    action: "wakes"
  });

  expect(getNextDay("12", "31")).toEqual("01-01");

  expect(getNextDay("02", "28")).toEqual("03-01");

  expect(getNextDay("11", "30")).toEqual("12-01");
});

test("edge cases", () => {
  expect(
    parseRecord(`[1518-11-30 23:58] Guard #10 begins shift`)
  ).toMatchObject({
    date: "12-01",
    minute: 0,
    guard: "#10",
    action: "."
  });
});
