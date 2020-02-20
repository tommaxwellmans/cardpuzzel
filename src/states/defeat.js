var defeat = new Kiwi.State('defeat');

defeat.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('defeatTitle', 'asset/splash/defeat/title.png');
};

defeat.create = function () {

    Kiwi.State.prototype.create.call(this);

    let rectangle = new Kiwi.Plugins.Primitives.Rectangle( {
        state: this,
        width: GameDimension.Width,
        height: GameDimension.Height,
        alpha: 1,
        color: [0,0,0]
    } );
    this.addChild(rectangle);

    let centeredTitleX = GameDimension.Width / 2 - this.textures.defeatTitle.width / 2 ;
    this.defeatTitle = new Kiwi.GameObjects.StaticImage(this, this.textures.defeatTitle, centeredTitleX, 260);
    this.addChild(this.defeatTitle);

    // create a key listener to move onto the next screen
    this.game.input.keyboard.onKeyDownOnce.add(this.switchState, this);

};

defeat.update = function () {
    if (this.game.input.mouse.isDown) {
        defeat.switchState();
    }
};

defeat.switchState = function () {
    game.states.switchState('intro');
};

game.states.addState(defeat);