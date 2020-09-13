type Color = string | CanvasGradient | CanvasPattern;
type Command = (player: Player) => void;
type Ctx = CanvasRenderingContext2D;
type Vector = [number, number];
type BlockPosition = [string | number, number | string];

interface GameState {
  isPaused: boolean;
  level: number;
  objects: GameObject[];
  objectives: Objective[];
  blocks: Vector[];
  players: Player[];

  onObjectiveCompleted(): void;
  resize(scaleTo: number): void;
  render(ctx: Ctx): void;
}

interface Objective {
  components: PageComponent[];
  completed: boolean;
  timeToComplete: number;
}

interface PageComponent {
  itemId: string;
  color: string;
}

interface GameObject {
  id: string;
  type: string;
  active: boolean;
  preventCollision: boolean;

  scale: number;
  rotation?: number;

  pos: Vector;
  center: Vector;

  w: number;
  h: number;

  offset: number;
  offsetDirection: number;
  color: Color;
  item?: GameObject;
  owner?: GameObject;
  asset?: HTMLImageElement;

  getClosestObject(level: GameObject[]): [GameObject, number];
  onAction(actor: GameObject): void;

  onResize(scaleTo: number): void;
  setColor(newColor: Color): void;
  resetPos(): void;

  update(level: GameObject[], blocks: Vector[]): GameObject;
  render(ctx: Ctx): void;
  renderId(ctx: Ctx): void;
  renderDetails(ctx: Ctx): void;
}

interface Modifier extends GameObject {}

interface Player extends GameObject {
  vel: Vector;
  maxSpeed: number;

  move(level: GameObject[], blocks: Vector[]): void;
  pickItem(item: GameObject): void;
  dropItem(isActive?: boolean): GameObject;
}

interface Controller {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action: boolean;
  release: boolean;
}
