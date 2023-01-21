import { System } from "./System";
import { canvas, ctx, ntx } from "./dom";
import { gameStartMessage } from "./functions/gameStartMessage";
import { restartGame } from "./functions/restartGame";
import {
  blockSize,
  fieldCol,
  fieldRow,
  scoreView,
  tetris,
  tetroColors,
  tetroSize,
} from "./index";

const addScore = (lineCount: number) => {
  console.log(`lineCount is ${lineCount}`);
  let add = (lineCount + Math.floor(lineCount / 2)) * 100;
  console.log(add);
  const score = System.addScore(add);
  scoreView.innerText = `SCORE : ${score} P`;
};

// ブロック一つを描画する
/**
 *
 * @param x 描画するx座標
 * @param y 描画するy座標
 * @param minoType 描画するミノのタイプ(0の場合は着地点を描画)
 * @param where 描画するcanvasを指定する。ゲーム画面、next、ホールドのcontextを分けて使う
 */
export const drawBlock = (
  x: number,
  y: number,
  minoType: number,
  where: CanvasRenderingContext2D
) => {
  let px = x * blockSize;
  let py = y * blockSize;

  where.lineWidth = 1;
  where.fillStyle = tetroColors[minoType];
  where.fillRect(px, py, blockSize, blockSize);

  where.strokeStyle = "black";

  if (minoType == 0) {
    // 着地点
    ctx.setLineDash([2, 2]);
  } else {
    // 本体
    where.setLineDash([0, 0]);
  }

  if (tetris.currentMino.type != 9) {
    where.strokeRect(px, py, blockSize, blockSize);
  }
};

//ブロックの当たり判定
export const checkMove = (
  mx: number,
  my: number,
  nextMino = tetris.currentMino.mino
) => {
  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      if (nextMino[y][x]) {
        const { x: tetroX, y: tetroY } = tetris.currentPos.getPos();
        let nx = tetroX + mx + x;
        let ny = tetroY + my + y;

        if (
          ny < 0 ||
          nx < 0 ||
          ny >= fieldRow ||
          nx >= fieldCol ||
          tetris.field[ny][nx]
        )
          return false;
      }
    }
  }
  return true;
};

export const drawAll = () => {
  // フィールドのクリア　ー＞　現在の描画を一旦消す
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const field = tetris.field;

  // フィールドの描画
  for (let y = 0; y < fieldRow; y++) {
    for (let x = 0; x < fieldCol; x++) {
      if (field[y][x]) {
        drawBlock(x, y, field[y][x], ctx);
      }
    }
  }

  // テトロミノの描画 ----------------------------------------------------------------

  //  下にいくつ行けるかを調べる
  let under = 0;
  while (checkMove(0, under + 1)) under++;
  let writeLine = true;
  if (tetris.currentMino.type == 9) writeLine = false;

  const tetro = tetris.currentMino.getMino();

  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      if (tetro[y][x]) {
        // 着地点
        const { x: tetroX, y: tetroY } = tetris.currentPos.getPos();
        if (writeLine) {
          drawBlock(
            tetroX + x,
            tetroY + y + under,
            0,
            ctx /* 0を指定すればテトロミノの0番目の空白のミノを指定できる */
          );
        }

        // テトロミノ本体
        drawBlock(tetroX + x, tetroY + y, tetris.currentMino.type, ctx);
      }
    }
  }

  if (System._isGameOvered) {
    System.overGame();
  }
};

const fixTetro = () => {
  const tetro = tetris.currentMino.getMino();
  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      if (tetro[y][x]) {
        const { x: tetroX, y: tetroY } = tetris.currentPos.getPos();
        const type = tetris.currentMino.type;
        if (!type) return;
        //   フィールドに現在のタイプ（Ttype）のミノを固定する
        tetris.field[tetroY + y][tetroX + x] = type;
      }
    }
  }
};

const checkLine = () => {
  let lineCount = 0;
  for (let y = 0; y < fieldRow; y++) {
    let flag = true;
    for (let x = 0; x < fieldCol; x++) {
      if (!tetris.field[y][x]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      lineCount++;
      for (let ny = y; ny > 0; ny--) {
        for (let nx = 0; nx < fieldCol; nx++) {
          tetris.field[ny][nx] = tetris.field[ny - 1][nx];
        }
      }
      addScore(lineCount);
    }
  }
};

const drawNext = () => {
  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      const next = tetris.nextMino;
      console.info(`next type is ${next.type}`);
      if (next.mino[y][x]) {
        drawBlock(x, y, next.type, ntx);
      }
    }
  }
};

//    テトロミノが落ちる処理
export const dropBlock = () => {
  //    ゲームオーバーだったら、その時点で処理をしない
  if (System._isGameOvered) {
    restartGame();
    return;
  }
  if (System._isGameStarted) {
    if (checkMove(0, 1) /* 現在地の一つ下に行けるか（落ちれるか）を調べる */) {
      tetris.currentPos.drop(); // tetroY++; // 一つ下にミノを落とす
    } else {
      //もう下に行けない　ー＞　一番下もしくはミノの上

      tetris.allowHold();

      fixTetro(); //フィールドに現在のミノを同化させる

      checkLine(); //一行消せるかどうかを確認する

      // createTetro(); // 新しいミノを作る
      tetris.createTetris();

      // 新しいミノが現在地で動けるかどうか　ー＞　動けない　＝　ミノまたは壁に接触している　＝　ゲームオーバー
      if (!checkMove(0, 0)) {
        System.overGame();
      }
    }
    //また描画リセット＆着地点等の処理を呼ぶ
    drawAll();
    drawNext();
  } else {
    gameStartMessage();
  }
};

// テトロミノの回転
export const rotate = (rotateType: number) => {
  let newTet: number[][] = [];
  const tetro = tetris.currentMino.mino;
  for (let y = 0; y < tetroSize; y++) {
    newTet[y] = [];
    for (let x = 0; x < tetroSize; x++) {
      let nx;
      let ny;
      if (!rotateType) {
        nx = tetroSize - x - 1;
        ny = y;
      } else {
        nx = x;
        ny = tetroSize - y - 1;
      }
      newTet[y][x] = tetro[nx][ny];
    }
  }
  return newTet;
};
