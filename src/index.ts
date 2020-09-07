import robotB from "../assets/robot.png";
import robotA from "../assets/hands.png";
import floorImg from "../assets/floor.png";

import Player from "./player";
import {
  createStorageServer,
  createSpeedBooster,
  createItemProvider,
  createPainter,
  creatBug,
  createTrahsCan,
} from "./modifiers";
import { KeyboardController } from "./controller";

const canvas: HTMLCanvasElement = document.createElement("canvas");
export const ctx: Ctx = canvas.getContext("2d");

canvas.id = "game";
canvas.width = 512;
canvas.height = 512;

export const TILE_SIZE = canvas.width / 16;

document.body.appendChild(canvas);

let levelNum = 1;
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

function createPlayers() {
  const playerAsset: PlayerAssets = {
    body: assets.robotB,
    arms: assets.robotA,
  };

  let players = [
    new Player("Player1", "red", playerAsset, new KeyboardController("wsadxc")),
    new Player(
      "Player2",
      "green",
      playerAsset,
      new KeyboardController("824650")
    ),
  ];

  players.forEach((player, idx) => {
    player.pos[1] = TILE_SIZE * 6;
    player.pos[0] = (idx + 2) * TILE_SIZE * 2.5;

    level.push(player);
  });
}

function createProviders() {
  const provs = [
    createItemProvider("<Header/>", level),
    createItemProvider("<Article/>", level),
    createItemProvider("<Div/>", level),
    createItemProvider("<Footer/>", level),
  ];
  provs.forEach((prov, idx) => {
    prov.pos = [TILE_SIZE, (idx + 1) * 2 * TILE_SIZE];
    level.push(prov);
  });
}

function createPainters() {
  const painters = [
    createPainter("red"),
    createPainter("orange"),
    createPainter("green"),
    createPainter("blue"),
  ];
  painters.forEach((painter, idx) => {
    painter.pos = [TILE_SIZE * 14, (idx + 1) * 2 * TILE_SIZE];
    level.push(painter);
  });
}

function createOthers() {
  const server = createStorageServer();
  server.pos = [TILE_SIZE, TILE_SIZE * 14];
  level.push(server);

  const trashCan = createTrahsCan(level);
  trashCan.pos = [TILE_SIZE * 14, TILE_SIZE * 14];
  level.push(trashCan);

  const speedBooster = createSpeedBooster();
  speedBooster.pos = [TILE_SIZE * 8, TILE_SIZE * 12];
  level.push(speedBooster);

  const bug1 = creatBug();
  bug1.pos = [TILE_SIZE * 3, TILE_SIZE * 7];
  level.push(bug1);
}

function setup() {
  createPlayers();
  createPainters();
  createProviders();
  createOthers();

  floorPattern = ctx.createPattern(assets.floor, "repeat");
  canvas.classList.add("loaded");

  start();
}

function start() {
  requestAnimationFrame(start);

  drawFloor(ctx);
  level.forEach((object) => object.active && object.update(level).render(ctx));

  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.fillText(`Items: ${level.length}`, canvas.width / 2, canvas.height - 20);
  ctx.fillText(`Level: ${levelNum}`, canvas.width / 2, 20);
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
