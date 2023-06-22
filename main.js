let uro = document.getElementById("Uro");
let uroX = 10;
let uroY = 10;
let accelerationY = 2000;
let speedX = 5;
let speedY = 5;
let gameWindow = document.querySelector("main");
let gameWidth = 960;
let gameHeight = 540;
let obstacles = document.querySelectorAll(".Ground");
let traps = document.querySelectorAll(".traps");
let home = document.getElementById("home");
let arrowInput;
let moving = false;
let lastScaleX;
let jumping = false;
let collisionChecking = true;
let jumpDuration = 0;
let maxJumpDuration = 0.1;
let collisionDetected;
let gameStatus = null;

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
    speedY = 10;
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
  if (uroY + uro.offsetHeight > gameHeight) {
    uroY = gameHeight - uro.offsetHeight;
    speedY = 0;
    collisionDetected = true;
  }
  if (moving) {
    if (arrowInput === "left" && uroX > 0) {
      uroX -= speedX;
      uro.style.transform = `translate(${uroX}px, ${uroY}px) ${lastScaleX}`;
    } else if (arrowInput === "right" && uroX < gameWidth - uro.offsetWidth) {
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
  collisionDetected = false;
  if (collisionChecking) {
    obstacles.forEach((obstacle) => {
      if (isCollide(uro, obstacle)) {
        speedY = 0;
        uroY = obstacle.getBoundingClientRect().top - uro.offsetHeight - 70;
        collisionDetectedTemp = true;
      }
    });
    traps.forEach((trap) => {
      if (isCollide(uro, trap)) {
        speedY = 0;
        collisionDetectedTemp = true;
        gameStatus = -1;
        return;
      }
    });
    if (isCollide(uro, home)) {
      gameStatus = 1;
      return;
    }
  }
  if (gameStatus === -1) {
    collisionChecking = false;

    loseGame();
    return;
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

function loseGame() {
  let loseImage = document.createElement("img");
  let loseMessage = document.createElement("h1");
  let playAgain = document.createElement("h3");
  playAgain.classList.add("grow");
  loseImage.src = "/assets/loseImage.png";
  loseImage.style.opacity = "0";
  loseMessage.style.opacity = "0";
  playAgain.style.opacity = "0";
  loseMessage.style.position = "absolute";
  loseImage.style.position = "absolute";
  playAgain.style.position = "absolute";
  loseMessage.style.color = "rgba(155, 0, 0, 0.8)";
  loseMessage.style.filter = "drop-shadow(0px 0px 10px rgba(225,232,238,255))";
  loseMessage.style.transform = "translate(50%, -50%)";
  playAgain.style.transform = "translate(500%, 1300%)";
  loseImage.style.transition = "opacity 1s ease";
  loseMessage.style.transition = "opacity 1s ease";
  playAgain.style.transition = "opacity 1s ease";
  loseImage.style.objectFit = "cover";
  loseImage.style.width = "100%";
  loseImage.style.maxHeight = "100%";
  loseImage.style.left = "0";
  loseMessage.innerText = "The Rotbringer found you";
  playAgain.innerText = "Play Again";
  gameWindow.appendChild(loseImage);
  gameWindow.appendChild(loseMessage);
  gameWindow.appendChild(playAgain);
  setTimeout(() => {
    loseImage.style.opacity = "1";
    loseMessage.style.opacity = "1";
    playAgain.style.opacity = "1";
  }, 50);
  setTimeout(() => {
    uroX = 10
    uroY = 10
    uro.style.transform = `translate(${uroX}px, ${uroY}px) ${lastScaleX}`;
    playAgain.addEventListener("click", restartGame);
  }, 1000)
  

  function restartGame() {
    gameStatus = null;
    loseImage.remove();
    loseMessage.remove();
    playAgain.removeEventListener("click", restartGame);
    playAgain.remove();
    collisionChecking = true;
    init();
  }
}

let previousTimestamp = 0;
init();
