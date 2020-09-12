import Modifier from "./modifier";
import game from "../game";

export function createStorageServer(pos: Vector, objective: Objective) {
  const storage: GameObject[] = [];
  const capacity = objective.components.length;
  let server: Modifier;

  function command(player: Player) {
    if (objective.completed) return;

    server.color = "grey";

    if (!player.item) {
      // retrive an object from storage, if any
      if (storage.length) {
        player.pickItem(storage.pop());
      }
    } else if (!player.item.item && storage.length < capacity) {
      // store player's item, and stop rendering it
      storage.push(player.dropItem(false));

      if (storage.length === objective.components.length) {
        objective.completed = storage.every(
          ({ id, color }, idx) =>
            id === objective.components[idx].itemId &&
            color === objective.components[idx].color
        );

        server.color = objective.completed ? "lightgreen" : "red";
        objective.completed &&
          setTimeout(() => game.onObjectiveCompleted(), 150);
      }
    }

    server.id = `${storage.length}/${capacity}`;
  }

  server = new Modifier(`0/${capacity}`, "storage", pos, command, "grey");

  server.renderDetails = function (ctx: Ctx) {
    ctx.translate(4, 4);

    storage.forEach((object, idx) => {
      ctx.fillStyle = object.color;
      ctx.fillRect(0, idx * 8, server.w - 8, 6);
    });
  };

  return server;
}
