const KEYBOARD: Record<string, boolean> = {};
onkeydown = onkeyup = (ev) => (KEYBOARD[ev.key] = ev.type[3] === "d");

export class KeyboardController implements Controller {
  constructor(protected keys: string | string[]) {}

  get up() {
    return KEYBOARD[this.keys[0]];
  }
  get down() {
    return KEYBOARD[this.keys[1]];
  }
  get left() {
    return KEYBOARD[this.keys[2]];
  }
  get right() {
    return KEYBOARD[this.keys[3]];
  }
  get action() {
    return KEYBOARD[this.keys[4]];
  }
}

export class VirtualController extends KeyboardController {
  constructor() {
    super(["VU", "VD", "VL", "VR", "VA"]);
    this.init();
  }

  init() {
    const div = document.createElement("div");
    const buttons = [
      document.createElement("button"),
      document.createElement("button"),
      document.createElement("button"),
      document.createElement("button"),
      document.createElement("button"),
    ];

    buttons.forEach((button, i) => {
      button.ontouchstart = button.onmousedown = (ev: any) => {
        KEYBOARD[this.keys[i]] = true;
      };
      button.onmouseout = button.ontouchend = button.onmouseup = (ev: any) => {
        KEYBOARD[this.keys[i]] = false;
      };
      button.className = `vc ${this.keys[i]}`;
      button.innerText = this.keys[i][1];
      div.appendChild(button);
    });

    document.body.appendChild(div);
  }
}
