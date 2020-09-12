const COLORS = ["#80ffdb", "#e63946", "#fca311", "#0077b6", "#8ac926"];
const ITEMS = [
  "< title />",
  "< article />",
  "< div />",
  "< image />",
  "< link />",
];

const level0: LevelConfig = {
  message: "Welcome to level #0",
  items: ["< helloworld />"],
  colors: ["teal"],
  bugs: [],
  servers: [[2, 13]],
  providers: [[2, 7]],
  painters: [[13, 7]],
};

const level1: LevelConfig = {
  message: "Welcome to level #1",
  items: ITEMS.slice(0, 3),
  colors: COLORS.slice(0, 4),
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
  bugs: [
    [1, 1],
    [14, 14],
    [1, 14],
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
