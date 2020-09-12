const COLORS = ["#80ffdb", "#e63946", "#fca311", "blue", "green"];
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
  providers: [[2, 7]],
  painters: [[13, 7]],
  servers: [[2, 13]],
};

const level1: LevelConfig = {
  message: "Welcome to level #1",
  items: ITEMS,
  colors: COLORS,
  providers: [
    [2, 3],
    [2, 5],
    [2, 7],
    [2, 9],
    [2, 11],
  ],
  painters: [
    [13, 3],
    [13, 5],
    [13, 7],
    [13, 9],
    [13, 11],
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
