class Chicks extends MovableObject {
    width = 50;
    height = 50;
    y = 380;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5,
    };

    removeFromArray = false;
    deadSound = false;
    chick_sound = new Audio('audio/chicks.mp3');

    /**
     * Sets all start conditions for the object.
     */
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Starts the animations for the chicks.
     */
    animate() {
        setInterval(() => {
            this.moveRight();
            this.otherDirection = true;
        }, 1000 / 60);

        setInterval(() => this.walkChick(), 200);
    }

    /**
     * Walk the Chickens.
     */
    walkChick() {
        if (this.isDead()) {
            this.playDead();
            if (this.chickDead()) {
                this.playDeadSound();
                this.deleteChicken();
            }
        } else {
            this.chickWalking();
        }
    }

    /**
     * Plays the dead animation for the chicks.
     */
    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
    }

    /**
     * Delete the Chicken from the Map.
     */
    deleteChicken() {
        setTimeout(() => this.removeFromArray = true, 250);
    }

    /**
     * Checks if its dead to play the Sound.
     */
    chickDead() {
        return !this.deadSound;
    }

    /**
     * Plays the dead Sound form the Chicken.
     */
    playDeadSound() {
        if (!sound) {
            this.chick_sound.play();
        }
        this.deadSound = true;
    }

    /**
     * Chickens walking.
     */
    chickWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }
}