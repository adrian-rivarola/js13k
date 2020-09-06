import robotB from "../assets/robot.png";
import robotA from "../assets/hands.png";
import floorImg from "../assets/floor.png";

import Player from "./player";
import { createItemProvider, createPainter } from "./modifiers";
import { KeyboardController, VirtualController } from "./controller";

const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: Ctx = canvas.getContext("2d");

canvas.id = "game";
canvas.width = 512;
canvas.height = 512;

const TILE_SIZE = canvas.width / 16;

document.body.appendChild(canvas);

const p1Controller =
  window.orientation === undefined
    ? new KeyboardController("wsadxc")
    : new VirtualController();

const players: Player[] = [];
const level: GameObject[] = [];

export const assets: Record<string, HTMLImageElement> = {
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

let floorPattern: CanvasPattern;

function setup() {
  const playerAsset: PlayerAssets = {
    body: assets.robotB,
    arms: assets.robotA,
  };

  players.push(new Player("Player1", "pink", playerAsset, p1Controller));
  players.push(
    new Player(
      "Player2",
      "orange",
      playerAsset,
      new KeyboardController("824650")
    )
  );

  players.forEach((player, idx) => {
    player.pos[0] = (2 + idx) * 2.5 * TILE_SIZE;
    player.pos[1] = 7 * TILE_SIZE;
    level.push(player);
  });

  level.push(createItemProvider("<Header />", level));
  level.push(createItemProvider("<Article />", level));
  level.push(createItemProvider("<Footer />", level));

  level.push(createPainter("crimson"));
  level.push(createPainter("lightgreen"));
  level.push(createPainter("teal"));

  level
    .filter((item) => item.type !== "player")
    .forEach((item, idx) => {
      item.pos = [TILE_SIZE, (idx + 1) * 2 * TILE_SIZE];
    });

  floorPattern = ctx.createPattern(assets.floor, "repeat");

  canvas.classList.add("loaded");
  start();
}

function start() {
  requestAnimationFrame(start);

  drawFloor(ctx);
  level.forEach((item) => item.update(level).render(ctx));
}

function drawFloor(ctx: Ctx) {
  ctx.save();
  ctx.fillStyle = floorPattern;
  ctx.scale(2, 2);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.restore();
}
