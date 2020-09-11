const level0: LevelConfig = {
  providers: [[1, 3]],
  painters: [[14, 3]],
  message: "Welcome to level #0",
  servers: [],
};

const level1: LevelConfig = {
  providers: [
    [2, 5],
    [2, 7],
    [2, 9],
  ],
  painters: [
    [13, 5],
    [13, 7],
    [13, 9],
  ],
  message: "Welcome to level #1",
  servers: [
    [6, 13],
    [9, 13],
  ],
};

const level2: LevelConfig = {
  providers: [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
  ],
  painters: [
    [14, 1],
    [14, 3],
    [14, 5],
    [14, 7],
  ],
  message: "Welcome to level #2",
  servers: [
    [5, 13],
    [7.5, 13],
    [10, 13],
  ],
};

export default [level0, level1, level2];
