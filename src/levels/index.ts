let capacity = 4;

const level0: LevelConfig = {
  providers: [{ itemId: "<HelloWorld />", pos: [3, 7.5] }],
  painters: [{ color: "teal", pos: [12, 7.5] }],
  // servers: [{ pos: [7.5, 12], capacity: 1 }],
  servers: [],
};

const level1: LevelConfig = {
  providers: [
    { itemId: "<Title />", pos: [14, 1] },
    { itemId: "<Image />", pos: [14, 3] },
    { itemId: "<Div />", pos: [14, 5] },
    // { itemId: "<Footer />", pos: [14, 7] },
  ],
  painters: [
    { color: "purple", pos: [2, 1] },
    { color: "yellow", pos: [2, 3] },
    { color: "teal", pos: [2, 5] },
    // { color: "orange", pos: [14, 7] },
  ],
  servers: [
    { pos: [6, 13], capacity },
    { pos: [9, 13], capacity },
  ],
};

const level2: LevelConfig = {
  providers: [
    { itemId: "<Header />", pos: [1, 1] },
    { itemId: "<Article />", pos: [1, 3] },
    { itemId: "<Div />", pos: [1, 5] },
    { itemId: "<Footer />", pos: [1, 7] },
  ],
  painters: [
    { color: "red", pos: [14, 1] },
    { color: "green", pos: [14, 3] },
    { color: "blue", pos: [14, 5] },
    { color: "orange", pos: [14, 7] },
  ],
  servers: [
    { pos: [5, 13], capacity },
    { pos: [7.5, 13], capacity },
    { pos: [10, 13], capacity },
  ],
};

export default [level0, level1, level2];
