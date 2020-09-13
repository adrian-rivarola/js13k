const COLORS = ["#80ffdb", "#e63946", "#fca311", "#0077b6", "#8ac926"];
const ITEMS = [
  "< title />",
  "< article />",
  "< div />",
  "< image />",
  "< link />",
];

const blocks1: BlockPosition[] = [
  [3, 4],
  [4, 5],
  ["8-13", 5],
  [9, "4-7"],
  ["10-12", 10],
  ["7-9", 11],
  [6, 12],
  [13, 14],
];

const level0: LevelConfig = {
  message: "Welcome to level #0",
  items: ["< HelloWorld />"],
  colors: ["teal"],
  bugs: [],
  blocks: [...createArrayOfBlocks(blocks1)],
  providers: [[3, 7]],
  painters: [[12, 7]],
  servers: [[3, 13]],
};

const level1: LevelConfig = {
  message: "Welcome to level #1",
  items: ITEMS.slice(0, 3),
  colors: COLORS.slice(0, 4),
  blocks: [],
  bugs: [
    [3, 3],
    [13, 13],
  ],
  providers: [
    [2, 5],
    [2, 7],
    [2, 9],
  ],
  painters: [
    [13, 4],
    [13, 6],
    [13, 8],
    [13, 10],
  ],
  servers: [
    [6, 13],
    [9, 13],
  ],
};

const level2: LevelConfig = {
  message: "Welcome to level #2",
  items: ITEMS,
  colors: COLORS,
  blocks: [],
  bugs: [
    [3, 3],
    [12, 12],
    [3, 12],
  ],
  providers: [
    [14, 3],
    [14, 5],
    [14, 7],
    [14, 9],
    [14, 11],
  ],
  painters: [
    [1, 3],
    [1, 5],
    [1, 7],
    [1, 9],
    [1, 11],
  ],
  servers: [
    [5, 14],
    [7.5, 14],
    [10, 14],
  ],
};

export default [level0, level1, level2];

/**
  convert from ["1-3", 5] to [[1, 5], [2, 5], [3, 5]]
*/
function createArrayOfBlocks(positions: BlockPosition[]): Vector[] {
  const result: Vector[] = [];

  positions.forEach(([x, y]) => {
    if (typeof x === "string") {
      let [start, end] = x.split("-").map((el) => parseInt(el));

      for (let i = start; i <= end; i++) {
        result.push([i, +y]);
      }
    } else if (typeof y == "string") {
      let [start, end] = y.split("-").map((el) => parseInt(el));

      for (let i = start; i <= end; i++) {
        result.push([+x, i]);
      }
    } else {
      result.push([x, y]);
    }
  });

  return result;
}
