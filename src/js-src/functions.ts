import { System } from "./System";
import { getRandomNum } from "./functions/rand";
import {
  baka,
  blockSize,
  canvas,
  ctx,
  fieldCol,
  fieldRow,
  ntx,
  openButton,
  scoreView,
  tetris,
  tetroColors,
  tetroSize,
  tetroTypes,
} from "./index";

const restartButton = document.getElementById("restart-button")!;

const restartGame = () => {
  restartButton.classList.remove("hidden");
  restartButton.addEventListener("click", () => {
    location.reload();
  });
};

const gameStartMessage = () => {
  ctx.beginPath();
  ctx.font = "bold 150% verdana";
  let overMessage = "START TO 'SPACE'";
  let w = ctx.measureText(overMessage).width;
  let x = canvas.width / 2 - w / 2;
  let y = canvas.height / 2 - w / 20;
  ctx.fillStyle = "white";
  ctx.lineWidth = 4;
  ctx.strokeText(overMessage, x, y);
  ctx.fillText(overMessage, x, y);
  ctx.closePath();
};

const buttonDisplay = () => {
  openButton.style.display = "block";
};

const addScore = (lineCount: number) => {
  console.log(`lineCount is ${lineCount}`);
  let add = (lineCount + Math.floor(lineCount / 2)) * 100;
  console.log(add);
  const score = System.addScore(add);
  scoreView.innerText = `SCORE : ${score} P`;
};

// ブロック一つを描画する
export const drawBlock = (
  x: number,
  y: number,
  c: number,
  where: CanvasRenderingContext2D
) => {
  let px = x * blockSize;
  let py = y * blockSize;

  where.lineWidth = 1;
  where.fillStyle = tetroColors[c];
  where.fillRect(px, py, blockSize, blockSize);

  where.strokeStyle = "black";

  if (c == 0) {
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
const checkMove = (mx: number, my: number, ntetro?: number[][]) => {
  if (ntetro == undefined) ntetro = tetris.currentMino.mino;
  const nextMino = tetris.currentMino.getMino();

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
          tetris.currentMino.getMino()
        )
          return false;
      }
    }
  }
  return true;
};

const drawAll = () => {
  // フィールドのクリア　ー＞　現在の描画を一旦消す
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const field = tetris.currentMino.getMino();

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
        drawBlock(tetroX + x, tetroY + y, tetris.currentMino.type!, ctx);
      }
    }
  }

  if (System._isGameOvered) {
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
      if (next.mino[y][x]) {
        drawBlock(x, y, next.type!, ntx);
      }
    }
  }
};

//    テトロミノが落ちる処理
const dropBlock = () => {
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
const rotate = (rotateType: number) => {
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
        // nx = tetroSize - y - 1;
        // ny = tetroSize - x - 1
        nx = x;
        ny = tetroSize - y - 1;
      }
      newTet[y][x] = tetro[nx][ny];
    }
  }
  return newTet;
};

export const startGame = (speed: number) => {
  System.gameId = setInterval(dropBlock, speed);
};

const changeSpeed = (speed: number) => {
  clearInterval(System.gameId);
  startGame(speed);
};
document.onkeydown = (e) => {
  gameController(e.keyCode);
};

document.onkeydown = (e) => {
  gameController(e.keyCode);
};
const gameController = (keycode: number) => {
  if (System._isGameOvered) return;
  let nteto;
  if (System._isGameStarted) {
    switch (keycode) {
      case 37:
        // 左
        if (checkMove(-1, 0)) {
          // tetroX--;
          tetris.currentPos.moveLeft();
        }
        break;
      case 38:
        // 上キーを押すと、一気に下に行く
        while (checkMove(0, 1)) {
          // tetroY += 1;
          tetris.currentPos.drop();
        }
        break;
      case 39:
        // 右
        if (checkMove(1, 0)) {
          // tetroX++;
          tetris.currentPos.moveRight();
        }
        break;
      case 40:
        // 下
        if (checkMove(0, 1)) {
          // tetroY++;
          tetris.currentPos.drop();
        }
        break;
      case 70:
        // Fキー
        nteto = rotate(0);
        if (checkMove(0, 0, nteto)) tetris.currentMino.mino = nteto;
        break;
      case 68:
        nteto = rotate(1);
        if (checkMove(0, 0, nteto)) tetris.currentMino.mino = nteto;
        break;
      case 32:
        // スペース
        // tetroHold();
        tetris.hold();
        break;
    }
    drawAll();
  } else {
    if (keycode === 32) {
      // gameStart = true;
      System.startGame();
      console.log("before start");
    }
  }
};
