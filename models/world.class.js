class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleBar = new Bottlebar();  
    statusBar = new StatusBar();
    coinBar = new Coinbar();
    enemieBar = new Enemiebar();
    throwableObjects = [];
    bottle_sound = new Audio('audio/throw.mp3');  
    throwing_sound = new Audio('audio/throw.mp3');
    coins_sound = new Audio('audio/coins.mp3');
    boss_sound = new Audio('audio/chicken.mp3');
    broken_sound = new Audio('audio/broken.mp3');
    deadEnemies = [];
    lastThrowTime = 0; 

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas,keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Runs the game loop.
     */
    run(){
       this.intervalId = setInterval(()=>{
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectingBottles();    
            this.collectingCoins();
            this.catchBoss();
            this.attackBoss();
            this.bossFollowCharacter();
            this.chickenAttackWithBottle();
        },100);
        console.log('ID:', this.intervalId);
    }

    /**
     * Checks for player input to throw objects.
     */

    checkThrowObjects() {
        let currentTime = new Date().getTime();
        if (this.keyboard.D && this.character.amountOfBottle > 0 && currentTime - this.lastThrowTime >= 1000) { 
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);  
            this.throwableObjects.push(bottle);
            
            this.chickenAttackWithBottle();
            this.character.amountOfBottle--;
            this.bottleBar.setPercentage(this.character.amountOfBottle * 10);
            this.lastThrowTime = currentTime; 
        }
    }

    /**
     * Checks for collisions between the character and enemies or the endboss.
     */
    
    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.characterJumpKill(enemy)) {
                enemy.lost();
            } else if (this.characterCollidingEnemies(enemy)) {
                this.characterGetsHurt();
            } if (enemy.removeFromArray) {
                this.level.enemies.splice(i, 1);
            }
        });
        this.level.endboss.forEach(endboss => {
            if (this.characterCollidingEndBoss(endboss)) {
                this.characterGetsHurt();
            }
        });
    }
    
    /**
     * Checks if the character is colliding with the end boss.
     * @param {MovableObject} endboss - The end boss object to check collision with.
     * @returns {boolean} True if the character is colliding with the end boss, false otherwise.
     */
    characterCollidingEndBoss(endboss) {
        return this.character.isColliding(endboss);
    }
    
    /**
     * Checks if the character can perform a jump kill on an enemy.
    * @param {MovableObject} enemy - The enemy object to check collision with.
    * @returns {boolean} True if the character can perform a jump kill, false otherwise.
    */
   
    characterJumpKill(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround(enemy) &&
               this.character.speedY <= 0;
    }

    /**
     * Handles character getting hurt and updates the health status bar.
     */
    characterGetsHurt() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }
    
    /**
     * @param {string} enemy - One of all enemies.
     * @returns If character is colliding with one of them.
     */
   
    characterCollidingEnemies(enemy) {
        return this.character.isColliding(enemy) && enemy.energy > 0 ;
    }

    /**
     * Handles attacking the boss with throwable objects.
     */
    
    attackBoss() {
        this.throwableObjects.forEach(bottle => {
            this.level.endboss.forEach(endboss => {
                let distance = Math.abs(bottle.x - endboss.x);
                if (bottle.isColliding(endboss) && distance <= 300) {
                    this.bossGetsHurt(bottle, endboss);
                    if (!sound) {
                        this.broken_sound.play();
                    }
                } else if (distance <= 50) {
                    bottle.broken = false;
                }
            });
        });
    }

    /**
     * Handles boss getting hurt by a throwable object.
     * @param {ThrowableObject} bottle - The thrown bottle object.
     * @param {MovableObject} endboss - The endboss object.
     */
    bossGetsHurt(bottle, endboss) {
        bottle.broken = true;
        endboss.boss();
        if (!sound) {
            this.boss_sound.play();
        }
        this.enemieBar.setPercentage(endboss.energy);
    }

    /**
     * Checks if the character reached the end station to trigger boss activation.
     */
    catchBoss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.endStation()) {
                endboss.firstContact = true;
            }
        });
    }

    /**
     * Makes the boss follow the character.
     */
    bossFollowCharacter() {
        let endboss = this.level.endboss[0]
        if (this.characterNearEndboss(endboss)) {
            endboss.otherDirection = true;
        } else if (this.characterFarEndboss(endboss)) {
            endboss.otherDirection = false;
        }
    }

    /**
     * Checks if the character is near the endboss.
     * @param {MovableObject} endboss - The endboss object.
     * @returns {boolean} - Indicates if the character is near the endboss.
     */
    characterNearEndboss(endboss){
        return this.character.x > endboss.x + endboss.width ;
    }

    /**
     * Checks if the character is far from the endboss.
     * @param {MovableObject} endboss - The endboss object.
     * @returns {boolean} - Indicates if the character is far from the endboss.
     */
    characterFarEndboss(endboss){
        return this.character.x < endboss.x ;
    }

    /**
     * Sets the world property of the character.
     */
    setWorld(){
        this.character.world = this;
    }

    /**
     * Clears the canvas.
     */
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        this.ctx.translate(this.camera_x ,0); 
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x ,0);
       
        this.ctx.translate(this.camera_x ,0); 
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);    
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x ,0);
        
        this.addToMap(this.statusBar); 
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.enemieBar);
        let self = this;
        requestAnimationFrame(() => self.draw()); 
    }

    
    /**
     * Adds objects to the canvas.
     * @param {DrawableObject[]} objects - The objects to add to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the canvas.
     * @param {DrawableObject} mo - The object to add to the canvas.
     */
    addToMap(mo){
        if(mo.otherDirection) 
            this.flipImage(mo);
        mo.draw(this.ctx);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        } 
    }

    /**
     * Flips the image horizontally.
     * @param {DrawableObject} mo - The object whose image to flip.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the flipped image back to its original state.
     * @param {DrawableObject} mo - The object whose image to revert.
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Handles collecting bottles by the character.
     */
    collectingBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle) && this.character.amountOfBottle < 10) {
                this.character.collectBottle();
                if (!sound) {
                    this.throwing_sound.play();
                }
                this.removeBottleAndUpdateBar(i);
            }
        });
    }

    /**
     * Removes a bottle from the level and updates the bottle bar.
     * @param {number} index - The index of the bottle to remove.
     */
    removeBottleAndUpdateBar(index) {
        this.level.bottles.splice(index, 1);
        this.bottleBar.setPercentage(this.character.amountOfBottle * 10);
    }

    /**
     * Handles collecting coins by the character.
     */ 
    collectingCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                if (!sound) {
                    this.coins_sound.play();
                }
                this.removeCoinAndUpdateBar(i);
            }
        });
    }

    /**
     * Removes a coin from the level and updates the coin bar.
     * @param {number} i - The index of the coin to remove.
     */
    removeCoinAndUpdateBar(i){
        this.level.coins.splice(i, 1);
        this.coinBar.setPercentage(this.character.amountOfCoins);
    }

    /**
     * Handles chicken attacking with bottles.
     */
    chickenAttackWithBottle() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    bottle.broken = true;
                    enemy.lost();
                    if (!sound) {
                        this.broken_sound.play();
                    }
                }
            });
        });
    }
}

    










