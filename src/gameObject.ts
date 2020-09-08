import { getDistance, addVectors } from "./utils";
import { TILE_SIZE } from "./index";

export default class implements GameObject {
  pos: Vector = [0, 0];
  active = true;

  w: number;
  h: number;

  hue = 0;
  scale = 1;

  item?: GameObject;
  owner?: Player;

  offset = 0;
  offsetDirection = 1;

  constructor(
    public id: string,
    public type: string,
    public color: Color = "white",
    public asset?: HTMLImageElement
  ) {
    this.onResize(TILE_SIZE, 1);
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

  onResize(tileSize: number, scale: number) {
    this.w = tileSize * 1.5;
    this.h = tileSize * 0.5;
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
    ctx.font = "bold 12px monospace";
    ctx.fillText(this.id, this.w * 0.5, this.h + 14);
  }

  renderDetails(ctx: Ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, this.w, this.h);
  }

  render(ctx: Ctx) {
    let [x, y] = this.pos;

    ctx.save();

    ctx.translate(x, y + this.offset);
    ctx.fillStyle = this.color;
    !this.owner && this.renderId(ctx);

    ctx.scale(this.scale, this.scale);
    if (this.rotation) {
      // rotate image and elevate shoulder
      ctx.rotate(this.rotation);
      ctx.translate(0, -20 * this.rotation);
    }

    if (this.type === "player")
      ctx.filter = `contrast(1.1) hue-rotate(${this.hue}deg)`;

    this.asset
      ? ctx.drawImage(this.asset, 0, 0)
      : ctx.fillRect(0, 0, this.w, this.h);

    this.renderDetails(ctx);

    ctx.restore();
  }
}
