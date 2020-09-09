import GameObjectClass from "./gameObject";
import { TILE_SIZE } from "./index";
// import { getDistance } from "./utils";
// import { ctx } from "./index";

class Modifier extends GameObjectClass {
  constructor(
    id: string,
    position: Vector,
    actionCommand: Command,
    color?: Color
  ) {
    super(id, "modifier", color);

    this.pos[0] = position[0] * TILE_SIZE;
    this.pos[1] = position[1] * TILE_SIZE;
    // this.scale = 2;

    this.onAction = (player: Player) => actionCommand(player);
  }

  onResize(tileSize: number, scale: number) {
    // this.scale *= scale;
    this.w = this.h = tileSize;
  }

  renderDetails(ctx: Ctx) {}
}

export function createItemProvider(
  { itemId, pos }: ProviderConfig,
  level: GameObject[]
) {
  const command = (player: Player) => {
    if (player.item) return;

    let newItem = new GameObjectClass(itemId, "item", "white");
    player.pickItem(newItem);
    level.push(newItem);
  };

  return new Modifier(itemId, pos, command);
}

export function createPainter({ color, pos }: PainterConfig) {
  const command: Command = (player: Player) => player.item?.setColor(color);

  let id = typeof color === "string" ? color : "painter";
  return new Modifier(id, pos, command, color);
}

export function createStorageServer({ pos, capacity = 3 }: ServerConfig) {
  const storage: GameObject[] = [];
  let server: Modifier;

  function command(player: Player) {
    if (player.item) {
      if (storage.length === capacity || player.item.item)
        return console.log(`cannot store ${player.item.id}`);

      storage.push(player.releaseItem(false));
    } else if (storage.length) {
      player.pickItem(storage.pop());
    } else {
      console.log("server is empty");
    }

    server.id = `${storage.length}/${capacity}`;
  }

  server = new Modifier("0/" + capacity, pos, command, "grey");

  server.renderDetails = function (ctx: Ctx) {
    ctx.translate(4, 4);

    storage.forEach((object, idx) => {
      ctx.fillStyle = object.color;
      ctx.fillRect(0, idx * 5, server.w - 8, 4);
    });
  };

  return server;
}

export function createTrahsCan(position: Vector, level: GameObject[]) {
  function command(player: Player) {
    if (!player.item || player.item.type === "player") return;

    let idx = level.findIndex((object) => object.id === player.item.id);
    if (idx !== -1) {
      console.log(`${player.item.id} deleted`);

      player.releaseItem();
      level.splice(idx, 1);
    }
  }

  return new Modifier("TrashCan", position, command, "purple");
}

// export function createSpeedBooster() {
//   let booster: Modifier;
//   let enabled = true;
//
//   function command(player: Player) {
//     if (!enabled) return;
//
//     enabled = false;
//     booster.color = "rgba(255, 255, 255, 0.0)";
//
//     ++player.maxSpeed;
//
//     setTimeout(() => {
//       enabled = true;
//       booster.color = "rgba(255, 255, 255, 0.1)";
//       --player.maxSpeed;
//     }, Math.floor(2 + Math.random() * 3) * 1000);
//   }
//
//   booster = new Modifier("speedBost", () => {}, "rgba(255, 255, 255, 0.1)");
//
//   booster.update = (level: GameObject[]) => {
//     if (!enabled) return booster;
//
//     let players = level.filter((object) => object.type === "player");
//
//     players.forEach((player) => {
//       let dist = getDistance(player.pos, booster.pos);
//       dist < 30 && command(player as any);
//     });
//
//     return booster;
//   };
//
//   return booster;
// }
//
// export function creatBug() {
//   const command = (object: GameObject) => {
//     if (object.item?.type !== "item" || typeof object.item.color !== "string")
//       return;
//
//     const gradient = ctx.createLinearGradient(0, 0, 32, 32);
//     gradient.addColorStop(0.3, object.item.color);
//     gradient.addColorStop(0.3, "darkgreen");
//
//     object.item.color = gradient;
//   };
//
//   const bug = new Modifier("bug", command, "darkgreen");
//
//   bug.update = (level: GameObject[]) => {
//     const [target, dist] = bug.getClosestObject(
//       level.filter((object) => object.type === "player")
//     );
//     if (dist < 64) command(target);
//
//     bug.pos[0] = (bug.pos[0] + 3) % 512;
//     bug.pos[1] = (bug.pos[1] + 2) % 512;
//
//     return bug;
//   };
//
//   return bug;
// }
