import Modifier from "./modifier";

export function createPainter(pos: Vector, color: string) {
  const paintItemCommand: Command = (player: Player) =>
    player.item?.setColor(color);

  return new Modifier("Paint item", "painter", pos, paintItemCommand, color);
}
