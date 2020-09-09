import LEVELS from "./levels/";
import { createLevel } from "./levels/setup";

const game: GameState = {
  isPaused: false,
  levelId: -1,
  players: [],
  objects: [],
  init(level = 0) {
    level %= LEVELS.length;
    game.objects = [...game.players];
    createLevel(LEVELS[level], game.objects);
    console.log(game.objects);
  },
  onResize(scaleTo: number) {
    game.objects.forEach((object) => {
      object.pos[0] *= scaleTo;
      object.pos[1] *= scaleTo;

      object.onResize(scaleTo);
    });
  },
  render(ctx: Ctx) {
    game.objects.forEach((object) => {
      object.active && object.update(game.objects).render(ctx);
    });
  },
};

export default game;
