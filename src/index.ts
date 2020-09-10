import { createCanvas, onResize, SCALE, TILE_SIZE } from "./setup";
import { loadAssets } from "./assets";

import Player from "./player";
import { KeyboardController } from "./controller";
import game from "./game";

onload = () => {
  const { canvas, ctx } = createCanvas();

  const start = () => {
    requestAnimationFrame(start);
    ctx.save();

    ctx.font = "1rem monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    ctx.fillText(
      "Speed: " + game.players[0].maxSpeed,
      canvas.width / 2,
      canvas.width - 45
    );

    // for (let i = 0; i < 16; i++) {
    //   ctx.fillText(i + "", i * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE / 2);
    // }

    game.render(ctx);
  };

  window.onresize = () => onResize(game);

  loadAssets().then((images) => {
    onResize(game);

    game.players = createPlayers();
    game.init(1);

    start();
  });
};

function createPlayers() {
  let players = [
    new Player("Player1", "red", new KeyboardController("wsadxc")),
    new Player("Player2", "orange", new KeyboardController("824650")),
    // new Player("Player3", "green", new KeyboardController("wsadxc")),
    // new Player("Player4", "blue", new KeyboardController("wsadxc")),
  ];

  players.forEach((player, idx) => {
    player.pos[0] = TILE_SIZE * (6 - players.length) * (idx + 1);
    player.pos[1] = TILE_SIZE * 7;
  });

  return players;
}
