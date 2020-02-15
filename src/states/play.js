var play = new Kiwi.State('play');


play.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('background', 'background.png');
};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);

    this.addChild(this.background);

};

game.states.addState(play);
