import "./style.css";

import { getRandomNum } from "./functions/rand";
import { Tetris } from "./Tetris";
import { System } from "./System";
import {
  gameController,
  phoneGameControls,
  setGyroMotion,
} from "./functions/gameController";
import { bgImgContainer, canvas, holdView, next, openButton } from "./dom";
import { Mino } from "./class/Mino";
import { Position2d } from "./class/Position2d";
import { setModal } from "./modal";
import { setSubmitScore } from "./database";

// ミノを構成する一つのブロックのサイズ
export const blockSize = 30;

// テトロミノのサイズ
export const tetroSize = 4;

// 画面の準備 ----------------------------------------------------------------

export const fieldCol = 10;
export const fieldRow = 20;

canvas.width = blockSize * fieldCol;
canvas.height = blockSize * fieldRow;

export const body = document.querySelector("body");

bgImgContainer.style.minHeight = "100vh";

const backgroundImage = [
  "https://pakutaso.cdn.rabify.me/shared/img/thumb/zubotty419DSC025802287.jpg.webp?d=1420",
  "https://www.pakutaso.com/shared/img/thumb/TSU1994052_TP_V.jpg",
  "https://www.pakutaso.com/shared/img/thumb/pakusky458A8762_TP_V.jpg",
  "https://www.pakutaso.com/shared/img/thumb/007ELA201029A_TP_V.jpg",
  "https://cdn.pixabay.com/photo/2016/05/05/18/24/winter-1374504_1280.jpg",
  "https://www.pakutaso.com/shared/img/thumb/osakekowai458A0290_TP_V.jpg",
  "https://www.pakutaso.com/shared/img/thumb/kamameshiPAR50519_TP_V.jpg",
  "https://www.pakutaso.com/shared/img/thumb/ookawaPAR59590_TP_V.jpg",
  "https://www.pakutaso.com/shared/img/thumb/TSU1994026_TP_V.jpg",
  "https://www.pakutaso.com/shared/img/thumb/kuchikomi832_TP_V.jpg",
];

bgImgContainer.style.backgroundImage = `url(${
  backgroundImage[getRandomNum(0, backgroundImage.length - 1)]
})`;

next.width = blockSize * 4;
next.height = blockSize * 4;

holdView.width = blockSize * 4;
holdView.height = blockSize * 4;

// フィールドの色関連
const fieldColor = "rgba(206, 230, 163, 0.8)";
canvas.style.backgroundColor = fieldColor;
canvas.style.outline = "4px solid #555";

export const tetroColors = [
  fieldColor, //                0 背景と同じ (着地点で点線)
  "green", //                   1 I
  "yellow", //                  2 L
  "rgb(116, 143, 231)", //      3 J,
  "skyblue", //                 4 T
  "gray", //                    5 O
  "orange", //                  6 Z
  "pink", //                    7 S
  "#555", //                    8 四つ角
  "rgba(0, 0, 0, 0)", //        9 箱
  "limegreen", //              10 点
];

// テトロミノの宣言
export const tetroTypes = [
  [], //0, 空っぽ -> 着地点用
  [
    //1, I
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    //2, L
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //3, J
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //4, T
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    //5, O
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //6, Z
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //7, S
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],

  [
    //8, 四つ角
    [1, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1],
  ],
  [
    //9, 箱
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  [
    //10, 1つだけ
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
];

// テトロミノの初期地点　ー＞　画面中央の上から出現する
export const startX = fieldCol / 2 - tetroSize / 2;
export const startY = 0;

openButton.style.display = "none";

export const tetris = new Tetris(
  new Mino(getRandomNum(1, 7)),
  new Mino(getRandomNum(1, 7)),
  new Position2d(startX, startY),
  800
);

export const scoreView = document.getElementById("score") as HTMLElement;
scoreView.innerText = `SCORE : ${System.score} P`;

export const mobileScoreView = document.getElementById(
  "mobile-score"
) as HTMLElement;
mobileScoreView.innerText = `SCORE : ${System.score} P`;

document.onkeydown = (e) => {
  gameController(e.key);
};

document.onkeydown = (e) => {
  gameController(e.key);
};

setModal();
setSubmitScore();
setGyroMotion();
phoneGameControls();

tetris.startGame();

export {};
