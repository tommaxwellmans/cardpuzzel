var play = new Kiwi.State('play');


play.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('background', 'background.png');

    this.addImage('redAndBlueAttackCard', 'asset/card/redAndBlueAttack.png');
    this.addImage('yellowAndBlueAttack', 'asset/card/yellowAndBlueAttack.png');
    this.addImage('yellowAndRedAttack', 'asset/card/yellowAndRedAttack.png');

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);

    this.redAndBlueAttachCardImage = new Kiwi.GameObjects.StaticImage(this, this.textures.redAndBlueAttackCard, 40, 500);
    this.yellowAndBlueAttack = new Kiwi.GameObjects.StaticImage(this, this.textures.yellowAndBlueAttack, 240, 500);
    this.yellowAndRedAttack = new Kiwi.GameObjects.StaticImage(this, this.textures.yellowAndRedAttack, 440, 500);

    // create hand object to render in the correct place
    this.hand = new Kiwi.Group(this);
    this.hand.addChild(this.redAndBlueAttachCardImage);
    this.hand.addChild(this.yellowAndBlueAttack);
    this.hand.addChild(this.yellowAndRedAttack);

    this.addChild(this.background);

    this.addChild(this.hand);

};

game.states.addState(play);
