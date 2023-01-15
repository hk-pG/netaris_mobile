import "./style.css";

const motion = document.getElementById("motion");

const handleMotionEvent = (event: DeviceMotionEvent): void => {
  const acceleration = event.acceleration;

  if (!!acceleration && !!motion) {
    const { x, y, z } = acceleration;
    motion.innerText = `${x} ${y} ${z}`;
  }
};

window.addEventListener("devicemotion", handleMotionEvent, true);
