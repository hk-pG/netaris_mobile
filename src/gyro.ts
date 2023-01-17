import typescriptLogo from "./typescript.svg";

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
    motion.innerText = `${x} ${y} ${z}`;
  }
};

window.addEventListener("devicemotion", handleMotionEvent, true);
