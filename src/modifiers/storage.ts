import Modifier from "./modifier";
import game from "../game";

export function createStorageServer(pos: Vector, objective: Objective) {
  const storage: GameObject[] = [];
  const capacity = objective.components.length;
  let server: Modifier;

  function command(player: Player) {
    if (objective.completed) return;

    server.color = "white";

    if (!player.item) {
      // retrive an object from storage, if any
      if (storage.length) {
        player.pickItem(storage.pop());
      }
    } else if (!player.item.item && storage.length < capacity) {
      // store player's item, and stop rendering it
      const playerItem = player.dropItem(false);
      storage.push(playerItem);

      if (playerItem.type === "bug") {
        storage.forEach((object) => {
          object.active = true;
        });

        storage.splice(0, storage.length);
      }

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

  server = new Modifier(`0/${capacity}`, "storage", pos, command, "white");

  server.renderDetails = () => {};
  //   ctx.save();
  //
  //   ctx.translate(8, 4);
  //
  //   storage.forEach((object, idx) => {
  //     ctx.fillStyle = object.color;
  //     ctx.fillRect(0, idx * 7, server.w - 16, 3);
  //   });
  //
  //   ctx.restore();
  // };

  return server;
}
