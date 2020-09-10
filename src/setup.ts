// import GAME from "./game";

export let canvas: HTMLCanvasElement;
export let ctx: Ctx;
export let SCALE: number;
export let TILE_SIZE: number;

export function createCanvas() {
  if (canvas) return { canvas, ctx };

  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");

  SCALE = canvas.width / 512;

  // document.body.innerHTML = "";
  // (document.querySelector(".main-menu") as HTMLDivElement).style.display =
  //   "none";
  document.body.appendChild(canvas);

  return { canvas, ctx };
}

export function onResize(game: GameState) {
  let s = Math.min(innerWidth, innerHeight);
  s -= s % 32;

  canvas.width = s;
  canvas.height = s;

  let oldScale = SCALE;
  SCALE = s / 512;

  TILE_SIZE = s / 16;

  game.onResize(SCALE / oldScale);
}
