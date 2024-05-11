class Level{
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Creates an instance of Level.
     * @param {Array<Enemy>} enemies - The array of enemies in the level.
     * @param {Endboss} endboss - The end boss of the level.
     * @param {Array<Cloud>} clouds - The clouds in the background of the level.
     * @param {Array<DrawableObject>} backgroundObjects - The background objects of the level.
     * @param {Array<Coin>} coins - The coins in the level.
     * @param {Array<Bottle>} bottles - The bottles in the level.
     */

    constructor(enemies,endboss,clouds,backgroundObjects,coins,bottles){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}