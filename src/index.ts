import robotB from "../assets/robot.png";
import robotA from "../assets/hands.png";
import floorImg from "../assets/floor.png";

import Player from "./player";
import {
  createStorageServer,
  createItemProvider,
  createPainter,
  createTrahsCan,
} from "./modifiers";
import { KeyboardController } from "./controller";

const canvas: HTMLCanvasElement = document.createElement("canvas");
export const ctx: Ctx = canvas.getContext("2d");

canvas.id = "game";
canvas.width = canvas.height = 640;

// canvas.onclick = () => document.documentElement.requestFullscreen();

export let TILE_SIZE = 32;

function resize() {
  let s = Math.min(innerWidth, innerHeight);
  s = s - (s % 32);

  canvas.width = s;
  canvas.height = s;

  let oldSize = TILE_SIZE;
  TILE_SIZE = Math.floor(s / 16);

  let scaleTo = TILE_SIZE / oldSize;

  level.forEach((object) => {
    object.pos[0] *= scaleTo;
    object.pos[1] *= scaleTo;

    object.onResize(TILE_SIZE, s / 640);
  });
}

onresize = resize;

document.body.appendChild(canvas);

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

// let floorPattern: CanvasPattern;

function createPlayers() {
  const playerAsset: PlayerAssets = {
    body: assets.robotB,
    arms: assets.robotA,
  };

  let players = [
    new Player("Player1", "red", playerAsset, new KeyboardController("wsadxc")),
    new Player(
      "Player2",
      "blue",
      playerAsset,
      new KeyboardController("824650")
    ),
  ];

  players.forEach((player) => {
    player.pos[0] = TILE_SIZE * 7.5;
    player.pos[1] = TILE_SIZE * 7.5;

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
}

function setup() {
  createPlayers();
  createPainters();
  createProviders();
  createOthers();

  // floorPattern = ctx.createPattern(assets.floor, "repeat");
  canvas.classList.add("loaded");

  resize();
  start();
}

function start() {
  requestAnimationFrame(start);

  drawFloor(ctx);
  level.forEach((object) => object.active && object.update(level).render(ctx));

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = `14px monospace`;

  ctx.fillText(`Items: ${level.length}`, canvas.width / 2, canvas.height - 20);
  ctx.fillText(`Size: ${canvas.width}`, canvas.width / 2, 20);
}

function drawFloor(ctx: Ctx) {
  ctx.save();
  // ctx.fillStyle = floorPattern;
  // ctx.scale(TILE_SIZE / 16, TILE_SIZE / 16);
  // ctx.scale(2, 2);
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  // ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.restore();
}
