import { fieldCol, fieldRow } from "./index";
import { init, startGame } from "./functions";

export class Position2d {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Mino {
  public mino: number[][] = [];
  public type?: number;

  constructor(type?: number) {
    this.type = type;
  }
}

export class Tetris {
  private field: number[][] = [[]];
  private currentMino: Mino;
  private nextMino: Mino;
  private holdMino: Mino = new Mino();
  private currentPos: Position2d;
  private dropSpeed: number;

  constructor(
    initialMino: Mino,
    nextMino: Mino,
    initialMinoPos: Position2d,
    dropSpeed: number = 800
  ) {
    this.currentMino = initialMino;
    this.nextMino = nextMino;
    this.currentPos = initialMinoPos;
    this.dropSpeed = dropSpeed;
  }

  public startGame() {
    this.init();
    startGame(this.dropSpeed);
  }

  public init() {
    for (let y = 0; y < fieldRow; y++) {
      this.field[y] = [];
      for (let x = 0; x < fieldCol; x++) {
        this.field[y][x] = 0;
      }
    }
  }
}
/*
フィールドの宣言
export let field: number[][] = [[]];

現在ホールドしているかどうか
export let hold = false;

ホールドして良いかどうか
export let toggleHold = true;

現在操作中のテトロミノの座標
export let tetroX = startX;
export let tetroY = startY;

テトロミノの落ちるスピード -> dropSpeed (ミリ秒)に１ブロック分落ちる (1000ミリ秒で1秒)
export let dropSpeed = 800;

? ミノの情報

現在のミノ本体
export let tetro = tetroTypes[Ttype];

次のミノ本体
export let newTetro = tetroTypes[newTtype];

ホールドしているミノ
export let holdTetro: number[][];

?ミノのタイプ

現在のテトロミノのタイプ
export let Ttype = getRandomNum(1, tetroTypes.length - 1);

次のテトロミノのタイプ
export let newTtype = getRandomNum(1, tetroTypes.length - 1);

ホールドしているテトリミノのタイプ
export let holdType: number[][];
 */
