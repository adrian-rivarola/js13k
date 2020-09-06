export default class GameObj implements GameObject {
  pos: Vector = [0, 0];
  owner?: Player;
  scale = 1;
  w = 32;
  h = 16;

  hue = 0;

  offset = 0;
  offsetDirection = 1;

  constructor(
    public id: string,
    public type: string,
    public color: Color,
    public asset?: HTMLImageElement
  ) {}

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

  setColor(newColor: Color) {
    this.color = newColor;
    console.log(`${this.owner?.id} painted ${this.id} in ${newColor}`);
  }

  update(): GameObject {
    if (this.type === "item" && !this.owner) {
      if (this.offset > 3) this.offsetDirection = -0.5;
      else if (this.offset < -3) this.offsetDirection = 0.5;
      this.offset += this.offsetDirection;
    }

    return this;
  }

  renderDetails(ctx: Ctx) {}

  renderId(ctx: Ctx) {
    ctx.textAlign = "center";
    ctx.font = "bold 12px monospace";
    ctx.fillText(this.id, this.w * 0.5, this.h + 14);
  }

  render(ctx: Ctx) {
    let [x, y] = this.pos;
    ctx.save();

    ctx.translate(x, y + Math.floor(this.offset));
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
      ? ctx.drawImage(this.asset, 11, 0)
      : ctx.fillRect(0, 0, this.w, this.h);

    this.renderDetails(ctx);

    ctx.restore();
  }
}
