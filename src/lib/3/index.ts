type Claim = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

function parseClaim(s: string): Claim {
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
}

export function fillFabricHelper(input: string, fabricSize: number): string {
  const claims: Array<Claim> = input.split("\n").map(parseClaim);
  const fabricMatrix: Array<Array<string>> = Array.from(
    { length: fabricSize },
    () => Array.from({ length: fabricSize }, () => ".")
  );

  for (let claim = 0; claim < claims.length; claim++) {
    const { id, x, y, w, h } = claims[claim];
    for (let r = y; r < y + h; r++) {
      for (let c = x; c < x + w; c++) {
        fabricMatrix[r][c] = fabricMatrix[r][c] === "." ? id.toString() : "X";
      }
    }
  }
  return fabricMatrix.map(i => i.join("")).join("\n");
}

export function getMarkedInchesCount(string: string, fabricSize = 8): number {
  return (fillFabricHelper(string, fabricSize).match(/X/g) || []).length;
}

export function findNotOverlaped(
  input: string,
  fabricSize: number
): string | undefined {
  const claims: Array<Claim> = input.split("\n").map(parseClaim);
  const claimsNotOverlapedIds: { [name: string]: boolean } = {};

  // Create fabric
  const fabricMatrix: Array<Array<Array<string>>> = Array.from(
    { length: fabricSize },
    () => Array.from({ length: fabricSize }, () => [])
  );

  // Fill fabric
  for (let claim = 0; claim < claims.length; claim++) {
    const { id, x, y, w, h } = claims[claim];
    claimsNotOverlapedIds[id.toString()] = true;
    for (let r = y; r < y + h; r++) {
      for (let c = x; c < x + w; c++) {
        fabricMatrix[r][c].forEach(existingId => {
          claimsNotOverlapedIds[existingId] = false;
          claimsNotOverlapedIds[id.toString()] = false;
        });
        fabricMatrix[r][c].push(id.toString());
      }
    }
  }

  // Find first not overlaped
  for (let id in claimsNotOverlapedIds) {
    if (claimsNotOverlapedIds[id] === true) {
      return id;
    }
  }
}
