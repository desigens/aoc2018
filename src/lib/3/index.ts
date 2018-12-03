type Claim = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

export function fillFabricHelper(input: string, fabricSize: number): string {
  const claims: Array<Claim> = input.split("\n").map(s => {
    const match = s.match(/#(\d+)\s@\s(\d+),(\d+): (\d+)x(\d+)/);
    if (match) {
      return {
        id: parseInt(match[1]),
        x: parseInt(match[2]),
        y: parseInt(match[3]),
        w: parseInt(match[4]),
        h: parseInt(match[5])
      };
    } else {
      throw new Error("Claim is not valid");
    }
  });
  const fabricMatrix: Array<Array<string>> = Array.from(
    { length: fabricSize },
    () => Array.from({ length: fabricSize }, () => ".")
  );
  claims.forEach(({ id, x, y, w, h }) => {
    for (let r = y; r < y + h; r++) {
      for (let c = x; c < x + w; c++) {
        fabricMatrix[r][c] = fabricMatrix[r][c] === "." ? id.toString() : "X";
      }
    }
  });
  return fabricMatrix.map(i => i.join("")).join("\n");
}

export function getMarkedInchesCount(string: string, fabricSize = 8): number {
  return (fillFabricHelper(string, fabricSize).match(/X/g) || []).length;
}
