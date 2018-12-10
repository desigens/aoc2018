type Grid = Array<Array<string>>;
type Coordinates = {
  [name: string]: Coordinate;
};
type Coordinate = [number, number];

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

export function fillGridWithCoordinates(
  input: string
): { grid: Grid; coordinates: Coordinates; largestFiniteArea: number } {
  const grid: Grid = [[]];
  const coordinates: Coordinates = {};

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  input.split("\n").forEach((s, index) => {
    const coordinateName = String.fromCharCode(index + 65);
    const x = parseInt(s.split(",")[0]);
    const y = parseInt(s.split(",")[1]);
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
    if (grid[y] === undefined) {
      grid[y] = [];
    }
    coordinates[coordinateName] = [x, y];
    grid[y][x] = coordinateName;
  });

  const hasInfiniteArea = new Set(Object.keys(coordinates));
  const areasOfCoordinates: { [key: string]: number } = {};

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX + 1; x++) {
      if (grid[y] === undefined) {
        grid[y] = [];
      }
      if (grid[y][x]) {
        areasOfCoordinates[grid[y][x]] =
          (areasOfCoordinates[grid[y][x]] || 0) + 1;
      } else {
        const closest = getClosests(coordinates, x, y);
        if (closest.length === 1) {
          areasOfCoordinates[closest[0]] =
            (areasOfCoordinates[closest[0]] || 0) + 1;
          grid[y][x] = closest[0].toLowerCase();
        } else {
          grid[y][x] = ".";
        }
      }
      if (
        grid[y][x] !== "." &&
        (x === minX || x === maxX || y === maxY || y === minY)
      ) {
        hasInfiniteArea.delete(grid[y][x].toUpperCase());
      }
    }
  }
  const largestFiniteArea = Math.max(
    ...[...hasInfiniteArea.keys()].map(k => areasOfCoordinates[k])
  );
  return {
    grid,
    coordinates,
    largestFiniteArea
  };
}

export function getLargestFiniteArea(input: string): number {
  return fillGridWithCoordinates(input).largestFiniteArea;
}
