class Character extends MovableObject {
    y = 200;
    height = 250;
    speed = 10;
    lastMove = 0;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_INACTIVE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('audio/walk.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');
    lost_sound = new Audio('audio/lost.mp3');
    pains_sound = new Audio('audio/pains.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');

    offset = {
        top: 80,
        bottom: 10,
        left: 10,
        right: 10,
    };

    /**
     * Sets all start conditions for the object.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_INACTIVE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
        this.checkIdleState();
        this.checkInactiveState();
        this.handleCharacterState();
        this.isJumpingSoundPlayed = false;
    }

    /**
     * Animations for the character.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 50);
    }

    /**
     * Moves the character based on keyboard input.
     */
    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
        if (this.canMoveJump()) this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canMoveJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.lastMove = 0;
        if (!sound && !this.isAboveGround()) {
            this.walking_sound.play();
        }
    }

    /**
     * Moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.lastMove = 0;
        if (!sound && !this.isAboveGround()) {
            this.walking_sound.play();
        }
    }

    /**
     * Makes the character jump.
     */
    
    jump() {
        this.speedY = 30;
        this.lastMove = 0;
        this.isJumpingSoundPlayed = false;
    }

    /**
     * Plays the character animations based on state.
     */
    playCharacter() {
        this.handleCharacterState();
        this.handleCharacterActions();
    }
       
    /**
     * Handles the state of the character based on its condition.
     */
    handleCharacterState() {
        setInterval(() => {
            if (this.isDead()) {
                this.snoring_sound.pause();
                this.playAnimation(this.IMAGES_DEAD);
                if (!sound) {
                    this.lost_sound.play();
                }
                setTimeout(youLost, 1500);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!sound) {
                    this.pains_sound.play();
                }
            }  
        }, 1000); // Ändere die Zeitintervall entsprechend deiner Anforderungen
    }

    /**
     * Handles character actions based on keyboard input and state.
     */
    
    handleCharacterActions() {
        if (this.characterIsAir()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.snoring_sound.pause();
            if (!this.isJumpingSoundPlayed && !sound) {
                this.jumping_sound.play();
                this.isJumpingSoundPlayed = true;
            }
            this.isJumping = true; 
        } else if (this.characterIsWalk()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.snoring_sound.pause();
        } else {
            this.isJumping = false ;
        }
    }

    /**
    * Checks if the character is in the air.
    * @returns {boolean} True if the character is in the air and not jumping, false otherwise.
    */

    characterIsAir(){
        return this.isAboveGround() && !this.isJumping;
    }

    /**
    * Checks if the character is walking.
    * @returns {boolean} True if the character is walking to the right or left and not jumping, false otherwise.
    */

    characterIsWalk(){
        return ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isJumping);
    }

    /**
     * Checks and handles the inactive state of the character.
     */
    checkInactiveState() {
        setInterval(() => this.characterInactiveSleep(), 1000);
    }

    /**
     * Causes the character to sleep when inactive for a certain period.
     */
    characterInactiveSleep() {
        if (this.lastMove > 1) {
            this.playAnimation(this.IMAGES_INACTIVE);
        }
        if (this.lastMove > 10) {
            this.playAnimation(this.IMAGES_SLEEP);
            if (!sound) {
                this.snoring_sound.play();
            } else {
                this.snoring_sound.pause();
            } 
        }
    }

    /**
     * Checks and handles the idle state of the character.
     */
    checkIdleState() {
        setInterval(() => {
            if (this.isCharacterInactive()) this.lastMove++;
        }, 1000);
    }

    /**
     * Checks if the character is in an inactive state.
     * @returns {boolean} True if the character is inactive, false otherwise.
     */
    isCharacterInactive() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.D;
    }
}

    
    
    
