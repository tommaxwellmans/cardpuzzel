var intro = new Kiwi.State('intro');

intro.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('splashArt', 'asset/splashArt.png');
    this.addImage('catsAlong', 'asset/splash/catsAlong.png');
    this.addImage('title', 'asset/splash/title.png');
    this.addImage('image', 'asset/dude/archer/sprite.png');
    this.addSpriteSheet('pressAnyKey', 'asset/splash/pressAnyKey.png', 460,  33);

    this.addSpriteSheet('archer', 'asset/dude/archer/sprite.png', 99,  436);
    this.addSpriteSheet('warrior', 'asset/dude/warrior/sprite.png', 99,  436);

    // asset/cat/spritesheet1.png

    this.addSpriteSheet( 'catWhite20', 'asset/cat/spritesheet4white.png', 60, 40);

};

intro.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.sprite =  new Kiwi.GameObjects.Sprite(this, this.textures.catWhite20, 0, 0);
    this.sprite.animation.add( "pounce", [24,0,1,2,3,4,14,28,29,30,31,28,29,30,31,4,5,6,7],0.1, false);
    this.sprite.animation.add( "walkRight", [ 24,25,26,27], 0.1, true );
    this.sprite.animation.add( "yowl", [ 16,17,18,19,20,21,22,23], 0.1, true );
    this.sprite.animation.add( "tailWiggle", [ 4,5,6,7], 0.1, true );
    this.sprite.animation.add( "dead", [11], 0.1, true );


    //this.catsAlong = new Kiwi.GameObjects.StaticImage(this, this.textures.catsAlong, 0, 100);

    //this.image = new Kiwi.GameObjects.StaticImage(this, this.textures.image, 0, 100);

    // let centeredTitleX = GameDimension.Width / 2 - this.textures.title.width / 2 ;
    // this.title = new Kiwi.GameObjects.StaticImage(this, this.textures.title, centeredTitleX, 260);
    //
    // let centeredPressAnyX = GameDimension.Width / 2 - this.textures.pressAnyKey.cellWidth / 2 ;
    // this.pressAnyKey = new Kiwi.GameObjects.Sprite(this, this.textures.pressAnyKey, centeredPressAnyX, 400);
    // this.pressAnyKey.animation.add('blinking', [0, 1, 2], 0.1, true);
    // this.pressAnyKey.animation.play('blinking');

    this.archer = new Kiwi.GameObjects.Sprite(this, this.textures.archer, 0, 0);
    this.archer.animation.add("idle", [1, 2, 3], 0.1, true);
    this.archer.animation.add("start", [0], 0.1, true);

    this.archer.animation.play('idle');
    this.addChild(this.archer);
    this.addChild(this.sprite);

    // create a key listener to move onto the next screen
    this.game.input.keyboard.onKeyDownOnce.add(this.switchState, this);

    this.sprite.animation.play("yowl");


};

intro.update = function () {
    if (this.game.input.mouse.isDown) {
        this.switchState();
    }
};

intro.switchState = function () {
    game.states.switchState('play');
    //this.archer.animation.play('start');
};

game.states.addState(intro);
game.states.switchState('intro');