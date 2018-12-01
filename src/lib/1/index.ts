function getFrequency(changes: string, delimiter = ",") {
  return changes.split(delimiter).reduce((sum, i) => {
    const n = parseInt(i) || 0;
    return sum + n;
  }, 0);
}

type ReachedFrequencies = {
  [name: string]: boolean;
};

export default function getFrequency2(
  input: string,
  delimiter = ",",
  stopWhenReachesTwice = false
) {
  if (stopWhenReachesTwice) {
    var i = 0;
    const changes = input.split(delimiter).map(i => parseInt(i) || 0);
    const changesLength = changes.length;
    const reachedFrequencies: ReachedFrequencies = {};
    let currentFrequency = 0;
    let currentChangesIndex = 0;
    while (!reachedFrequencies[currentFrequency]) {
      reachedFrequencies[currentFrequency] = true;
      currentFrequency = currentFrequency + changes[currentChangesIndex];
      currentChangesIndex =
        currentChangesIndex === changesLength - 1 ? 0 : currentChangesIndex + 1;

      i++;
    }
    return currentFrequency;
  } else {
    return getFrequency(input, delimiter);
  }
}
