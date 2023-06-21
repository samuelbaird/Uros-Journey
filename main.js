let uro = document.getElementById("Uro");
let uroX = 0;
let uroY = 280;
let accelerationY = 2000;
let speedX = 5;
let speedY = 0;
let gameWindow = document.querySelector("main");
let gameWidth = gameWindow.innerWidth;
let gameHeight = gameWindow.innerHeight;
let obstacles = document.querySelectorAll(".Ground");
let arrowInput;
let moving = false;
let lastScaleX;
let jumping = false;
let collisionChecking = true;
let jumpDuration = 0;
let maxJumpDuration = 0.1;
let collisionDetected;

document.addEventListener("keydown", (e) => {
  console.log(e.code);
  if (e.code === "ArrowLeft") {
    moving = true;
    arrowInput = "left";
    lastScaleX = "scaleX(-1)";
  } else if (e.code === "ArrowRight") {
    moving = true;
    arrowInput = "right";
    lastScaleX = "scaleX(1)";
  } else if (e.code === "Space" && !jumping && collisionDetected) {
    jumping = true;
    collisionChecking = false;
    speedY = 30;
    jumpDuration = 0;
    setTimeout(() => {
      collisionChecking = true;
    }, 200);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") {
    moving = false;
    arrowInput = null;
  } else if (e.code === "ArrowRight") {
    moving = false;
    arrowInput = null;
  } else if (e.code === "Space") {
    jumping = false;
    collisionChecking = true;
  }
});

function init() {
  requestAnimationFrame(render);
}

function render(timestamp) {
  const dt = timestamp - previousTimestamp;
  previousTimestamp = timestamp;
  gravity(dt / 1000);
  if (moving) {
    if (arrowInput === "left") {
      uroX -= speedX;
      uro.style.transform = `translate(${uroX}px, ${uroY}px) ${lastScaleX}`;
    } else if (arrowInput === "right") {
      uroX += speedX;
      uro.style.transform = `translate(${uroX}px, ${uroY}px) ${lastScaleX}`;
    }
  } else if (jumping) {
    uroY -= speedY * dt;
    uro.style.transform = `translate(${uroX}px, ${uroY}px) ${lastScaleX}`;
    jumpDuration += dt;
    if (jumpDuration >= maxJumpDuration) {
      jumping = false;
    }
  } else {
    uro.style.transform = `translate(${uroX}px, ${uroY}px) ${lastScaleX}`;
  }
  let collisionDetectedTemp = false;
  if (collisionChecking) {
    obstacles.forEach((obstacle) => {
      if (isCollide(uro, obstacle)) {
        speedY = 0;
        uroY = obstacle.getBoundingClientRect().top - uro.offsetHeight - 70;
        collisionDetectedTemp = true;
      }
    });
  }
  collisionDetected = collisionDetectedTemp;
  requestAnimationFrame(render);
}

function gravity(dt) {
  speedY += accelerationY * dt;
  uroY += speedY * dt;
}

function isCollide(uro, b) {
  let uroRect = uro.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  collisionDetected = !(
    uroRect.bottom < bRect.top ||
    uroRect.top > bRect.bottom ||
    uroRect.right < bRect.left ||
    uroRect.left > bRect.right
  );
  return collisionDetected;
}

let previousTimestamp = 0;
init();
