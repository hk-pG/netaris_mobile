import {
  fieldCol,
  fieldRow,
  holdView,
  htx,
  next,
  ntx,
  startX,
  startY,
  tetroSize,
  tetroTypes,
} from "./index";
import { drawBlock, startGame } from "./functions";
import { getRandomNum } from "./functions/rand";

export class Position2d {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getPos() {
    return { x: this.x, y: this.y };
  }

  public setPos(pos: Partial<Position2d>) {
    this.x = pos.x ?? this.x;
    this.y = pos.y ?? this.y;
  }

  public moveLeft(moves: number = 1) {
    this.x -= moves;
  }

  public moveRight(moves: number = 1) {
    this.x += moves;
  }

  public drop(drops: number = 1) {
    this.y += drops;
  }
}

export class Mino {
  public mino: number[][] = [];
  public type?: number;

  constructor(type?: number) {
    this.type = type;
  }

  public getMino() {
    return this.mino;
  }

  public changeMino(minoType: number) {
    this.type = minoType;
    this.mino = tetroTypes[minoType];

    return this.mino;
  }
}

export class Tetris {
  public field: number[][] = [[]];
  public currentMino: Mino;
  public currentPos: Position2d;

  public nextMino: Mino;
  public holdMino: Mino = new Mino();

  private dropSpeed: number;

  private isHolding: boolean = false;
  private isAllowedHold: boolean = false;

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

  public get _dropSpeed(): number {
    return this.dropSpeed;
  }

  public startGame() {
    this.init();
    startGame(this.dropSpeed);
  }

  public init() {
    console.log("init");

    for (let y = 0; y < fieldRow; y++) {
      this.field[y] = [];
      for (let x = 0; x < fieldCol; x++) {
        this.field[y][x] = 0;
      }
    }

    console.table(this.field);
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
      // toggleHold = false;
      this.prohibitedHold();
      if (!this.isHolding) {
        // ホールドしているフラグを立てる
        // hold = true;
        this.isHolding = true;

        // 現在のミノをホールドするので、
        // 現在のミノの情報をまるまるホールドミノへこぴーする
        // holdType = Ttype;
        this.holdMino.changeMino(this.currentMino.type!);

        // createTetro();
        this.createTetris();
      } else {
        // ホールドしている -> 入れ替えをする

        // 現在のミノのタイプを記録し、後でホールドする
        let beforeHoldType = this.currentMino.type;

        this.currentMino.changeMino(beforeHoldType!);
        // holdType = beforeHoldType;
        this.holdMino.changeMino(beforeHoldType!);

        // tetroX = startX;
        // tetroY = startY;
        this.currentPos.setPos({ x: startX, y: startY });
      }

      htx.clearRect(0, 0, holdView.width, holdView.height);
      for (let x = 0; x < tetroSize; x++) {
        for (let y = 0; y < tetroSize; y++) {
          if (this.holdMino.mino[y][x]) {
            drawBlock(x, y, this.holdMino.type!, htx);
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
