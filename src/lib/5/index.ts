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
