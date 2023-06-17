/*----- constants -----*/
let uro = document.getElementById('Uro');
let uroX = 0;
let uroY = 0;
let accelerationY = 700
let speedX = 10;
let speedY = 20;
let gameWindow = document.querySelector('main');
let gameWidth = gameWindow.innerWidth;
let gameHeight = gameWindow.innerHeight;
let obstacles = document.querySelectorAll('.Ground');
let arrowInput;
let moving = false;
let lastScaleX;

/*----- state variables -----*/


/*----- cached elements  -----*/


/*----- event listeners -----*/
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
            moving = true;
            arrowInput = 'left';
            lastScaleX = 'scaleX(-1)'
        }
     else if (e.code === 'ArrowRight') {
            moving = true;  
            arrowInput = 'right';
            lastScaleX = 'scaleX(1)'
    } else if  (e.code === 'Space') {
        // jump logic
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
        moving = false;
        arrowInput = null;
    }
 else if (e.code === 'ArrowRight') { 
    moving = false;    
    arrowInput = null;
 }
});



/*----- functions -----*/

function init() {
    requestAnimationFrame(render);
}

function render(timestamp) {
    const dt = timestamp - previousTimestamp
    previousTimestamp = timestamp;
    gravity(dt / 1000);
    if (moving) {
        if (arrowInput === 'left'){
            uroX -= speedX;
            uro.style.transform = `${lastScaleX} translate(${uroX}px, ${uroY}px)`;
    }   else if (arrowInput === 'right') {
            uroX += speedX;
            uro.style.transform = `${lastScaleX} translate(${uroX}px, ${uroY}px)`  
    }   else {
            uro.style.transform = `translate(${uroX}px, ${uroY}px)`
    } 
    
}
else {
    uro.style.transform = `translate(${uroX}px, ${uroY}px)`
}
    obstacles.forEach((obstacle) => {
    if (isCollide(uro, obstacle)) {
        speedY = 0;
        uroY = obstacle.getBoundingClientRect().top - uro.offsetHeight - 5;
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
        ((uroRect.top + uroRect.offsetHeight) < (bRect.top)) ||
        (uroRect.top > (bRect.top + bRect.offsetHeight)) ||
        ((uroRect.left + uroRect.offsetWidth) < bRect.left) ||
        (uroRect.left > (bRect.left + bRect.offsetWidth))
    );
    }

let previousTimestamp = 0;
init();








/* Pseudocode!
- define variables
- initialize home screen
- button with event listener to start the Game
- animate player, ground, obstacles, holes, and finish line using the DOM
- create gravity logic
- create object collision logic
- update win/loss/playing status based on contact/noncontact with holes/finish line
- tie player movements to keys
- update on screen messages based on game state
- create hidden play again button

EXTRAS
- Scroll to next page of level (no canvas, only DOM!)
- character jump/walk/direction animations
- death/win animations */

