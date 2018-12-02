type LettersCounter = {
  [name: string]: number;
};

export function counterHelper(id: string, repeats: number): number {
  const letters: LettersCounter = {};
  id.split("").forEach(letter => {
    if (letters[letter] === undefined) {
      letters[letter] = 1;
    } else {
      letters[letter] = letters[letter] + 1;
    }
  });
  for (let l in letters) {
    if (letters[l] === repeats) {
      return 1;
    }
  }
  return 0;
}

export default function boxesChecksum(ids: Array<string>): number {
  const twos = ids.map(i => counterHelper(i, 2)).reduce((sum, i) => sum + i, 0);
  const threes = ids
    .map(i => counterHelper(i, 3))
    .reduce((sum, i) => sum + i, 0);
  return twos * threes;
}
