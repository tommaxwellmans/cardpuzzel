var intro = new Kiwi.State('intro');

intro.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('splashArt', 'asset/splashArt.png');
};

intro.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.splashArt = new Kiwi.GameObjects.StaticImage(this, this.textures.splashArt, 0, 0);

    this.addChild(this.splashArt);

};

intro.update = function () {
    if (this.game.input.mouse.isDown) {
        game.states.switchState('play');
    }
};

game.states.addState(intro);
game.states.switchState('intro');