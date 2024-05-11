class Keyboard {
    RIGHT = false;
    LEFT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Creates an instance of Keyboard and starts processing key presses.
     */
    constructor() {
        this.processKeyPress();
    }

    /**
     * Listens for keydown and keyup events and updates key states accordingly.
     */
    processKeyPress() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = true;
            }
            if (e.keyCode == 37) {
                this.LEFT = true;
            }
            if (e.keyCode == 38) {
                this.UP = true;
            }
            if (e.keyCode == 40) {
                this.DOWN = true;
            }
            if (e.keyCode == 32) {
                this.SPACE = true;
            }
            if (e.keyCode == 68) {
                this.D = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = false;
            }
            if (e.keyCode == 37) {
                this.LEFT = false;
            }
            if (e.keyCode == 38) {
                this.UP = false;
            }
            if (e.keyCode == 40) {
                this.DOWN = false;
            }
            if (e.keyCode == 32) {
                this.SPACE = false;
            }
            if (e.keyCode == 68) {
                this.D = false;
            }
        });
    }

    /**
     * Listens for touch events and updates key states accordingly.
     */
    detectTouchPress() {
        document.getElementById('go-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('go-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('go-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('go-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('go-jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('go-jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('go-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        document.getElementById('go-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }
}