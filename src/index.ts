import playerImg from "../assets/player.png";
import Player from "./player";
import { KeyboardController, VirtualController } from "./controller";

const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.id = "game";
canvas.width = 512;
canvas.height = 512;

document.body.appendChild(canvas);

const players: Player[] = [];

const img = new Image();
img.src = playerImg;

img.onload = () => {
  players.push(
    new Player("p1", "purple", new KeyboardController("wsadx"), img)
  );

  players.push(
    new Player(
      "p2",
      "orange",
      new KeyboardController([
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ]),
      img
    )
  );

  start();
};

function start() {
  requestAnimationFrame(start);

  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  players.forEach((player) => player.update().render(ctx));
}
