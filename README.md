 # PROJECT 1 - URO'S JOURNEY
 ---

## Technical Requirements - MVP
Your App Must:

☐ Render a game in the browser.

☐ Include win/loss logic and render win/loss messages in HTML. Popup alerts using the alert() method are okay during development, but not production.

☐ Include separate HTML, CSS & JavaScript files.

☐ Use vanilla JavaScript, not jQuery.

☐ Have properly indented HTML, CSS & JavaScript. In addition, vertical whitespace needs to be consistent.

☐ No remaining unused and/or commented out code (code that will never be called) .

☐ Have functions and variables that are named sensibly. Remember, functions are typically named as verbs and variables (data) named as nouns.

☐ Be coded in a consistent manner. For example, choose between your preference for function declarations vs. function expressions.

☐ Be deployed online using GitHub Pages so that the rest of the world can play your game!

---

## WIREFRAME

![Image](./Wireframe.png)

---

## INITIAL PSEUDOCODE

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

---

## USER STORIES

- User will be able to move character through the environment.
- User will be able to land on top of obstacles.
- User will lose the game when their character falls in a hole.
- User will win the game when their character enters the home.
- User will be able to interact with a home screen.
- User will be able to turn music on and off.
- User will be able to replay the level once it is completed/lost. 

---

## CREDITS

Gravity logic by Martin Heinz: https://towardsdatascience.com/implementing-2d-physics-in-javascript-860a7b152785 (My usage is EXTREMLY simplified)

Collision logic based on the code provided by Àlex Garcés on stack overflow: https://stackoverflow.com/questions/2440377/javascript-collision-detection

Movement logic based on code provided by Mark Lassoff: https://www.youtube.com/watch?v=Pg1UqzZ5NQM