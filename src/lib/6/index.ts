export function drawGrid(input: string) {
  let grid: Array<Array<string>> = [[]];
  let maxX = 0;
  let maxY = 0;
  const coordinates: { [name: string]: [number, number] } = {};
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

  return grid.map(r => r.join("")).join("\n");
}
