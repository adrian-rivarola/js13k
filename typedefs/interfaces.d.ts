interface Controller {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action: boolean;
}

declare enum AnimationState {
  IDLE = 0,
  WALK = 1,
}

interface Player {
  x: number;
  y: number;
  w: number;
  h: number;
  dx: number;
  dy: number;
  speed: number;
  direction: number;
  animations?: ImageBitmap[][];
  update(): Player;
  render(ctx: CanvasRenderingContext2D): void;
}

interface Position {
  x: number;
  y: number;
}

interface GameComponent {
  type: string;
  onAction(player: Player): void;
}
