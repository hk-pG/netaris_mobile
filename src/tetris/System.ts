import { baka, canvas, ctx, openButton } from "./dom";

const buttonDisplay = () => {
  openButton.style.display = "block";
};

export class System {
  private static isGameStarted: boolean = false;
  private static isGameOvered: boolean = false;
  private static gameTurn: number = 0;
  public static score: number = 0;
  public static gameId: NodeJS.Timer;
  public static deviceOrientation = { x: 0, y: 0, z: 0 };

  constructor() {}

  static startGame() {
    this.isGameStarted = true;
  }

  static stopGame() {
    this.isGameStarted = false;
  }

  static get _isGameStarted(): boolean {
    return this.isGameStarted;
  }

  static overGame() {
    console.trace("overGame");
    this.isGameOvered = true;

    ctx.font = "bold 250% verdana";
    let overMessage = "＼(^o^)／ｵﾜﾀ";
    let w = ctx.measureText(overMessage).width;
    let x = canvas.width / 2 - w / 2;
    let y = canvas.height / 2 - w / 20;
    ctx.fillStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeText(overMessage, x, y);
    ctx.fillText(overMessage, x, y);
    baka.innerText = "ごめんなさい(m´・ω・｀)m";
    baka.classList.add("impact");
    buttonDisplay();
  }

  static get _isGameOvered(): boolean {
    return this.isGameOvered;
  }

  static incrementGameTurn() {
    this.gameTurn++;
  }

  static get _gameTurn(): number {
    return this.gameTurn;
  }

  public static addScore(additional: number): number {
    this.score += additional;
    return this.score;
  }
}
