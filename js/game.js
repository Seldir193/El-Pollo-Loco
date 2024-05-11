let canvas;
let world ;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the keyboard, canvas, and world objects,
 * and starts the game loop.
 */

function initGame(){
   keyboard.detectTouchPress();
   canvas = document.getElementById('canvas');
   startGame();
   initLevel();
   world = new World(canvas,keyboard);
}



