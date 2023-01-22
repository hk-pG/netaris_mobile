export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

// 次のミノの表示画面
export const next = document.getElementById("next") as HTMLCanvasElement;
export const ntx = next.getContext("2d")!;

// ホールド画面の表示
export const holdView = document.getElementById("hold") as HTMLCanvasElement;
export const htx = holdView.getContext("2d")!;
export const baka = document.getElementById("baka")!;

//背景画像
export const bgImgContainer = document.getElementById(
  "bg-img-container"
) as HTMLElement;

/* スコア登録のボタン及びモーダルウィンドウ部分のスクリプト */
export const openButton = document.getElementById(
  "openButton"
) as HTMLButtonElement;

export const restartButton = document.getElementById("restart-button")!;
