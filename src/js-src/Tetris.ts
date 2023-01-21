import {
  fieldCol,
  fieldRow,
  startX,
  startY,
  tetroSize,
  tetroTypes,
} from "./index";
import { drawBlock, dropBlock } from "./functions";
import { getRandomNum } from "./functions/rand";
import { System } from "./System";
import { holdView, htx, next, ntx } from "./dom";
import { Position2d } from "./class/Position2d";
import { Mino } from "./class/Mino";

export class Tetris {
  public field: number[][] = [[]];
  public currentMino: Mino;
  public currentPos: Position2d;

  public nextMino: Mino;
  public holdMino: Mino = new Mino(0);

  private dropSpeed: number;

  private isHolding: boolean = false;
  private isAllowedHold: boolean = true;

  constructor(
    initialMino: Mino,
    nextMino: Mino,
    initialMinoPos: Position2d,
    dropSpeedMillisecond: number = 800
  ) {
    this.currentMino = initialMino;
    this.nextMino = nextMino;
    this.currentPos = initialMinoPos;
    this.dropSpeed = dropSpeedMillisecond;
    this.init();
  }

  public get _dropSpeed(): number {
    return this.dropSpeed;
  }

  public startGame() {
    System.gameId = setInterval(dropBlock, this.dropSpeed);
  }

  public changeSpeed(speedMilliseconds: number) {
    clearInterval(System.gameId);
    this.dropSpeed = speedMilliseconds;
    this.startGame();
  }

  public init() {
    console.log("init");

    for (let y = 0; y < fieldRow; y++) {
      this.field[y] = [];
      for (let x = 0; x < fieldCol; x++) {
        this.field[y][x] = 0;
      }
    }
  }

  public createTetris() {
    // Ttype = newTtype;
    this.currentMino.type = this.nextMino.type;

    // newTtype = getRandomNum(1, tetroTypes.length - 1);
    const type = (this.nextMino.type = getRandomNum(1, tetroTypes.length - 1));

    // tetro = tetroTypes[Ttype];
    this.currentMino.mino = tetroTypes[type];

    ntx.clearRect(0, 0, next.width, next.height);

    // newTetro = tetroTypes[newTtype];
    this.nextMino.mino = tetroTypes[this.nextMino.type];

    // tetroX = startX;
    // tetroY = startY;

    this.currentPos.setPos({ x: startX, y: startY });
  }

  public hold() {
    if (this.isAllowedHold) {
      // 無限にホールドできないように１度したら置くまでできない
      this.prohibitedHold();
      if (!this.isHolding) {
        // ホールドしているフラグを立てる
        this.isHolding = true;

        // 現在のミノをホールドするので、
        // 現在のミノの情報をまるまるホールドミノへこぴーする
        this.holdMino.changeMino(this.currentMino.type);

        // createTetro();
        this.createTetris();
      } else {
        // ホールドしている -> 入れ替えをする

        // 現在のミノのタイプを記録し、後でホールドする
        let beforeHoldType = this.currentMino.type;

        this.currentMino.changeMino(beforeHoldType);
        // holdType = beforeHoldType;
        this.holdMino.changeMino(beforeHoldType);

        // tetroX = startX;
        // tetroY = startY;
        this.currentPos.setPos({ x: startX, y: startY });
      }

      htx.clearRect(0, 0, holdView.width, holdView.height);
      for (let x = 0; x < tetroSize; x++) {
        for (let y = 0; y < tetroSize; y++) {
          if (this.holdMino.mino[y][x]) {
            drawBlock(x, y, this.holdMino.type, htx);
          }
        }
      }
    }
  }

  public allowHold() {
    this.isAllowedHold = true;
  }

  public prohibitedHold() {
    this.isAllowedHold = false;
  }
}
