class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    broken = false;

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * @param {boolean} otherDirection - Indicates the direction of the throwable object.
     * @param {World} world - The world in which the throwable object exists.
     */
    constructor(x, y, otherDirection, world) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;  
        this.world = world;
        this.height = 60;
        this.width = 50;
        this.animate();
        this.throw();
        
    }

    /**
     * Animates the Bottle.
     */
    animate() {
        setInterval(() => {
            if (this.broken == true) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else if (this.broken == false) {
                this.playAnimation(this.IMAGES_THROW)
            }
        }, 60);
    }

    /**
     * Throws the throwable object by applying vertical speed and gravity.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => this.move(), 30);
    }

    /**
     * Moves the throwable object based on its current state.
     */
    move() {
        if (this.y >= 390) {
            this.speedY = 0;
            this.x += 10;
            this.y += 10;
            
        } else if (this.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    }

}



