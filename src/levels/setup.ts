import LEVELS from "./index";
import {
  createPainter,
  createItemProvider,
  createStorageServer,
} from "../modifiers";

export const COLORS = ["#80ffdb", "#e63946", "#fca311", "#f4a261", "#e76f51"];

export const ITEMS = [
  "HelloWorld />",
  "<Header />",
  "<Article />",
  "<Div />",
  "<Image />",
  "<Footer />",
];

export function createLevel(levelIdx: number, gameObjects: GameObject[]) {
  levelIdx %= LEVELS.length;

  const config = LEVELS[levelIdx];

  gameObjects.unshift(
    ...config.providers.map((pos, idx) =>
      createItemProvider(pos, ITEMS[idx], gameObjects)
    ),
    ...config.painters.map((pos, idx) => createPainter(pos, COLORS[idx])),
    ...config.servers.map(createStorageServer)
  );
}
