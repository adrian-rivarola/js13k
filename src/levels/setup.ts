import {
  createPainter,
  createItemProvider,
  createStorageServer,
} from "../modifiers";

export function createLevel(config: LevelConfig, gameObjects: GameObject[]) {
  const providers = config.providers.map((config) =>
    gameObjects.push(createItemProvider(config, gameObjects))
  );
  const painters = config.painters.map((config) =>
    gameObjects.push(createPainter(config))
  );
  const servers = config.servers.map((config) =>
    gameObjects.push(createStorageServer(config))
  );

  return [...providers, ...painters, ...servers];
}
