import GameObject from "./gameObject";
import { clamp, addVectors, getDistance, getHueRotation } from "./utils";

export default class extends GameObject implements Player {
  vel: Vector = [0, 0];
  item?: GameObject;

  maxSpeed = 3;
  acc = 0.3;

  scale = 1.5;
  scope = 64;

  constructor(
    id: string,
    color: Color,
    private assets: PlayerAssets,
    public controller: Controller
  ) {
    super(id, "player", color, assets.body);

    this.w = assets.arms.width * this.scale;
    this.h = assets.arms.height * this.scale;

    this.hue = getHueRotation(color);
  }

  get rotation() {
    const [dx] = this.vel;
    if (dx > 0) return 0.1;
    if (dx < 0) return -0.1;
    return 0;
  }

  setColor(newColor: Color) {
    let newHue = getHueRotation(newColor);

    if (newHue !== -1) {
      this.hue = newHue;
      super.setColor(newColor);
    } else console.log(`${this.id} cannot be painted in ${newColor}`);
  }

  accelerate() {
    if (this.controller.left) this.vel[0] -= this.acc;
    else if (this.controller.right) this.vel[0] += this.acc;
    else this.vel[0] = 0;

    if (this.controller.up) this.vel[1] -= this.acc;
    else if (this.controller.down) this.vel[1] += this.acc;
    else this.vel[1] = 0;

    let s = this.maxSpeed;
    this.vel[0] = clamp(-s, s, this.vel[0]);
    this.vel[1] = clamp(-s, s, this.vel[1]);
  }

  move() {
    this.pos = addVectors(this.pos, this.vel);

    if (this.item) {
      this.item.pos = [...this.pos];
      this.item.pos[1] -= this.h;
    }
  }

  pickItem(item: GameObject) {
    console.log(`${this.id} picked ${item.id}`);

    item.w = this.w;
    item.owner = this;
    this.item = item;
    this.item.active = true;
  }
  
  releaseItem(isActive = true): GameObject {
    const item = this.item;

    this.item = null;
    item.active = isActive;
    item.owner = null;

    console.log(`${this.id} released ${item.id}`);
    return item;
  }

  update(level?: GameObject[]) {
    this.accelerate();

    this.move();

    this.updateOffset();

    if (this.controller.action) {
      this.controller.action = false;
      // alert(this.hue % 360);
      const [target, dist] = this.getClosestObject(level);
      if (dist < this.scope) target.onAction(this);
    }
    // if (this.controller.release) ++this.hue;
    if (this.item && this.controller.release) this.releaseItem();

    return this;
  }

  renderDetails(ctx: Ctx) {
    // ctx.translate(0, -this.offset);
    if (this.item) {
      // raise hands
      ctx.scale(1, -this.scale);
      ctx.translate(0, -this.h / 2);
    }
    ctx.drawImage(this.assets.arms, 0, 0);
  }
}
