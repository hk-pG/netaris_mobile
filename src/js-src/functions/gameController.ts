import { tetris } from "..";
import { System } from "../System";

const Key = {
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  Space: " ",
};

export const gameController = (key: string) => {
  if (System._isGameOvered) return;
  if (System._isGameStarted) {
    switch (key) {
      case Key.ArrowLeft:
        // 左
        if (tetris.checkMove(-1, 0)) {
          // tetroX--;
          tetris.currentPos.moveLeft();
        }
        break;
      case Key.ArrowUp:
        // 上キーを押すと、一気に下に行く
        while (tetris.checkMove(0, 1)) {
          // tetroY += 1;
          tetris.currentPos.drop();
        }
        break;
      case Key.ArrowRight:
        // 右
        if (tetris.checkMove(1, 0)) {
          // tetroX++;
          tetris.currentPos.moveRight();
        }
        break;
      case Key.ArrowDown:
        // 下
        if (tetris.checkMove(0, 1)) {
          // tetroY++;
          tetris.currentPos.drop();
        }
        break;
      case "f" || "F":
        // Fキー
        tetris.currentMino.rotateMino(0);
        break;
      case "d" || "D":
        tetris.currentMino.rotateMino(1);
        break;
      case Key.Space:
        // スペース
        // tetroHold();
        tetris.hold();
        break;
    }
    tetris.draw();
  } else {
    // ゲーム開始前
    if (key === Key.Space) {
      // スペースキーでゲームを開始する
      System.startGame();
      console.log("before start");
    }
  }
};
