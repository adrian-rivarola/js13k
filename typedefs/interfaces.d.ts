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
  pos: Vector;
  center: Vector;
  w: number;
  h: number;
  item?: Item;
  scale?: number;
  rotation?: number;
  type: string;
  color: Color;
  asset?: HTMLImageElement;
  owner?: GameObject;

  onAction(actor: GameObject): void;
  update(level?: GameObject[]): GameObject;
  render(ctx: Ctx): void;
}

interface Item extends GameObject {}

interface Player extends GameObject {
  controller: Controller;
  vel: Vector;
  pickItem(item: GameObject): void;
  releaseItem(): void;
}
