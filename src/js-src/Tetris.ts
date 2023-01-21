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
import { canvas, ctx, holdView, htx, next, ntx } from "./dom";
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

  // 初期化
  public init() {
    console.log("init");

    for (let y = 0; y < fieldRow; y++) {
      this.field[y] = [];
      for (let x = 0; x < fieldCol; x++) {
        this.field[y][x] = 0;
      }
    }
  }

  // ゲーム開始
  public startGame() {
    System.gameId = setInterval(dropBlock, this.dropSpeed);
  }

  // 速度変更
  public changeSpeed(speedMilliseconds: number) {
    clearInterval(System.gameId);
    this.dropSpeed = speedMilliseconds;
    this.startGame();
  }

  // 描画系
  public draw() {
    this.drawField();

    this.drawMino();

    if (System._isGameOvered) {
      System.overGame();
    }

    this.drawNext();
  }

  public drawField() {
    // フィールドのクリア　ー＞　現在の描画を一旦消す
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const field = this.field;

    // フィールドの描画
    for (let y = 0; y < fieldRow; y++) {
      for (let x = 0; x < fieldCol; x++) {
        if (field[y][x]) {
          drawBlock(x, y, field[y][x], ctx);
        }
      }
    }
  }

  public drawMino() {
    // テトロミノの描画
    //  下にいくつ行けるかを調べる
    let under = 0;
    while (this.checkMove(0, under + 1)) under++;
    let writeLine = true;
    if (this.currentMino._type == 9) writeLine = false;

    const currentMino = this.currentMino._mino;

    for (let y = 0; y < tetroSize; y++) {
      for (let x = 0; x < tetroSize; x++) {
        if (currentMino[y][x]) {
          // 着地点
          const { x: tetroX, y: tetroY } = this.currentPos.getPos();
          if (writeLine) {
            drawBlock(
              tetroX + x,
              tetroY + y + under,
              0,
              ctx /* 0を指定すればテトロミノの0番目の空白のミノを指定できる */
            );
          }

          // テトロミノ本体
          drawBlock(tetroX + x, tetroY + y, this.currentMino._type, ctx);
        }
      }
    }
  }

  public drawNext() {
    for (let y = 0; y < tetroSize; y++) {
      for (let x = 0; x < tetroSize; x++) {
        console.info(`next type is ${this.nextMino._type}`);
        if (this.nextMino._mino[y][x]) {
          // ntxにnextミノを描画する
          drawBlock(x, y, this.nextMino._type, ntx);
        }
      }
    }
  }

  // 新たにミノを作り、座標を初期値に設定する
  public createTetris() {
    /* 1. 使用するタイプを保存、作成する */
    // 現在のnextのタイプを保存し、これをcurrentに移す
    const currentType = this.nextMino._type;
    // 次のミノのタイプを作成
    const nextType = getRandomNum(1, tetroTypes.length - 1);

    /* 2. 用意したタイプにcurrent,nextのミノを変更する */
    this.currentMino.changeMino(currentType);

    ntx.clearRect(0, 0, next.width, next.height);

    this.nextMino.changeMino(nextType);

    // currentの初期位置を設定する
    this.currentPos.setPos({ x: startX, y: startY });
  }

  //ブロックの当たり判定
  checkMove(
    //
    mx: number,
    my: number,
    nextMino = this.currentMino._mino
  ) {
    for (let y = 0; y < tetroSize; y++) {
      for (let x = 0; x < tetroSize; x++) {
        if (nextMino[y][x]) {
          const { x: tetroX, y: tetroY } = this.currentPos.getPos();
          let nx = tetroX + mx + x;
          let ny = tetroY + my + y;

          if (
            ny < 0 ||
            nx < 0 ||
            ny >= fieldRow ||
            nx >= fieldCol ||
            this.field[ny][nx]
          )
            return false;
        }
      }
    }
    return true;
  }

  /**
   *
   * @param direction 0 or 1
   * 0:時計回り
   * 1:反時計回り
   */
  public rotateMino(direction: number) {
    if (this.checkMove(0, 0, this.currentMino._mino)) {
      this.currentMino.rotateMino(direction);
      return true;
    }

    return false;
  }

  // ホールド
  public hold() {
    if (this.isAllowedHold) {
      // 無限にホールドできないように１度したら置くまでできない
      this.prohibitedHold();
      if (!this.isHolding) {
        // ホールドしているフラグを立てる
        this.isHolding = true;

        // 現在のミノをホールドするので、
        // 現在のミノの情報をまるまるホールドミノへこぴーする
        this.holdMino.changeMino(this.currentMino._type);

        // createTetro();
        this.createTetris();
      } else {
        // ホールドしている -> 入れ替えをする

        // 現在のミノのタイプを記録し、後でホールドする
        let beforeHoldType = this.currentMino._type;

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
          if (this.holdMino._mino[y][x]) {
            drawBlock(x, y, this.holdMino._type, htx);
          }
        }
      }
    }
  }

  // holdの許可フラグ(無限ホールド防止)
  public allowHold() {
    this.isAllowedHold = true;
  }

  public prohibitedHold() {
    this.isAllowedHold = false;
  }

  // getter
  public get _dropSpeed(): number {
    return this.dropSpeed;
  }
}
