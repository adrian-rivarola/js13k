import { getDistance } from "./utils";
import { SCALE, TILE_SIZE } from "./setup";
import ASSETS from "./assets";

export default class implements GameObject {
  pos: Vector = [0, 0];
  active = true;

  asset?: HTMLImageElement;
  w = TILE_SIZE * 1.5;
  h = TILE_SIZE * 0.25;

  hue = 0;
  scale = SCALE;

  item?: GameObject;
  owner?: Player;

  offset = 0;
  offsetDirection = 1;

  constructor(
    public id: string,
    public type: string,
    public color: Color = "white"
  ) {
    this.asset = ASSETS[type];
  }

  get center(): Vector {
    let [x, y] = this.pos;
    return [x + this.w / 2, y + this.h / 2];
  }

  get rotation() {
    return 0;
  }

  onAction(player: Player) {
    if (player.item) return;

    player.pickItem(this);
  }

  onResize(scaleTo: number) {
    this.scale *= scaleTo;
    this.w *= scaleTo;
    this.h *= scaleTo;

    this.pos[0] *= scaleTo;
    this.pos[1] *= scaleTo;
  }

  setColor(newColor: Color) {
    this.color = newColor;
  }

  getClosestObject(level: GameObject[]): [GameObject, number] {
    let result: [GameObject, number] = [null, 1000];

    // filter valid targets
    const invalidIds = [this.id, this.item?.id, this.owner?.id];
    level = level.filter(
      (obj) => obj.active && !obj.owner && !invalidIds.includes(obj.id)
    );

    level.forEach((object) => {
      let distance = getDistance(this.center, object.center);
      if (distance < result[1]) result = [object, distance];
    });

    return result;
  }

  update(level?: GameObject[]): GameObject {
    this.type === "item" && this.updateOffset();
    return this;
  }

  updateOffset() {
    if (this.offset > 2) this.offsetDirection = -0.25;
    else if (this.offset < -2) this.offsetDirection = 0.25;
    this.offset += this.offsetDirection;
  }

  renderId(ctx: Ctx) {
    ctx.textAlign = "center";
    ctx.font = "bold 0.75rem monospace";
    ctx.fillText(this.id, this.w * 0.5, this.h + 14);
  }

  renderDetails(ctx: Ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, this.w / this.scale, this.h / this.scale);
  }

  render(ctx: Ctx) {
    let [x, y] = this.pos;

    ctx.save();
    ctx.translate(x, y + this.offset);

    ctx.fillStyle = this.color;
    !this.owner && this.renderId(ctx);

    ctx.scale(this.scale, this.scale);
    if (this.rotation) {
      ctx.rotate(this.rotation);
      ctx.translate(0, -20 * this.rotation);
    }

    if (this.type === "player")
      ctx.filter = `contrast(1.1) hue-rotate(${this.hue}deg)`;

    this.asset
      ? ctx.drawImage(this.asset, 0, 0)
      : ctx.fillRect(0, 0, this.w / this.scale, this.h / this.scale);

    this.renderDetails(ctx);

    ctx.restore();
  }
}
