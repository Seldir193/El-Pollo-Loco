class Endboss extends MovableObject {
    x = 0;
    height = 500;
    width = 300;
    y = -35;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: 20,
        bottom: 40,
        left: 40,
        right: 40,
    };

    firstContact = false;

    /**
     * Creates an instance of Endboss.
     */

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2450;
        this.animate();
    }

    /**
     * Animates the end boss based on its current state.
     */

    animate() {
        let i = 0;
        setInterval(() => {
            if (this.isDead()) {
                this.playDead();
            } else if (this.isHurt()) {
                this.playHurt();
            } else if (this.firstContact) {
                i++;
                this.endbossAlarm(i);
            } else if (this.energy <= 85) {
                this.endbossAggressive(i);
            } else if (this.energy < 75) {
                this.endbossGoesWild(i);
            }
        }, 250);
    }

    /**
     * Plays that the Endboss is dead.
     */

    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        setTimeout(() => {
            gameOver();
        }, 1500);  
    }

    /**
     * 
     * @returns Plays that the Endboss is hurt.
     */

    playHurt() {
        return this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Handles the end boss's alert state animation.
     * @param {number} i - The current iteration.
     */

    endbossAlarm(i) {
        if (i < 5) {
            this.playAnimation(this.IMAGES_ALERT);
            this.attackNowEndboss();
        } else if (i > 6) {
            this.playAnimation(this.IMAGES_WALKING);
            setInterval(() => {
                if (!this.otherDirection) {
                    this.moveLeft();
                } else {
                    this.moveRight();
                    this.otherDirection = true;
                }
            }, 100);
        } 
    }
   
    /**
     * Sets an interval to trigger the end boss's alert state animation.
     * @param {number} i - The current iteration.
     */

    endbossAggressive(i) {
        setInterval(() => this.endbossAlarm(i), 1000);
    }

    attackNowEndboss(){
        setTimeout(() => this.playAnimation(this.IMAGES_ATTACK), 1000);
    }

    /**
     * Sets an interval to trigger the end boss's aggressive state animation.
     * @param {number} i - The current iteration.
     */
    
    endbossGoesWild(i) {
        setInterval(() => this.endbossAlarm(i), 2000);
    }

}