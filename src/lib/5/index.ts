function mergePolimerUnits(input: string): string {
  let output = "";
  for (let i = 0; i < input.length; ) {
    if (
      input[i + 1] &&
      input[i] !== input[i + 1] &&
      (input[i] === input[i + 1].toLowerCase() ||
        input[i] === input[i + 1].toUpperCase())
    ) {
      i = i + 2;
    } else {
      output += input[i];
      i = i + 1;
    }
  }
  return output;
}

export function resultPolimer(input: string): string {
  let previousResult = input;
  let result = mergePolimerUnits(input);
  while (previousResult !== result) {
    previousResult = result;
    result = mergePolimerUnits(result);
  }
  return result;
}

export function polimerLength(input: string): number {
  return resultPolimer(input).length;
}

export function gatherDiffertentUnits(input: string): Set<string> {
  let units = new Set();
  for (let i = 0; i < input.length; i++) {
    units.add(input[i].toLowerCase());
  }
  return units;
}

export function removeUnitFromPolimer(input: string, unit: string): string {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i].toLowerCase() !== unit.toLowerCase()) {
      output += input[i];
    }
  }
  return output;
}

export function polimerLengthAfterRemovingUnit(
  input: string,
  unit: string
): number {
  return polimerLength(removeUnitFromPolimer(input, unit));
}

export function shortestResultPolimer(input: string): number {
  const lengths = new Map();
  gatherDiffertentUnits(input).forEach(unit => {
    lengths.set(unit, polimerLengthAfterRemovingUnit(input, unit));
  });
  return Math.min(...lengths.values());
}
