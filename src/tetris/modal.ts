import { openButton } from "./dom";
console.log("modal.ts");

export const setModal = () => {
  const mask = document.getElementById("mask");
  const modal = document.getElementById("modal");
  const close = document.getElementById("close");

  openButton.addEventListener("click", () => {
    console.log("open button clicked");

    mask?.classList.remove("hidden");
    modal?.classList.remove("hidden");
  });

  close?.addEventListener("click", () => {
    console.log("close button clicked");
    modal?.classList.add("hidden");
    mask?.classList.add("hidden");
  });

  mask?.addEventListener("click", () => {
    modal?.classList.add("hidden");
    mask.classList.add("hidden");
  });
};
