import { tetris } from "..";
import { System } from "../System";
import { checkMove, drawAll, rotate } from "../functions";

const Key = {
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  Space: " ",
};

export const gameController = (key: string) => {
  if (System._isGameOvered) return;
  let nextMino;
  if (System._isGameStarted) {
    switch (key) {
      case Key.ArrowLeft:
        // 左
        if (checkMove(-1, 0)) {
          // tetroX--;
          tetris.currentPos.moveLeft();
        }
        break;
      case Key.ArrowUp:
        // 上キーを押すと、一気に下に行く
        while (checkMove(0, 1)) {
          // tetroY += 1;
          tetris.currentPos.drop();
        }
        break;
      case Key.ArrowRight:
        // 右
        if (checkMove(1, 0)) {
          // tetroX++;
          tetris.currentPos.moveRight();
        }
        break;
      case Key.ArrowDown:
        // 下
        if (checkMove(0, 1)) {
          // tetroY++;
          tetris.currentPos.drop();
        }
        break;
      case "f" || "F":
        // Fキー
        nextMino = rotate(0);
        if (checkMove(0, 0, nextMino)) tetris.currentMino.mino = nextMino;
        break;
      case "d" || "D":
        nextMino = rotate(1);
        if (checkMove(0, 0, nextMino)) tetris.currentMino.mino = nextMino;
        break;
      case Key.Space:
        // スペース
        // tetroHold();
        tetris.hold();
        break;
    }
    drawAll();
  } else {
    // ゲーム開始前
    if (key === Key.Space) {
      // スペースキーでゲームを開始する
      System.startGame();
      console.log("before start");
    }
  }
};
