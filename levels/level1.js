let level1;
function initLevel() {
   
 level1 = new Level(
        [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicks(),
    new Chicks(),
    new Chicks()
],
[
    new Endboss()
],
[
    new Cloud(300,10),
    new Cloud(600,10), 
    new Cloud(900,10), 
    new Cloud(1200,10), 
    new Cloud(1500,10), 
    new Cloud(1800,10) 
],

[
    new BackgroundObject('img/5_background/layers/air.png', -719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719) ,

    new BackgroundObject('img/5_background/layers/air.png',0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png',0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png',0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png',0),

    new BackgroundObject('img/5_background/layers/air.png',719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png',719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png',719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png',719),

    new BackgroundObject('img/5_background/layers/air.png',719 * 2),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png',719 * 2),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png',719 * 2),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png',719 * 2),

    new BackgroundObject('img/5_background/layers/air.png',719 * 3),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png',719 * 3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png',719 * 3),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png',719 * 3),
],

[
    new Coin(600, 180),
    new Coin(700, 250),
    new Coin(800, 290),
    new Coin(900, 170),
    new Coin(1000, 140),
    new Coin(1200, 180),
    new Coin(1400, 330),
    new Coin(1500, 240),
    new Coin(1700, 210),
    new Coin(1800, 170)
],

[
    new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 60, 350),
    new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 125, 360),
    new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 130, 345),
    new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 200, 355),
    new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 280, 350),
    new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 605, 380),
    new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 650, 375),
    new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 710, 365),
    new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 870, 385),
    new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 980, 370)
],
);
}



