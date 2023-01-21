import { canvas, ctx } from "../dom";

export const gameStartMessage = () => {
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
