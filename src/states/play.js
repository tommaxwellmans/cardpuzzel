var play = new Kiwi.State('play');


play.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('background', 'background.png');

    this.addImage('redAndBlueAttackCard', 'asset/card/redAndBlueAttack.png')

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);

    this.redAndBlueAttachCardImage = new Kiwi.GameObjects.StaticImage(this, this.textures.redAndBlueAttackCard, 40, 500);

    // create hand object to render in the correct place
    this.hand = new Kiwi.Group(this);
    this.hand.addChild(this.redAndBlueAttachCardImage);


    this.addChild(this.background);

    this.addChild(this.hand);

};

game.states.addState(play);
