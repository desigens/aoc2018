type Record = {
  date: string;
  minute: number;
  guard?: GuardId;
  action: string;
};

type Times = {
  [date: string]: {
    guard: GuardId;
    minutes: Array<string>;
  };
};

type GuardId = string;

export function parseRecord(record: string): Record {
  const match = record.match(
    /\[(\d+)-(\d+)-(\d+)\s(\d+):(\d+)\].*(#\d+|falls|wakes)/
  );
  if (match) {
    return {
      date:
        match[4] === "23"
          ? getNextDay(match[2], match[3])
          : match[2] + "-" + match[3],
      minute: match[4] === "23" ? 0 : parseInt(match[5]),
      guard:
        match[6] === "falls" || match[6] === "wakes" ? undefined : match[6],
      action: match[6] === "falls" || match[6] === "wakes" ? match[6] : "."
    };
  } else {
    throw new Error("Record is not valid");
  }
}

export function getNextDay(month: string, day: string): string {
  if (
    (["01", "03", "05", "07", "08", "10"].includes(month) && day === "31") ||
    (["04", "06", "09", "11"].includes(month) && day === "30") ||
    (["02"].includes(month) && day === "28") // 1518 has 365 days
  ) {
    return ("0" + (parseInt(month) + 1)).substr(-2) + "-01";
  } else if (["12"].includes(month) && day === "31") {
    return "01-01";
  } else {
    return month + "-" + ("0" + (parseInt(day) + 1)).substr(-2);
  }
}

export function fillTimes(records: Array<Record>): Times {
  const times: Times = {};
  records.forEach(({ date, minute, guard, action }) => {
    times[date] = times[date] || {
      minutes: Array.from({ length: 60 }, () => ".")
    };
    if (guard) {
      times[date].guard = guard;
    }
    times[date].minutes[minute] = action;
  });
  for (let t in times) {
    times[t].minutes = processMinutes(times[t].minutes);
  }
  return times;
}

export function processMinutes(minutes: Array<string>): Array<string> {
  minutes = minutes.slice(0);
  let isSleep = false;
  for (let i = 0; i < minutes.length; ) {
    if (!isSleep && minutes[i] === "falls") {
      isSleep = true;
    }
    if (isSleep && minutes[i] === "wakes") {
      isSleep = false;
    }
    minutes[i] = isSleep ? "#" : ".";
    i++;
  }
  return minutes;
}

export function getSleepyhead(times: Times): GuardId | undefined {
  const guardsSleepsMinutes: { [id: string]: number } = {};

  for (let date in times) {
    if (!guardsSleepsMinutes[times[date].guard]) {
      guardsSleepsMinutes[times[date].guard] = 0;
    }
    guardsSleepsMinutes[times[date].guard] = times[date].minutes.reduce(
      (sum, i) => {
        if (i === "#") {
          sum++;
        }
        return sum;
      },
      guardsSleepsMinutes[times[date].guard]
    );
  }

  let max = 0;
  let sleepyhead;
  for (let k in guardsSleepsMinutes) {
    if (guardsSleepsMinutes[k] > max) {
      max = guardsSleepsMinutes[k];
      sleepyhead = k;
    }
  }

  return sleepyhead;
}

export function getMostMinuteAsleep(
  times: Times,
  id: GuardId
): number | undefined {
  const guardSleepMinutes: Array<number> = [];

  Object.keys(times)
    .filter(day => times[day].guard === id)
    .forEach(day => {
      times[day].minutes.forEach((minute, index) => {
        if (minute === "#") {
          if (!guardSleepMinutes[index]) {
            guardSleepMinutes[index] = 1;
          } else {
            guardSleepMinutes[index]++;
          }
        }
      });
    });

  let max = 0;
  let maxIndex;
  guardSleepMinutes.forEach((m, index) => {
    if (m > max) {
      max = m;
      maxIndex = index;
    }
  });

  return maxIndex;
}

export function strategy(input: string): number | undefined {
  const times = fillTimes(input.split("\n").map(parseRecord));
  const sleepyhead = getSleepyhead(times);
  if (sleepyhead) {
    const minute = getMostMinuteAsleep(times, sleepyhead);
    if (minute) {
      return parseInt(sleepyhead.substr(1)) * minute;
    }
  }
}
