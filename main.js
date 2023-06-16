/*----- constants -----*/
let uro = document.getElementById('Uro');
let uroX = 0;
let uroY = 0;
let accelerationY = 700
let speed = 20;
let gameWindow = document.querySelector('main')
let gameWidth = gameWindow.innerWidth
let gameHeight = gameWindow.innerHeight
let obstacles = document.querySelectorAll('.Ground')

/*----- state variables -----*/


/*----- cached elements  -----*/


/*----- event listeners -----*/
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        if (uroX > 0) {
            uroX -= speed;
            uro.style.left = x + "px";
            uro.style.transform = scaleX(-1);
        }
    } else if (e.code === 'ArrowRight') {
        if (uroX > 0) {
            uroX -= speed;
            uro.style.left = x - "px";
            uro.style.transform = scaleX(-1);
        }
        
    } else if  (e.code === 'Space') {

    }
    
})

/*----- functions -----*/

function init() {
    requestAnimationFrame(render);
}

function render(timestamp) {
    const dt = timestamp - previousTimestamp
    previousTimestamp = timestamp;
    gravity(dt / 1000);
    uro.style.top = uroY + 'px';
    uro.style.left = uroX + 'px';
    obstacles.forEach((obstacle) => {
    if (isCollide(uro, obstacle)) {
        uroY = obstacleRect.top - uro.offsetHeight;
    }
});

requestAnimationFrame(render)
}

function gravity(dt) {
    speed += accelerationY * dt;
    uroY += speed * dt;
}

function isCollide(uro, b) {
    let uroRect = uro.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        ((uro.y + uro.height) < (b.y)) ||
        (uro.y > (b.y + b.height)) ||
        ((uro.x + uro.width) < b.x) ||
        (uro.x > (b.x + b.width))
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

