import {
  createPainter,
  createItemProvider,
  createStorageServer,
} from "../modifiers";

export function createLevel(config: LevelConfig, gameObjects: GameObject[]) {
  config.providers.forEach((config) =>
    gameObjects.unshift(createItemProvider(config, gameObjects))
  );

  config.painters.forEach((config) =>
    gameObjects.unshift(createPainter(config))
  );

  config.servers.forEach((config) =>
    gameObjects.unshift(createStorageServer(config))
  );
}
