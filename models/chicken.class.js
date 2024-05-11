class Chicken extends MovableObject {
    y = 370;
    width = 80;
    height = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5,
    };

    /**
     * Sets all start conditions for the object.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 600 + Math.random() * 1700;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    removeFromArray = false;
    deadSound = false;
    dead_sound = new Audio('audio/chicken.mp3');

    /**
     * Starts the animations for the chicken.
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
        setInterval(() => this.playChicken(), 200);
    }

    /**
     * Plays the Chickens.
     */
    playChicken() {
        if (this.isDead()) {
            this.playDead();
            if (this.chickenIsDead()) {
                this.playDeadSound();
                this.deleteChicken();
            }
        } else {
            this.chickenWalking();
        }
    }

    /**
     * Plays the dead animation for the chicken.
     */
    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
    }

    /**
     * Delete the Chicken .
     */
    deleteChicken() {
        setTimeout(() => this.removeFromArray = true, 250);
    }

    /**
     * Chickens walking.
     */
    chickenWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Checks if its dead to play the Sound.
     */
    chickenIsDead() {
        return !this.deadSound;
    }

    /**
     * Plays the dead sound for the chicken.
     */
    playDeadSound() {
        if (!sound) {
            this.dead_sound.play();
        }
        this.deadSound = true;
    }
}











    
   
    
   

    

    

    

    