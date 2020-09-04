type Vector = [number, number];

type Ctx = CanvasRenderingContext2D;

interface Controller {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action: boolean;
}

interface GameObject {
  id: string;
  pos: Vector;
  type: string;
  color: string;
  isPicked: boolean;
  onAction(p: Player): void;
  render(ctx: Ctx): void;
}

interface Player extends GameObject {
  controller: Controller;
  vel: Vector;
  maxSpeed: number;
  score: number;
  items: GameObject[];
  update(level: GameObject[]): Player;
}

interface Level {
  playersPosition: Vector[];
  itemsPosition: Record<string, Vector>;
}

interface Modifier {
  type: string;
  pos: Vector;
  color?: string;
  name?: string;
  goal?: Item[];
  onAction(player: Player): void;
}

interface Item {
  name: string;
  color: string;
}
