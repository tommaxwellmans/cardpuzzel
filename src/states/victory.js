var victory = new Kiwi.State('victory');

victory.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('victoryTitle', 'asset/splash/victory/title.png');
};

victory.create = function () {

    Kiwi.State.prototype.create.call(this);

    let centeredTitleX = GameDimension.Width / 2 - this.textures.victoryTitle.width / 2 ;
    this.victoryTitle = new Kiwi.GameObjects.StaticImage(this, this.textures.victoryTitle, centeredTitleX, 260);
    this.addChild(this.victoryTitle);

    // create a key listener to move onto the next screen
   // this.game.input.keyboard.onKeyDownOnce.add(this.switchState, this);

};

victory.update = function () {

    //this.pressAnyKey.animation.play("blinking");

    // if (this.game.input.mouse.isDown) {
    //  //   this.switchState();
    // }
};

victory.switchState = function () {
    game.states.switchState('intro');
};

game.states.addState(victory);
