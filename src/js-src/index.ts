"use strict";
// ******************************************************** 2. index.js ********************************************************
// ミノを構成する一つのブロックのサイズ
const blockSize = 30;

// テトロミノのサイズ
const tetroSize = 4;

// ゲームが開始しているかどうか
let gameStart = false;

// 画面の準備 ----------------------------------------------------------------

const canvas = document.getElementById("canvas");
// @ts-expect-error TS(2531): Object is possibly 'null'.
const ctx = canvas.getContext("2d");

const fieldCol = 10;
const fieldRow = 20;

// @ts-expect-error TS(2531): Object is possibly 'null'.
canvas.width = blockSize * fieldCol;
// @ts-expect-error TS(2531): Object is possibly 'null'.
canvas.height = blockSize * fieldRow;

const body = document.querySelector("body");

//背景画像
const bgImgContainer = document.getElementById("bg-img-container");

// @ts-expect-error TS(2531): Object is possibly 'null'.
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

// @ts-expect-error TS(2531): Object is possibly 'null'.
bgImgContainer.style.backgroundImage = `url(${
  backgroundImage[getRandomNum(0, backgroundImage.length - 1)]
})`;

// 次のミノの表示画面
const next = document.getElementById("next");
// @ts-expect-error TS(2531): Object is possibly 'null'.
const ntx = next.getContext("2d");

// @ts-expect-error TS(2531): Object is possibly 'null'.
next.width = blockSize * 4;
// @ts-expect-error TS(2531): Object is possibly 'null'.
next.height = blockSize * 4;

let score = 0;
const scoreView = document.getElementById("score");
// @ts-expect-error TS(2531): Object is possibly 'null'.
scoreView.innerText = `SCORE : ${score} P`;

// ホールド画面の表示
const holdView = document.getElementById("hold");
// @ts-expect-error TS(2531): Object is possibly 'null'.
const htx = holdView.getContext("2d");
const baka = document.getElementById("baka");

// @ts-expect-error TS(2531): Object is possibly 'null'.
holdView.width = blockSize * 4;
// @ts-expect-error TS(2531): Object is possibly 'null'.
holdView.height = blockSize * 4;

// フィールドの色関連
const fieldColor = "rgba(206, 230, 163, 0.8)";
// @ts-expect-error TS(2531): Object is possibly 'null'.
canvas.style.backgroundColor = fieldColor;
// @ts-expect-error TS(2531): Object is possibly 'null'.
canvas.style.outline = "4px solid #555";

const tetroColors = [
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

// フィールドの宣言
let field = [];

// ゲームオーバーフラグ
let gameOver = false;

// 現在ホールドしているかどうか
let hold = false;

// ホールドしているテトリミノ
let holdTetro;

// ホールドしているテトリミノのタイプ
let holdType;

//ホールドして良いかどうか
let toggleHold = true;

// テトロミノの宣言
const tetroTypes = [
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
    [1, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
];
// テトロミノの初期地点　ー＞　画面中央の上から出現する
const startX = fieldCol / 2 - tetroSize / 2;
const startY = 0;

// テトロミノの座標
let tetroX = startX;
let tetroY = startY;

// テトロミノの落ちるスピード -> dropSpeed (ミリ秒)に１ブロック分落ちる (1000ミリ秒で1秒)
let dropSpeed = 800;

// 経過時間（ターン）
let turn = 0;
// キーボード操作

/* スコア登録のボタン及びモーダルウィンドウ部分のスクリプト */
const openButton = document.getElementById("openButton");
// @ts-expect-error TS(2531): Object is possibly 'null'.
openButton.style.display = "none";

// ゲームの実行処理
let Ttype = getRandomNum(1, tetroTypes.length - 1);
let newTtype = getRandomNum(1, tetroTypes.length - 1);

// console.log("now : " + Ttype + " new : " + newTtype);

let newTetro = tetroTypes[newTtype];
let tetro = tetroTypes[Ttype];
let gameId;

init();
startGame(dropSpeed);
