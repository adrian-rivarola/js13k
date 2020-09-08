import robotB from "../assets/robot.png";
import robotA from "../assets/hands.png";
import floorImg from "../assets/floor.png";

import Player from "./player";
import { KeyboardController, VirtualController } from "./controller";

import { createLevel } from "./levels/setup";
import LEVELS from "./levels/";

const canvas: HTMLCanvasElement = document.createElement("canvas");
export const ctx: Ctx = canvas.getContext("2d");

canvas.id = "game";
canvas.width = canvas.height = 640;

const nextLevel = document.createElement("button");
nextLevel.innerText = ">";
nextLevel.onclick = () => setLevel(game.levelId + 1);

const prevLevel = document.createElement("button");
prevLevel.innerText = "<";
prevLevel.onclick = () => setLevel(game.levelId - 1);

const levelDiv = document.getElementById("levelDiv");

levelDiv.appendChild(prevLevel);
levelDiv.appendChild(nextLevel);

// canvas.onclick = () => document.documentElement.requestFullscreen();

export let TILE_SIZE = 32;

function resize() {
  let s = Math.min(innerWidth, innerHeight);
  s -= s % 32;

  canvas.width = s;
  canvas.height = s;

  let oldSize = TILE_SIZE;
  TILE_SIZE = Math.floor(s / 16);

  let scale = TILE_SIZE / oldSize;

  game.level.forEach((object) => {
    object.pos[0] *= scale;
    object.pos[1] *= scale;

    object.onResize(TILE_SIZE, scale);
  });
}

onresize = resize;

document.body.appendChild(canvas);

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

const game = {
  levelId: -1,
  level: [],
};

function setLevel(num: number) {
  if (num === game.levelId) return;

  num %= LEVELS.length;

  game.level = game.level.filter(
    (object) => object.type === "player" || object.owner
  );
  createLevel(LEVELS[num], game.level);

  game.levelId = num;
}

function createPlayers() {
  const playerAsset: PlayerAssets = {
    body: assets.robotB,
    arms: assets.robotA,
  };

  let players =
    window.orientation === undefined
      ? [
          new Player(
            "Player1",
            "red",
            playerAsset,
            new KeyboardController("wsadxc")
          ),
          new Player(
            "Player2",
            "blue",
            playerAsset,
            new KeyboardController("824650")
          ),
        ]
      : [new Player("Player1", "red", playerAsset, new VirtualController())];

  players.forEach((player, idx) => {
    player.pos[0] = TILE_SIZE * 5 * (idx + 1);
    player.pos[1] = TILE_SIZE * 7;

    game.level.push(player);
  });
}

function setup() {
  setLevel(0);
  createPlayers();

  floorPattern = ctx.createPattern(assets.floor, "repeat");
  canvas.classList.add("loaded");

  resize();
  start();
}

function start() {
  requestAnimationFrame(start);

  drawFloor(ctx);
  game.level.forEach(
    (object) => object.active && object.update(game.level).render(ctx)
  );
  //
  // ctx.fillStyle = "white";
  // ctx.textAlign = "center";
  // ctx.font = `14px monospace`;
  //
  // ctx.fillText(
  //   `Items: ${game.level.length}`,
  //   canvas.width / 2,
  //   canvas.height - 20
  // );
  // ctx.fillText(`Level: ${game.levelId}`, canvas.width / 2, 20);
}

function drawFloor(ctx: Ctx) {
  ctx.save();
  ctx.fillStyle = floorPattern;
  ctx.scale(TILE_SIZE / 16, TILE_SIZE / 16);
  // ctx.scale(2, 2);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.fillStyle = "black";
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.fillStyle = "white";
  // for (let i = 0; i < 16; i++) {
  //   for (let j = 0; j < 16; j++) {
  //     ctx.beginPath();
  //     ctx.arc(i * TILE_SIZE, j * TILE_SIZE, 3, 0, Math.PI * 2);
  //     ctx.fill();
  //   }
  // }

  ctx.restore();
}
