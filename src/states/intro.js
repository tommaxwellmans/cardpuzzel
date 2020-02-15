var intro = new Kiwi.State('intro');

intro.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('spritesheet1', 'spritesheet1.png');
};

intro.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.spritesheet1 = new Kiwi.GameObjects.StaticImage(this, this.textures.spritesheet1, 0, 0);

    this.addChild(this.spritesheet1);

};

intro.update = function () {
    if (this.game.input.mouse.isDown) {
        game.states.switchState('play');
    }
};

game.states.addState(intro);
game.states.switchState('intro');