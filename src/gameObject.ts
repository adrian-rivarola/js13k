export default abstract class GameObj implements GameObject {
  pos: Vector = [0, 0];
  type = "";
  isPicked = false;

  constructor(public id: string, public color: string) {}

  abstract onAction(p: Player): void;

  abstract render(ctx: Ctx): void;
}
