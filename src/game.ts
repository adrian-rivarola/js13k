interface GameState {
  modifers: GameObject[];
  players: Player[];
  items: GameObject[];
}

interface Level {
  playersPosition: Vector[];
  createModifiers: GameObject[];
}

export function setupLevel(level: Level, game: GameState): void {}
