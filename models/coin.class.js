class Coin extends MovableObject {
    width = 100;
    height =150;
    y=200;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 45,
        bottom: 90,
        left: 45,
        right: 45,
    };

    /**
     * Creates an instance of Coin.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animates the coin by playing its images in a loop.
     */

    animate() {
        setInterval(() => this.playAnimation(this.IMAGES), 300);
    }
}
