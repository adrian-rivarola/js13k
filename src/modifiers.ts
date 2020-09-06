import GameObjectClass from "./gameObject";

class Modifier extends GameObjectClass {
  w = 32;
  h = 32;

  constructor(id: string, type: string, actionCommand: Command, color?: Color) {
    super(id, type, color || "lightblue");
    this.onAction = (player: Player) => actionCommand(player);
  }
}

export function createItemProvider(
  itemId: string,
  level: GameObject[]
): Modifier {
  const command = (player: Player) => {
    if (player.item) {
      console.log(`${player.id} already has an item!`);
      return;
    }
    let newItem = new GameObjectClass(itemId, "item", "white");
    player.pickItem(newItem);
    level.unshift(newItem);
  };

  return new Modifier(itemId, "modifier", command);
}

export function createPainter(color: Color): Modifier {
  const command: Command = (player: Player) => {
    player.item?.setColor(color);
  };

  let id = typeof color === "string" ? color : "painter";
  return new Modifier(id, "modifier", command, color);
}

export function createStorageServer(level: GameObject[]): Modifier {
  const storage: GameObject[] = [];
  let server: Modifier;
  let maxCapacity = 5;

  const command = (player: Player) => {
    if (player.item) {
      if (player.item.item) {
        console.log(
          `cannot store ${player.id}, because it contains ${player.item.item.id}`
        );
      } else if (storage.length < maxCapacity) {
        // stop rendering this item
        let idx = level.findIndex((item) => item.id === player.item.id);
        level.splice(idx, 1);

        storage.push(player.item);
        console.log(`${player.item.id} stored in server`);
        player.releaseItem();
      } else {
        console.log("server is full");
      }
    } else if (storage.length) {
      let item = storage.pop();
      console.log(`${item.id} retrieved from server`);

      level.unshift(item);
      player.pickItem(item);
    } else {
      console.log("server is empty");
    }

    server.id = `Items: ${storage.length}/${maxCapacity}`;
  };

  server = new Modifier(
    "Items: 0/" + maxCapacity,
    "modifier",
    command,
    "yellow"
  );
  return server;
}
