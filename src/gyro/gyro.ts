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
    const xyz = [x, y, z] as number[];
    const arr = xyz.map((a) => a * 10).map((a) => a.toFixed(3));

    motion.innerHTML = `${arr[0]} ${arr[1]} ${arr[2]}`;
  }
};

window.addEventListener("devicemotion", handleMotionEvent, true);
