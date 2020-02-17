var intro = new Kiwi.State('intro');

intro.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('splashArt', 'asset/splashArt.png');
    this.addImage('catsAlong', 'asset/splash/catsAlong.png');
    this.addImage('title', 'asset/splash/title.png');
    this.addSpriteSheet('pressAnyKey', 'asset/splash/pressAnyKey.png', 460,  33);
};

intro.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.catsAlong = new Kiwi.GameObjects.StaticImage(this, this.textures.catsAlong, 0, 100);

    let centeredTitleX = GameDimension.Width / 2 - this.textures.title.width / 2 ;
    this.title = new Kiwi.GameObjects.StaticImage(this, this.textures.title, centeredTitleX, 260);

    let centeredPressAnyX = GameDimension.Width / 2 - this.textures.pressAnyKey.cellWidth / 2 ;
    this.pressAnyKey = new Kiwi.GameObjects.Sprite(this, this.textures.pressAnyKey, centeredPressAnyX, 400);
    this.pressAnyKey.animation.add("blinking", [0, 1, 2], 0.1, false);
    this.pressAnyKey.animation.play("blinking");

    this.catsAlong2 = new Kiwi.GameObjects.StaticImage(this, this.textures.catsAlong, 0, 600);

    //this.addChild(this.splashArt);
    this.addChild(this.pressAnyKey);
    this.addChild(this.catsAlong);
    this.addChild(this.catsAlong2);
    this.addChild(this.title);

    // create a key listener to move onto the next screen
    this.game.input.keyboard.onKeyDownOnce.add(this.switchState, this);

};

intro.update = function () {

    //this.pressAnyKey.animation.play("blinking");


    if (this.game.input.mouse.isDown) {
        game.states.switchState('play');
    }
};

intro.switchState = function () {
    game.states.switchState('play');
};

game.states.addState(intro);
game.states.switchState('intro');