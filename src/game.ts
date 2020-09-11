import ASSETS from "./assets";
import LEVELS from "./levels";
import {
  createPainter,
  createItemProvider,
  createStorageServer,
} from "./modifiers";

export const COLORS = ["#80ffdb", "#e63946", "#fca311", "blue", "green"];
export const ITEMS = [
  "<Title/>",
  "<Article/>",
  "<div/>",
  "<Image/>",
  "<Link/>",
];

class Game implements GameState {
  isPaused = false;
  level = -1;

  players: Player[] = [];
  objects: GameObject[] = [];

  objectives: GameObject[] = [];

  loadLevel(level: number) {
    const config = LEVELS[level];

    this.objects = [...this.players];

    const providers = ITEMS.map((itemId, idx) =>
      createItemProvider([2, 2 + idx * 2], itemId, this.objects)
    );

    const painters = COLORS.map((color, idx) =>
      createPainter([13, 2 + idx * 2], color)
    );

    const servers = config.servers.map(createStorageServer);

    this.objects.unshift(...providers, ...painters, ...servers);
  }

  resize(scaleTo: number) {
    this.objects.forEach((object) => object.onResize(scaleTo));
  }

  drawFloor(ctx: Ctx) {
    let s = ctx.canvas.width;

    ctx.save();
    ctx.drawImage(ASSETS.floor, 0, 0, s, s);

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, s, s);

    ctx.restore();
  }

  render(ctx: Ctx) {
    if (this.isPaused) {
      ctx.fillStyle = "white";
      ctx.font = "2rem monospace";
      ctx.fillText("Game Paused", 15, 30);
      return;
    }

    this.drawFloor(ctx);

    this.objects.forEach((object) => {
      object.active && object.update(this.objects).render(ctx);
    });
  }
}

export default new Game();
