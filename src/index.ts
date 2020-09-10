import { createCanvas, onResize } from "./setup";
import { loadAssets } from "./assets";

import Player from "./player";
import { KeyboardController, VirtualController } from "./controller";
import game from "./game";

onload = () => {
  const { ctx } = createCanvas();

  const start = () => {
    requestAnimationFrame(start);
    game.render(ctx);
  };

  onresize = () => onResize(game);
  onResize(game);

  loadAssets().then(() => {
    game.players = createPlayers();
    game.init(1);

    start();
  });
};

function createPlayers() {
  let players =
    window.orientation === undefined
      ? [
          new Player(
            "Player1",
            [6, 7],
            "red",
            new KeyboardController("wsadxc")
          ),
          new Player(
            "Player2",
            [9, 7],
            "orange",
            new KeyboardController("824650")
          ),
        ]
      : [new Player("Player1", [7.5, 7.5], "red", new VirtualController())];

  return players;
}
