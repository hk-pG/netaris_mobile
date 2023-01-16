import "./style.css";

const motion = document.getElementById("motion");

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
