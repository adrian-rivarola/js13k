import ASSETS from "./assets";

import { createLevel } from "./levels/setup";

function drawFloor(ctx: Ctx) {
  let s = ctx.canvas.width;

  ctx.save();
  ctx.drawImage(ASSETS.floor, 0, 0, s, s);

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, s, s);

  ctx.restore();
}

const game: GameState = {
  isPaused: false,
  levelId: -1,
  players: [],
  objects: [],

  init(level = 0) {
    game.objects = [...game.players];

    createLevel(level, game.objects);
    console.log(game.objects);
  },
  onResize(scaleTo: number) {
    game.objects.forEach((object) => object.onResize(scaleTo));
  },
  render(ctx: Ctx) {
    drawFloor(ctx);

    game.objects.forEach((object) => {
      object.active && object.update(game.objects).render(ctx);
    });
  },
};

export default game;
