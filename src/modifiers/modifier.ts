import GameObjectClass from "../gameObject";
import { TILE_SIZE } from "../setup";

export default class extends GameObjectClass {
  preventCollision = true;

  constructor(
    id: string,
    type: string,
    position: Vector,
    actionCommand: Command,
    color?: Color
  ) {
    super(id, type, position, color);
    this.w = this.h = TILE_SIZE;

    this.onAction = (player: Player) => actionCommand(player);
  }

  renderDetails(ctx: Ctx) {
    // ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    // ctx.fillRect(0, 0, this.w, this.h);
  }
}
