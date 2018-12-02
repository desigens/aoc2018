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

export function boxesChecksum(ids: Array<string>): number {
  const twos = ids.map(i => counterHelper(i, 2)).reduce((sum, i) => sum + i, 0);
  const threes = ids
    .map(i => counterHelper(i, 3))
    .reduce((sum, i) => sum + i, 0);
  return twos * threes;
}

type IdMasks = {
  [name: string]: Array<string>;
};

export function commonLetters(ids: Array<string>) {
  const masks: IdMasks = {};
  ids.forEach(id => {
    for (let i = 0; i < id.length; i++) {
      let mask = id.substr(0, i) + "*" + id.substr(i + 1);
      if (masks[mask] === undefined) {
        masks[mask] = [id];
      } else {
        masks[mask].push(id);
      }
    }
  });
  for (let m in masks) {
    if (masks[m].length === 2) {
      return m.replace("*", "");
    }
  }
}
