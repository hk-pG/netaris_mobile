export class System {
  private static isGameStarted: boolean = false;
  private static isGameOvered: boolean = false;
  private static gameTurn: number = 0;
  private static score: number = 0;

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
    this.isGameOvered = true;
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

/*
// 変数

// ゲームが開始しているかどうか
export let gameStart = false;

// ゲームオーバーフラグ
export let gameOver = false;

// 経過時間（ターン）
export let turn = 0;

// console.log("now : " + Ttype + " new : " + newTtype);

export let gameId: number;
*/
