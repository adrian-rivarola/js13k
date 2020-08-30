import { clamp } from "./utils";

export default class PlayerC implements Player {
  x = 0;
  y = 0;
  w = 32;
  h = 48;
  dx = 0;
  dy = 0;
  speed = 10;
  scale = 2;
  direction = 1;
  animations?: ImageBitmap[][] = [];
  animationState = 0;
  activeFrame = 0;
  acumulatedFrames = 0;

  constructor(
    readonly name: string,
    private color: string,
    private controller: Controller,
    spriteSheet: HTMLImageElement
  ) {
    this.setAnimations(spriteSheet);
  }

  setAnimations(spriteSheet: HTMLImageElement) {
    const frameH = spriteSheet.height / 2,
      frameW = spriteSheet.width / 2;

    Promise.all([
      // idle frames
      createImageBitmap(spriteSheet, 0, 0, frameW, frameH),
      createImageBitmap(spriteSheet, frameW, 0, frameW, frameH),
      // walk frames
      createImageBitmap(spriteSheet, 0, frameH, frameW, frameH),
      createImageBitmap(spriteSheet, frameW, frameH, frameW, frameH),
    ]).then((images) => {
      this.animations = [[images[2], images[2]], images.slice(2, 4)];
    });
  }

  get currentFrame(): ImageBitmap | undefined {
    if (this.animations[this.animationState])
      return this.animations[this.animationState][this.activeFrame];
  }

  move() {
    if (this.controller.up) this.dy -= 0.5;
    else if (this.controller.down) this.dy += 0.5;
    else this.dy = 0;

    if (this.controller.left) {
      this.direction = -1;
      this.dx -= 0.5;
    } else if (this.controller.right) {
      this.direction = 1;
      this.dx += 0.5;
    } else this.dx = 0;

    this.dx = clamp(-this.speed, this.speed, this.dx * 0.75);
    this.dy = clamp(-this.speed, this.speed, this.dy * 0.75);

    this.x = clamp(0, 512, this.x + this.dx);
    this.y = clamp(0, 512, this.y + this.dy);
  }

  update() {
    this.move();

    this.animationState = +!(this.dx === 0 && this.dy === 0);
    if (++this.acumulatedFrames === 10) {
      this.activeFrame = (this.activeFrame + 1) % 2;
      this.acumulatedFrames = 0;
    }

    return this;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.translate(this.x, this.y);
    this.direction === -1 && ctx.translate(this.w * this.scale, 0);

    ctx.scale(this.direction * this.scale, this.scale);

    this.currentFrame
      ? ctx.drawImage(this.currentFrame, 0, 0)
      : ctx.fillRect(0, 0, this.w, this.h);

    ctx.restore();
  }
}