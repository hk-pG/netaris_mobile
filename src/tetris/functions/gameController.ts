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
        tetris.rotate(1);
        break;
      case "d" || "D":
        tetris.rotate(-1);
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

export const phoneGameControls = () => {
  document.addEventListener("click", (e) => {
    if (!System._isGameStarted) {
      // ゲーム開始
      System.startGame();
    } else if (System._isGameStarted) {
      // 回転
    } else if (System._isGameOvered) {
      // リスタート
      location.reload();
    }
  });
};

export const setGyroMotion = () => {
  window.addEventListener("load", () => {
    window.addEventListener("deviceorientation", (e) => {
      // const a = e.absolute;
      const z = e.alpha!;
      const x = e.beta!;
      const y = e.gamma!;
      gameControllerByMotion(x, y, z);
    });
  });
};

const gameControllerByMotion = (x: number, y: number, z: number) => {
  if (y === Math.max(x, y, z)) {
    // 横移動
    if (y < -20) {
      // left
      if (tetris.checkMove(-1, 0)) {
        tetris.currentPos.moveLeft();
      }
    } else if (y > 20) {
      // right
      if (tetris.checkMove(1, 0)) {
        tetris.currentPos.moveRight();
      }
    }
  } else if (x === Math.max(x, y, z)) {
    if (x > 80) {
      if (tetris.checkMove(0, 1)) {
        // tetroY++;
        tetris.currentPos.drop();
      }
    }
  }
};
