import typescriptLogo from "../typescript.svg";

console.log("センサーを使います");

const motion = document.getElementById("motion");

const img = document.createElement("img");
img.src = typescriptLogo;
motion?.appendChild(img);

const handleMotionEvent = (event: DeviceMotionEvent): void => {
  console.info("Device motion event: " + event);
  const acceleration = event.acceleration;

  if (!!acceleration && !!motion) {
    console.log(event);

    const { x, y, z } = acceleration;
    motion.innerText = `${x?.toFixed(3)} ${y?.toFixed(3)} ${z?.toFixed(3)}`;
  }
};

window.addEventListener("devicemotion", handleMotionEvent, true);
