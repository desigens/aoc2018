type Grid = Array<Array<string>>;
type Coordinates = {
  [name: string]: [number, number];
};

export function getClosests(
  coordinates: Coordinates,
  x: number,
  y: number
): Array<string> {
  let closests: Array<string> = [];
  let min = Infinity;
  for (let c in coordinates) {
    let length =
      Math.abs(coordinates[c][0] - x) + Math.abs(coordinates[c][1] - y);

    if (length < min) {
      closests = [c];
      min = length;
    } else if (length === min) {
      closests.push(c);
    }
  }
  return closests;
}

export function setCoorditates(
  input: string
): { grid: Grid; coordinates: Coordinates } {
  const grid: Grid = [[]];
  const coordinates: Coordinates = {};
  let maxX = -Infinity;
  let maxY = -Infinity;

  const onXs = new Map();
  const onYs = new Map();

  input.split("\n").forEach((s, index) => {
    const coordinateName = String.fromCharCode(index + 65);
    const x = parseInt(s.split(",")[0]);
    const y = parseInt(s.split(",")[1]);
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (grid[y] === undefined) {
      grid[y] = [];
    }
    coordinates[coordinateName] = [x, y];
    grid[y][x] = coordinateName;
  });
  coordinates;

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX + 1; x++) {
      if (grid[y] === undefined) {
        grid[y] = [];
      }
      grid[y][x] = grid[y][x] || ".";
    }
  }

  return {
    grid,
    coordinates
  };
}

export function fillClosests(grid: Grid, coordinates: Coordinates): Grid {
  const width = grid[0].length - 1;
  const height = grid.length - 1;
  for (let y = 0; y <= height; y++) {
    for (let x = 0; x <= width; x++) {
      if (grid[y] === undefined) {
        grid[y] = [];
      }
      grid[y][x] = grid[y][x] || ".";
      if (grid[y][x] === ".") {
        let closests = getClosests(coordinates, x, y);
        grid[y][x] = closests.length === 1 ? closests[0].toLowerCase() : ".";
      }
    }
  }
  return grid;
}
