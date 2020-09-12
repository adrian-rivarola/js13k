import { createCanvas, onResize } from "./setup";
import { loadAssets } from "./assets";

import Player from "./player";
import { KeyboardController, VirtualController } from "./controller";
import game from "./game";

const mainDiv = document.getElementById("game"),
  gameForm = document.forms[0];

onblur = () => (game.isPaused = true);

onload = () => {
  const { ctx } = createCanvas();

  const loop = () => {
    requestAnimationFrame(loop);
    game.render(ctx);
  };

  window.onresize = onResize;
  onResize();

  loadAssets().then(() => {
    loop();
  });

  gameForm.onsubmit = (ev) => {
    ev.preventDefault();
    mainDiv.style.display = "none";

    game.players = createPlayers();
    game.loadLevel(0);
  };
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
