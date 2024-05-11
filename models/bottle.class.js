class Bottle extends DrawableObject {
    height = 80;
    width = 80;

    offset = {
       top: 15,
        bottom: 25,
        left: 25,
        right: 25,
      };

    /**
     * Constructs a new Bottle instance.
     * @param {string} imagePath - The path to the image of the bottle object.
     * @param {number} x - is the Start x-coordinate of the bottle object.
     * @param {number} y - is the Start y-coordinate of the bottle object.
     */

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x + Math.random() * 500 + 100;
        this.y = y;
    }
}