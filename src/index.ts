import robotB from "../assets/robot.png";
import robotA from "../assets/hands.png";
import floorImg from "../assets/floor.png";

import Player from "./player";
import { KeyboardController, VirtualController } from "./controller";

const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: Ctx = canvas.getContext("2d");

canvas.id = "game";
canvas.width = 512;
canvas.height = 512;

const TILE_SIZE = canvas.width / 8;

document.body.appendChild(canvas);

const p1Controller =
  window.orientation === undefined
    ? new KeyboardController("wsadx")
    : new VirtualController();

const players: Player[] = [];

const assets: Record<string, HTMLImageElement> = {
  floor: new Image(),
  robotB: new Image(),
  robotA: new Image(),
};

assets.floor.src = floorImg;
assets.robotB.src = robotB;
assets.robotA.src = robotA;

let assetsLoaded = 0;
for (let key in assets) {
  assets[key].onload = () =>
    ++assetsLoaded === Object.keys(assets).length && setup();
}

function setup() {
  players.push(
    new Player("Player1", "pink", assets.robotB, assets.robotA, p1Controller)
  );
  players.push(
    new Player(
      "Player2",
      "orange",
      assets.robotB,
      assets.robotA,
      new KeyboardController("ikjlh")
    )
  );
  players.push(
    new Player(
      "Player3",
      "lightblue",
      assets.robotB,
      assets.robotA,
      new KeyboardController([
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
      ])
    )
  );
  players.push(
    new Player(
      "Player4",
      "lightgreen",
      assets.robotB,
      assets.robotA,
      new KeyboardController("82465")
    )
  );

  players.forEach((player, idx) => {
    player.pos[0] = (2 + idx) * TILE_SIZE;
    player.pos[1] = 3.5 * TILE_SIZE;
  });

  canvas.classList.add("loaded");
  start();
}

const level: GameObject[] = players;

function start() {
  requestAnimationFrame(start);

  ctx.save();
  ctx.fillStyle = ctx.createPattern(assets.floor, "repeat");
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.restore();

  players.forEach((player) => player.update(level).render(ctx));
}
