class Cloud extends MovableObject{
    /**
     * Sets all start conditions for the object.
     */

    constructor(x,y) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.animate();
        this.width = 400 + Math.random() * 200;
        this.height = 350 + Math.random() * 150;
        this.x = x;
        this.y = y + Math.random() * 20;
        this.speed = 0.5;
    }

    /**
     * Starts the animation for the cloud, moving it to the left.
     */

    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud to the left.
     */

    moveLeft() {
        this.leftInterval = setInterval(() => this.x -= this.speed, 1000 / 60);
    }

    /**
     * Stops the leftward movement of the cloud.
     */

    stopMoveLeft() {
        clearInterval(this.leftInterval);
    }

}
   
   

