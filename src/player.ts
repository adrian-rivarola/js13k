import GameObject from "./gameObject";
import { clamp, addVectors, getDistance } from "./utils";

export default class PlayerC extends GameObject implements Player {
  type = "player";
  score = 0;

  items: GameObject[] = [];
  coolDown = false;

  vel: Vector = [0, 0];
  w: number;
  h: number;
  scale = 1.5;
  images = {
    body: null,
    arms: null,
  };

  constructor(
    name: string,
    color: string,
    body: HTMLImageElement,
    arms: HTMLImageElement,
    public controller: Controller
  ) {
    super(name, color);

    this.images = { body, arms };
    this.w = arms.width * this.scale;
    this.h = arms.height * this.scale;
  }

  get maxSpeed() {
    return this.items.length ? 2 : 3;
  }

  get hasPlayer() {
    return this.items[0]?.type === "player";
  }

  get hasItems() {
    return !!this.items.length;
  }

  accelerate() {
    if (this.controller.left) this.vel[0] -= 0.2;
    else if (this.controller.right) this.vel[0] += 0.2;
    else this.vel[0] = 0;

    if (this.controller.up) this.vel[1] -= 0.2;
    else if (this.controller.down) this.vel[1] += 0.2;
    else this.vel[1] = 0;

    const s = this.maxSpeed;
    this.vel[0] = clamp(-s, s, this.vel[0] * 1);
    this.vel[1] = clamp(-s, s, this.vel[1] * 1);
  }

  commitAction(objects: GameObject[]) {
    let closestTatget: { obj?: GameObject; dist: number } = {
      obj: null,
      dist: 500,
    };

    objects.forEach((obj) => {
      let dist = getDistance(this.pos, obj.pos);
      if (dist < closestTatget.dist) {
        closestTatget = {
          dist,
          obj,
        };
      }
    });

    if (closestTatget.dist <= this.w) {
      closestTatget.obj.onAction(this);
    }
  }

  onAction(p: Player) {
    const canPickMeUp =
      p.items.length == 0 || p.items.every((item) => item.type === this.type);

    const isMyChild = this.items.find((item) => item.id === p.id);
    if (!canPickMeUp || isMyChild) return;

    this.isPicked = true;
    p.items.push(this);
  }

  releaseItem() {
    const player = this.items[0] as Player;

    player.pos[1] += this.h * 1.4;
    player.pos[0] += this.w;
    player.isPicked = false;

    this.items = [];
    this.coolDown = true;
    setTimeout(() => (this.coolDown = false), 1000);
  }

  update(level: GameObject[]) {
    this.accelerate();
    !this.isPicked && (this.pos = addVectors(this.pos, this.vel));

    this.hasItems && this.updateItems();

    if (!this.coolDown && this.controller.action) {
      this.controller.action = false;

      if (this.hasPlayer) {
        this.releaseItem();
      } else {
        if (this.isPicked) level = level.filter((obj) => obj.id !== "player");
        level = level.filter((obj) => obj.id !== this.id && !obj.isPicked);
        this.commitAction(level);
      }
    }

    return this;
  }

  updateItems() {
    this.items.forEach((item) => {
      item.pos[0] = this.pos[0];
      item.pos[1] = this.pos[1] - this.h;
    });
  }

  render(ctx: Ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    if (!this.isPicked) {
      ctx.fillStyle = this.color;
      ctx.textAlign = "center";
      ctx.font = "bold 12px monospace";
      ctx.fillText(this.id, this.w * 0.5, this.h + 14);
    }

    const [dx] = this.vel;
    if (dx > 0) {
      ctx.rotate(0.1);
      ctx.translate(0, -3);
    } else if (dx < 0) {
      ctx.rotate(-0.1);
      ctx.translate(0, 3);
    }

    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.images.body, 11, 0);

    if (this.items.length) {
      ctx.scale(1, -this.scale);
      ctx.translate(0, -this.h / 2);
    }
    ctx.drawImage(this.images.arms, 0, 0);

    ctx.restore();
  }
}
