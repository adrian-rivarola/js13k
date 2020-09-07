import GameObjectClass from "./gameObject";
import { getDistance } from "./utils";
import { ctx } from "./index";

class Modifier extends GameObjectClass {
  constructor(id: string, actionCommand: Command, color?: Color) {
    super(id, "modifier", color);
    this.onAction = (player: Player) => actionCommand(player);
  }

  onResize(tileSize: number) {
    this.w = this.h = tileSize;
  }
}

export function createItemProvider(itemId: string, level: GameObject[]) {
  const command = (player: Player) => {
    if (player.item) return;

    let newItem = new GameObjectClass(itemId, "item", "white");
    player.pickItem(newItem);
    level.unshift(newItem);
  };

  return new Modifier(itemId, command);
}

export function createPainter(color: Color) {
  const command: Command = (player: Player) => player.item?.setColor(color);

  let id = typeof color === "string" ? color : "painter";
  return new Modifier(id, command, color);
}

export function createTrahsCan(level: GameObject[]) {
  function command(player: Player) {
    if (!player.item || player.item.type === "player") return;

    let idx = level.findIndex((object) => object.id === player.item.id);
    if (idx !== -1) {
      console.log(`${player.item.id} deleted`);

      player.releaseItem();
      level.splice(idx, 1);
    }
  }

  return new Modifier("TrashCan", command, "purple");
}

export function createStorageServer() {
  const storage: GameObject[] = [];
  let maxCapacity = 5;
  let server: Modifier;

  function command(player: Player) {
    if (player.item) {
      if (storage.length === maxCapacity || player.item.item)
        return console.log(`cannot store ${player.item.id}`);

      storage.push(player.releaseItem(false));
    } else if (storage.length) {
      player.pickItem(storage.pop());
    } else {
      console.log("server is empty");
    }

    server.id = `Capacity: ${storage.length}/${maxCapacity}`;
  }

  server = new Modifier(
    "Capacity: 0/" + maxCapacity,

    command,
    "grey"
  );

  server.renderDetails = function (ctx: Ctx) {
    ctx.translate(4, 4);
    storage.forEach((object, idx) => {
      ctx.fillStyle = object.color;
      ctx.fillRect(0, idx * 5, server.w - 8, 4);
    });
  };

  return server;
}

export function createSpeedBooster() {
  let booster: Modifier;
  let enabled = true;

  function command(player: Player) {
    if (!enabled) return;

    enabled = false;
    booster.color = "rgba(255, 255, 255, 0.0)";

    ++player.maxSpeed;

    setTimeout(() => {
      enabled = true;
      booster.color = "rgba(255, 255, 255, 0.1)";
      --player.maxSpeed;
    }, Math.floor(2 + Math.random() * 3) * 1000);
  }

  booster = new Modifier("speedBost", () => {}, "rgba(255, 255, 255, 0.1)");

  booster.update = (level: GameObject[]) => {
    if (!enabled) return booster;

    let players = level.filter((object) => object.type === "player");

    players.forEach((player) => {
      let dist = getDistance(player.pos, booster.pos);
      dist < 30 && command(player as any);
    });

    return booster;
  };

  return booster;
}

export function creatBug() {
  const command = (object: GameObject) => {
    if (object.item?.type !== "item" || typeof object.item.color !== "string")
      return;

    const gradient = ctx.createLinearGradient(0, 0, 32, 32);
    gradient.addColorStop(0.3, object.item.color);
    gradient.addColorStop(0.3, "darkgreen");

    object.item.color = gradient;
  };

  const bug = new Modifier("bug", command, "darkgreen");

  bug.update = (level: GameObject[]) => {
    const [target, dist] = bug.getClosestObject(
      level.filter((object) => object.type === "player")
    );
    if (dist < 64) command(target);

    bug.pos[0] = (bug.pos[0] + 3) % 512;
    bug.pos[1] = (bug.pos[1] + 2) % 512;

    return bug;
  };

  return bug;
}
