import "./style.css";
import typescriptLogo from "./typescript.svg";
import { setupCounter } from "./counter";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

const motion = document.getElementById("motion");

function handleMotionEvent(event: DeviceMotionEvent) {
  const x = event.accelerationIncludingGravity?.x;
  const y = event.accelerationIncludingGravity?.y;
  const z = event.accelerationIncludingGravity?.z;

  if (motion) {
    motion.innerText = `${x} : ${y} : ${z}`;
  }
}

window.addEventListener("devicemotion", handleMotionEvent, true);
