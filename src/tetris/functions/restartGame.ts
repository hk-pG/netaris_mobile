import { restartButton } from "../dom";

export const restartGame = () => {
  restartButton.classList.remove("hidden");
  restartButton.addEventListener("click", () => {
    location.reload();
  });
};
