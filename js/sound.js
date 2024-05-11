sound = false;
music = new Audio('audio/start-music.mp3');
music.volume = 0.1;

/**
 * Pauses the background music when initializing the level.
 */

function initBody() {
    music.pause(); 
}

/**
 * Toggles the sound on or off.
 * If sound is enabled, it pauses the music and updates the UI.
 * If sound is disabled, it plays the music and updates the UI.
 */

function mute() {
    if (!this.sound) {
        this.music.pause();
        this.sound = true; 
        document.getElementById('play-speaker').style.backgroundImage = "url('img/off-sound.svg')"; 
    } else if (this.sound) {
        this.music.play();
        this.sound = false; 
        document.getElementById('play-speaker').style.backgroundImage = "url('img/on-sound.svg')"; 
    }
}