type Color = string | CanvasGradient | CanvasPattern;
type Command = (player: Player) => void;
type Ctx = CanvasRenderingContext2D;
type Vector = [number, number];

interface GameState {
  isPaused: boolean;
  levelId: number;
  objects: GameObject[];
  players: Player[];

  init(level?: number): void;
  onResize(scaleTo: number): void;
  render(ctx: Ctx): void;
}

interface GameObject {
  id: string;
  type: string;
  active: boolean;

  scale: number;
  rotation?: number;

  pos: Vector;
  center: Vector;

  w: number;
  h: number;

  color: Color;
  item?: GameObject;
  owner?: GameObject;
  asset?: HTMLImageElement;

  getClosestObject(level: GameObject[]): [GameObject, number];
  onAction(actor: GameObject): void;

  onResize(scaleTo: number): void;
  setColor(newColor: Color): void;

  update(level?: GameObject[]): GameObject;
  render(ctx: Ctx): void;
}

interface Player extends GameObject {
  vel: Vector;
  maxSpeed: number;

  move(): void;
  pickItem(item: GameObject): void;
  releaseItem(isActive?: boolean): GameObject;
}

interface Controller {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action: boolean;
  release: boolean;
}
