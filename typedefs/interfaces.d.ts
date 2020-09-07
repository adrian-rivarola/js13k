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
  active: boolean;

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

  getClosestObject(level: GameObject[]): [GameObject, number];
  onAction(actor: GameObject): void;
  setColor(newColor: Color): void;
  update(level?: GameObject[]): GameObject;
  render(ctx: Ctx): void;
}

interface Player extends GameObject {
  controller: Controller;
  vel: Vector;

  maxSpeed: number;
  acc: number;

  accelerate(): void;
  move(): void;
  pickItem(item: GameObject): void;
  releaseItem(isActive?: boolean): GameObject;
}
