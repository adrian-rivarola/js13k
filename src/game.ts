import ASSETS from "./assets";
import LEVELS from "./levels";
import { TILE_SIZE } from "./setup";

import { displayMessage } from "./toast";

import {
  createPainter,
  createItemProvider,
  createStorageServer,
} from "./modifiers/";

import { createRandomObjective } from "./utils";

class Game implements GameState {
  isPaused = false;
  levelCompleted = false;
  level = -1;

  players: Player[] = [];
  objects: GameObject[] = [];

  objectives: Objective[] = [];

  loadLevel(level: number) {
    this.level = level % LEVELS.length;
    this.objects = [...this.players];
    this.levelCompleted = false;
    this.isPaused = false;

    this.players.forEach((player) => player.resetPos());

    const config = LEVELS[this.level];

    const providers = config.providers.map((pos, idx) =>
      createItemProvider(pos, config.items[idx])
    );

    const painters = config.painters.map((pos, idx) =>
      createPainter(pos, config.colors[idx])
    );

    this.objectives = config.servers.map((el, idx) =>
      createRandomObjective(config.items, config.colors)
    );

    const servers = this.objectives.map((objective, idx) =>
      createStorageServer(config.servers[idx], objective)
    );

    this.objects.unshift(...providers, ...painters, ...servers);

    displayMessage(config.message, 4000);
  }

  resize(scaleTo: number) {
    this.objects.forEach((object) => object.onResize(scaleTo));
  }

  renderObjectives(ctx: Ctx) {
    ctx.save();

    ctx.textAlign = "center";
    ctx.font = "14px bold";

    ctx.lineWidth = 3;
    ctx.translate(0, 10);

    this.objectives.forEach((objective, i) => {
      ctx.translate(i > 0 ? TILE_SIZE * 2.5 : TILE_SIZE * 0.5, 0);

      ctx.globalAlpha = objective.completed ? 0.5 : 1;

      objective.components.forEach(({ itemId, color }, j) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, 18 * j, TILE_SIZE * 2, 18);

        ctx.fillStyle = "black";
        ctx.fillText(itemId, TILE_SIZE, (1 + j) * 16.5);
      });

      ctx.strokeStyle = objective.completed ? "lightgreen" : "black";
      ctx.strokeRect(0, 0, TILE_SIZE * 2, objective.components.length * 18);
    });

    ctx.restore();
  }

  onObjectiveCompleted() {
    this.levelCompleted = this.objectives.every(
      (objective) => objective.completed
    );

    if (this.levelCompleted) {
      displayMessage("Level Completed!", 5000);
      setTimeout(() => this.loadLevel(this.level + 1), 6000);
    }
  }

  render(ctx: Ctx) {
    drawFloor(ctx);

    if (this.level === -1) {
      // drawFloor(ctx);
      return;
    }

    if (this.isPaused) {
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "2rem monospace";
      ctx.fillText("Game Paused", ctx.canvas.width / 2, ctx.canvas.width / 2);
      return;
    }

    this.renderObjectives(ctx);

    this.objects.forEach((object) => {
      object.active && object.update(this.objects).render(ctx);
    });
  }
}

function drawFloor(ctx: Ctx) {
  let s = ctx.canvas.width;

  ctx.save();
  ctx.drawImage(ASSETS.floor, 0, 0, s, s);

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, s, s);

  ctx.restore();
}

const game = new Game();
export default game;
