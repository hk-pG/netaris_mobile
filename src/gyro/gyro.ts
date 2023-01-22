import typescriptLogo from "../typescript.svg";

console.log("センサーを使います");

const motion = document.getElementById("motion");

const img = document.createElement("img");
img.src = typescriptLogo;
motion?.appendChild(img);

window.addEventListener("load", () => {
  window.addEventListener("deviceorientation", (e) => {
    // const a = e.absolute;
    const z = e.alpha!;
    const x = e.beta!;
    const y = e.gamma!;

    if (!motion) return;
    motion.innerHTML =
      //
      `z: ${z?.toFixed(3)} x: ${x?.toFixed(3)} y: ${y?.toFixed(
        3
      )}<br>biggest: ${Math.max(x, y, z)}`;
  });
});
