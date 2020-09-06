type Color = string | CanvasGradient | CanvasPattern;
type Command = (player: Player) => void;
type Ctx = CanvasRenderingContext2D;
type Vector = [number, number];

interface PlayerAssets {
  body: HTMLImageElement;
  arms: HTMLImageElement;
}

interface Controller {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action: boolean;
  release: boolean;
}

interface GameObject {
  id: string;
  type: string;

  pos: Vector;
  center: Vector;

  w: number;
  h: number;

  color: Color;
  item?: GameObject;
  owner?: GameObject;
  scale?: number;
  asset?: HTMLImageElement;
  rotation?: number;

  setColor(newColor: Color): void;
  onAction(actor: GameObject): void;
  update(level?: GameObject[]): GameObject;
  render(ctx: Ctx): void;
}

interface Player extends GameObject {
  controller: Controller;
  vel: Vector;
  pickItem(item: GameObject): void;
  releaseItem(): void;
}
