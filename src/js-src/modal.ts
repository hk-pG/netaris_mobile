"use strict";
// **************************************************************** 3. modal.js ****************************************************************

const mask = document.getElementById("mask");
const modal = document.getElementById("modal");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'close'.
const close = document.getElementById("close");

// @ts-expect-error TS(2531): Object is possibly 'null'.
openButton.addEventListener("click", () => {
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  mask.classList.remove("hidden");
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  modal.classList.remove("hidden");
});

// @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
close.addEventListener("click", () => {
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  modal.classList.add("hidden");
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  mask.classList.add("hidden");
});

// @ts-expect-error TS(2531): Object is possibly 'null'.
mask.addEventListener("click", () => {
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  modal.classList.add("hidden");
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  mask.classList.add("hidden");
});

export {};
