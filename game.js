var game = new Kiwi.Game();
var gameState = new Kiwi.State('baseGame');

gameState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('background', 'background.png');
};

gameState.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0)

    this.addChild(this.background);

};


game.states.addState(gameState);
game.states.switchState('baseGame');