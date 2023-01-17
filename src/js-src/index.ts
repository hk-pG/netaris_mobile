import "./style.css";

import { getRandomNum } from "./functions/rand";
import { Mino, Position2d, Tetris } from "./Tetris";

// ミノを構成する一つのブロックのサイズ
export const blockSize = 30;

// テトロミノのサイズ
export const tetroSize = 4;

// 画面の準備 ----------------------------------------------------------------

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;

export const ctx = canvas.getContext("2d")!;

export const fieldCol = 10;
export const fieldRow = 20;

canvas.width = blockSize * fieldCol;
canvas.height = blockSize * fieldRow;

export const body = document.querySelector("body");

//背景画像
const bgImgContainer = document.getElementById(
  "bg-img-container"
) as HTMLElement;

bgImgContainer.style.minHeight = "100vh";

const backgroundImage = [
  "./sakura.jpg",
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

// 次のミノの表示画面
export const next = document.getElementById("next") as HTMLCanvasElement;
export const ntx = next.getContext("2d")!;

next.width = blockSize * 4;
next.height = blockSize * 4;

export const scoreView = document.getElementById("score") as HTMLElement;
scoreView.innerText = `SCORE : ${score} P`;

// ホールド画面の表示
export const holdView = document.getElementById("hold") as HTMLCanvasElement;
export const htx = holdView.getContext("2d")!;
export const baka = document.getElementById("baka")!;

holdView.width = blockSize * 4;
holdView.height = blockSize * 4;

// フィールドの色関連
const fieldColor = "rgba(206, 230, 163, 0.8)";
canvas.style.backgroundColor = fieldColor;
canvas.style.outline = "4px solid #555";

export const tetroColors = [
  fieldColor,
  "green",
  "yellow",
  "rgb(116, 143, 231)", //blue,
  "skyblue",
  "gray",
  "orange",
  "pink",
  "#555",
  "rgba(0, 0, 0, 0)", //透明
  "limegreen",
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

/* スコア登録のボタン及びモーダルウィンドウ部分のスクリプト */
export const openButton = document.getElementById(
  "openButton"
) as HTMLButtonElement;
openButton.style.display = "none";

export const tetris = new Tetris(
  new Mino(0),
  new Mino(0),
  new Position2d(startX, startY)
);

tetris.startGame();

export {};
