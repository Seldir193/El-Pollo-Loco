/**
 * starting the game.
 */

function startGame() {
    document.getElementById('start').style.display = "none";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('game').classList.add('d-none');
    document.getElementById('game1').classList.add('d-none');
}

/**
 * Displays the game-over screen and stops all intervals.
 */

function gameOver() {
    document.getElementById('canvas').style.display = "none";
    document.getElementById('game-over').style.display = "block";
    clearAllIntervals();
    initLevel();
}

/**
 * Restarts the game by hiding the game-over and you-lost screens and initializing the game again.
 */

function restart() {
    document.getElementById('game-over').style.display = "none";
    document.getElementById('you-lost').style.display = "none";
    initGame();
}

/**
 * Reloads the window to go back to the home screen.
 */

function home() {
    window.location.reload();
    clearAllIntervals();
}

/**
 * Stops all intervals and displays the you-lost screen.
 */

function youLost() {
    document.getElementById('canvas').style.display = "none";
    document.getElementById('you-lost').style.display = "block";
    clearAllIntervals();
    initLevel();
}

/**
 * Displays the policy information.
 */

function policy() {
    document.getElementById('policy').classList.add('d-flex');
    document.getElementById('policy').classList.remove('d-none');
    closeJoystick();
}

/**
 * Closes the policy information.
 */

function closePolicy() {
    document.getElementById('policy').classList.add('d-none');
    document.getElementById('policy').classList.remove('d-flex');
}

/**
 * Displays the joystick information.
 */

function joystickInfo() {
    document.getElementById('joystick').classList.add('d-flex');
    document.getElementById('joystick').classList.remove('d-none');
    closePolicy();
}

/**
 * Closes the joystick information.
 */

function closeJoystick() {
    document.getElementById('joystick').classList.add('d-none');
    document.getElementById('joystick').classList.remove('d-flex');
}

/**
 * Enters fullscreen mode.
 */

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    document.getElementById('open-fullscreen').classList.add('d-none');
    document.getElementById('close-fullscreen').classList.remove('d-none');
    enterFullscreen(fullscreen);
}

/**
 * Exits fullscreen mode.
 */

function closefullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    document.getElementById('open-fullscreen').classList.remove('d-none');
    document.getElementById('close-fullscreen').classList.add('d-none');
    exitFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to request fullscreen mode for.
 */

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } 
}

/**
 * Stop all Intevals
 */

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}






