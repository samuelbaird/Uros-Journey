/*----- constants -----*/
let uro = document.getElementById("Uro");
let uroX = 0;
let uroY = 20;
let accelerationY = 100;
let speedX = 5;
let speedY = 0;
let gameWindow = document.querySelector("main");
let gameWidth = gameWindow.innerWidth;
let gameHeight = gameWindow.innerHeight;
let obstacles = document.querySelectorAll(".Ground");
let arrowInput;
let moving = false;
let lastScaleX;
let jumping;

/*----- state variables -----*/

/*----- cached elements  -----*/

/*----- event listeners -----*/
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    moving = true;
    arrowInput = "left";
    lastScaleX = "scaleX(-1)";
  } else if (e.code === "ArrowRight") {
    moving = true;
    arrowInput = "right";
    lastScaleX = "scaleX(1)";
  } else if (e.code === "Space") {
    jumping = true
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") {
    moving = false;
    arrowInput = null;
  } else if (e.code === "ArrowRight") {
    moving = false;
    arrowInput = null;
  }
 else if (e.code === "Space") {
    jumping = false
  }
});

/*----- functions -----*/

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
    } else if (jumping) {
        uroY += speedY
        uro.style.transform = `translate(${uroY - 10}px)`
    }
  } else {
    uro.style.transform = `translate(${uroX}px, ${uroY}px) ${lastScaleX}`;
  }
  obstacles.forEach((obstacle) => {
    if (isCollide(uro, obstacle)) {
      speedY = 0;
      uroY = obstacle.getBoundingClientRect().top - uro.offsetHeight - 70;
    }
  });

  requestAnimationFrame(render);
}

function gravity(dt) {
  speedY += accelerationY * dt;
  uroY += speedY * dt;
}

function isCollide(uro, b) {
  let uroRect = uro.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    uroRect.bottom < bRect.top ||
    uroRect.top > bRect.bottom ||
    uroRect.right < bRect.left ||
    uroRect.left > bRect.right
  );
}

let previousTimestamp = 0;
init();