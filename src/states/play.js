var play = new Kiwi.State('play');


play.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('background', 'background.png');

    this.addImage('redAndBlueAttackCard', 'asset/card/redAndBlueAttack.png')
	
	this.addSpriteSheet( 'characterSprite', 'asset/cat/spritesheet3.png', 60, 40);
	this.addSpriteSheet( 'characterSprite2', 'asset/cat/spritesheet3white.png', 60, 40);

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.background, 0, 0);

    this.redAndBlueAttachCardImage = new Kiwi.GameObjects.StaticImage(this, this.textures.redAndBlueAttackCard, 40, 500);

	this.cat1 = new Kiwi.GameObjects.Sprite(this, this.textures.characterSprite, 100,270 )
	this.cat2 = new Kiwi.GameObjects.Sprite(this, this.textures.characterSprite2, 170,270 )

    // create hand object to render in the correct place
    this.hand = new Kiwi.Group(this);
    this.hand.addChild(this.redAndBlueAttachCardImage);


    this.addChild(this.background);
	this.addChild(this.cat1);
	this.addChild(this.cat2);

    this.addChild(this.hand);
	
	

};

game.states.addState(play);
