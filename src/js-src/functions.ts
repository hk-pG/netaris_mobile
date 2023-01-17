"use strict";
const restartButton = document.getElementById("restart-button");
// **************************************************************1. functions.js *************************************************
const getRandomNum = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 初期化の関数
const init = () => {
  for (let y = 0; y < fieldRow; y++) {
    field[y] = [];
    for (let x = 0; x < fieldCol; x++) {
      // @ts-expect-error TS(7005): Variable 'field' implicitly has an 'any[]' type.
      field[y][x] = 0;
    }
  }
};

const restartGame = () => {
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  restartButton.classList.remove("hidden");
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  restartButton.addEventListener("click", () => {
    location.reload();
  });
};

const gameStartMessage = () => {
  ctx.beginPath();
  ctx.font = "bold 150% verdana";
  let overMessage = "START TO 'SPACE'";
  let w = ctx.measureText(overMessage).width;
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  let x = canvas.width / 2 - w / 2;
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  let y = canvas.height / 2 - w / 20;
  ctx.fillStyle = "white";
  ctx.lineWidth = 4;
  ctx.strokeText(overMessage, x, y);
  ctx.fillText(overMessage, x, y);
  ctx.closePath();
};

const buttonDisplay = () => {
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  openButton.style.display = "block";
};

const addScore = (lineCount: any) => {
  console.log(`lineCount is ${lineCount}`);
  let add = (lineCount + Math.floor(lineCount / 2)) * 100;
  console.log(add);
  score += add;
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  scoreView.innerText = `SCORE : ${score} P`;
};

// ブロック一つを描画する
const drawBlock = (x: any, y: any, c: any, where: any) => {
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

  if (Ttype != 9) {
    where.strokeRect(px, py, blockSize, blockSize);
  }
};

//ブロックの当たり判定
const checkMove = (mx: any, my: any, ntetro: any) => {
  if (ntetro == undefined) ntetro = tetro;

  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      if (ntetro[y][x]) {
        let nx = tetroX + mx + x;
        let ny = tetroY + my + y;

        if (
          ny < 0 ||
          nx < 0 ||
          ny >= fieldRow ||
          nx >= fieldCol ||
          // @ts-expect-error TS(7005): Variable 'field' implicitly has an 'any[]' type.
          field[ny][nx]
        )
          return false;
      }
    }
  }
  return true;
};

const drawAll = () => {
  // フィールドのクリア　ー＞　現在の描画を一旦消す
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // フィールドの描画
  for (let y = 0; y < fieldRow; y++) {
    for (let x = 0; x < fieldCol; x++) {
      // @ts-expect-error TS(7005): Variable 'field' implicitly has an 'any[]' type.
      if (field[y][x]) {
        // @ts-expect-error TS(7005): Variable 'field' implicitly has an 'any[]' type.
        drawBlock(x, y, field[y][x], ctx);
      }
    }
  }

  // テトロミノの描画 ----------------------------------------------------------------

  //  下にいくつ行けるかを調べる
  let under = 0;
  // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
  while (checkMove(0, under + 1)) under++;
  let writeLine = true;
  if (Ttype == 9) writeLine = false;

  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      if (tetro[y][x]) {
        // 着地点
        if (writeLine) {
          drawBlock(
            tetroX + x,
            tetroY + y + under,
            0,
            ctx /* 0を指定すればテトロミノの0番目の空白のミノを指定できる */
          );
        }

        // テトロミノ本体
        drawBlock(tetroX + x, tetroY + y, Ttype, ctx);
      }
    }
  }

  if (gameOver) {
    ctx.font = "bold 250% verdana";
    let overMessage = "＼(^o^)／ｵﾜﾀ";
    let w = ctx.measureText(overMessage).width;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    let x = canvas.width / 2 - w / 2;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    let y = canvas.height / 2 - w / 20;
    ctx.fillStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeText(overMessage, x, y);
    ctx.fillText(overMessage, x, y);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    baka.innerText = "ごめんなさい(m´・ω・｀)m";
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    baka.classList.add("impact");
    buttonDisplay();
  }
};

const fixTetro = () => {
  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      if (tetro[y][x]) {
        //   フィールドに現在のタイプ（Ttype）のミノを固定する
        // @ts-expect-error TS(7005): Variable 'field' implicitly has an 'any[]' type.
        field[tetroY + y][tetroX + x] = Ttype;
      }
    }
  }
};

const checkLine = () => {
  let lineCount = 0;
  for (let y = 0; y < fieldRow; y++) {
    let flag = true;
    for (let x = 0; x < fieldCol; x++) {
      // @ts-expect-error TS(7005): Variable 'field' implicitly has an 'any[]' type.
      if (!field[y][x]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      lineCount++;
      for (let ny = y; ny > 0; ny--) {
        for (let nx = 0; nx < fieldCol; nx++) {
          // @ts-expect-error TS(7005): Variable 'field' implicitly has an 'any[]' type.
          field[ny][nx] = field[ny - 1][nx];
        }
      }
      addScore(lineCount);
    }
  }
};

const drawNext = () => {
  for (let y = 0; y < tetroSize; y++) {
    for (let x = 0; x < tetroSize; x++) {
      if (newTetro[y][x]) {
        drawBlock(x, y, newTtype, ntx);
      }
    }
  }
};

//    テトロミノが落ちる処理
const dropBlock = () => {
  //    ゲームオーバーだったら、その時点で処理をしない
  if (gameOver) {
    restartGame();
    return;
  }
  if (gameStart) {
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
    if (checkMove(0, 1) /* 現在地の一つ下に行けるか（落ちれるか）を調べる */) {
      tetroY++; // 一つ下にミノを落とす
    } else {
      //もう下に行けない　ー＞　一番下もしくはミノの上

      toggleHold = true;

      fixTetro(); //フィールドに現在のミノを同化させる

      checkLine(); //一行消せるかどうかを確認する

      createTetro(); // 新しいミノを作る

      // 新しいミノが現在地で動けるかどうか　ー＞　動けない　＝　ミノまたは壁に接触している　＝　ゲームオーバー
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      if (!checkMove(0, 0)) {
        gameOver = true;
      }
    }
    //また描画リセット＆着地点等の処理を呼ぶ
    drawAll();
    drawNext();
  } else {
    gameStartMessage();
  }
};

const createTetro = () => {
  Ttype = newTtype;
  newTtype = getRandomNum(1, tetroTypes.length - 1);

  tetro = tetroTypes[Ttype];
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  ntx.clearRect(0, 0, next.width, next.height);
  newTetro = tetroTypes[newTtype];

  tetroX = startX;
  tetroY = startY;
};

// テトロミノの回転
const rotate = (rotateType: any) => {
  let newTet = [];
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
      // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
      newTet[y][x] = tetro[nx][ny];
    }
  }
  return newTet;
};

const tetroHold = () => {
  if (toggleHold) {
    toggleHold = false;
    if (!hold) {
      hold = true;
      holdType = Ttype;
      holdTetro = tetroTypes[holdType];
      createTetro();
    } else {
      let beforeHold = Ttype;
      // @ts-expect-error TS(7005): Variable 'holdType' implicitly has an 'any' type.
      Ttype = holdType;
      holdType = beforeHold;
      tetro = tetroTypes[Ttype];
      holdTetro = tetroTypes[holdType];
      tetroX = startX;
      tetroY = startY;
    }
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    htx.clearRect(0, 0, holdView.width, holdView.height);
    for (let x = 0; x < tetroSize; x++) {
      for (let y = 0; y < tetroSize; y++) {
        if (holdTetro[y][x]) drawBlock(x, y, holdType, htx);
      }
    }
  }
};

const startGame = (speed: any) => {
  gameId = setInterval(dropBlock, speed);
};

const changeSpeed = (speed: any) => {
  // @ts-expect-error TS(7005): Variable 'gameId' implicitly has an 'any' type.
  clearInterval(gameId);
  startGame(speed);
  console.log(dropSpeed);
};
document.onkeydown = (e) => {
  gameController(e);
};

document.onkeydown = (e) => {
  gameController(e.keyCode);
};
const gameController = (e: any) => {
  if (gameOver) return;
  let nteto;
  if (gameStart) {
    switch (e) {
      case 37:
        // 左
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        if (checkMove(-1, 0)) tetroX--;
        break;
      case 38:
        // 上キーを押すと、一気に下に行く
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        while (checkMove(0, 1)) tetroY += 1;
        break;
      case 39:
        // 右
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        if (checkMove(1, 0)) tetroX++;
        break;
      case 40:
        // 下
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        if (checkMove(0, 1)) tetroY++;
        break;
      case 70:
        // Fキー
        nteto = rotate(0);
        if (checkMove(0, 0, nteto)) tetro = nteto;
        break;
      case 68:
        nteto = rotate(1);
        if (checkMove(0, 0, nteto)) tetro = nteto;
        break;
      case 32:
        // スペース
        tetroHold();
        break;
    }
    drawAll();
  } else {
    if (e === 32) {
      gameStart = true;
      console.log("before start");
    }
  }
};
