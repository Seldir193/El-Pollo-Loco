class MovableObject extends DrawableObject {
    speed = 1.45;
    otherDirection = false;  
    speedY = 0;   
    acceleration = 2.5;  
    energy = 100;
    lastHit = 0;
    offsetY = 0;
    offsetX = 0;
    amountOfBottle = 0;   
    amountOfCoins = 0;
   
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Controlls the gravity if the character jump.
     * Decreasing speed above the ground and
     * increasing speed to the ground.
     */
    
    applyGravity(){
        setInterval(() =>{
            if( this.isAboveGround() || this.speedY > 0) {
             this.y -= this.speedY;
             this.speedY -= this.acceleration;
            }
        },1000/25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */

    isAboveGround(){
        if(this instanceof ThrowableObject ){  
            return true;
        } else {
            return this.y < 200;
        }
    }

    /**
     * Loads different images in the img value,
     * to animate the figures movements.
     * @param {object} images - Current image from the figure.
     */

    playAnimation(images){
        let i = this.currentImage % images.length;  
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the left.
     */

    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right.
     */

    moveRight(){
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if colliding, false otherwise.
     */

    isColliding(mo) {
        return (this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height -  mo.offset.bottom);
    }

    /**
     * Reduces the energy of the object when hit.
     */

    hit(){
        this.energy -= 5;   
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the energy of the object due to boss hit.
     */

    boss() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Character arriving endstation.
     */

    endStation() {
        return this.x >= 1800;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if dead, false otherwise.
     */

    isDead(){
        return this.energy == 0;
    }

    /**
     * Sets energy to 0, indicating lost status.
     */

    lost() {
        return this.energy = 0;
    }

    /**
     * When somebody getting hurt.
     */

    isHurt(){
       let timepassed = new Date().getTime() - this.lastHit;
       timepassed = timepassed / 1000;
       return timepassed < 1;  
    }

    /**
     * Collecting Bottle.
     */

    collectBottle() {
        this.amountOfBottle += 1;  
    }

    /**
     * Collecting Coins.
     */

    collectCoin() {
        this.amountOfCoins += 10;
        if (this.amountOfCoins > 100) {
            this.amountOfCoins = 100;
        }
    }
}



