var play = new Kiwi.State('play');


play.preload = function () {
    Kiwi.State.prototype.preload.call(this);

    this.addImage('ground', 'asset/background/ground.png');
    this.addImage('lane', 'asset/background/lane.png');
    this.addImage('sky', 'asset/background/sky.png');

    this.addImage('redAndBlueAttackCard', 'asset/card/redAndBlueAttack.png');
    this.addImage('yellowAndBlueAttack', 'asset/card/yellowAndBlueAttack.png');
    this.addImage('yellowAndRedAttack', 'asset/card/yellowAndRedAttack.png');
	
	this.addSpriteSheet( 'characterSprite', 'asset/cat/spritesheet3.png', 60, 40);
	this.addSpriteSheet( 'characterSprite2', 'asset/cat/spritesheet3white.png', 60, 40);

	this.addSpriteSheet( 'badSprite1', 'asset/bad/badSheet1.png', 60, 40);

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    this.sky = new Kiwi.GameObjects.StaticImage(this, this.textures.sky, 0, 0);
    this.ground = new Kiwi.GameObjects.StaticImage(this, this.textures.ground, 0, 100);

    this.lanePath1 = new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0);
    this.lanePath2 = new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0);
    this.lanePath3 = new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0);

    this.redAndBlueAttachCardImage = new Kiwi.GameObjects.Sprite(this, this.textures.redAndBlueAttackCard, 40, 0);
    this.yellowAndBlueAttack = new Kiwi.GameObjects.Sprite(this, this.textures.yellowAndBlueAttack, 240, 0);
    this.yellowAndRedAttack = new Kiwi.GameObjects.Sprite(this, this.textures.yellowAndRedAttack, 440, 0);

	this.bad1 = new Kiwi.GameObjects.Sprite(this, this.textures.badSprite1, 600, 0);
	this.cat1 = new Kiwi.GameObjects.Sprite(this, this.textures.characterSprite, 0, 0 );
	this.cat2 = new Kiwi.GameObjects.Sprite(this, this.textures.characterSprite2, 0, 0 );

    this.background = new Kiwi.Group(this);
    this.background.addChild(this.sky);
    this.background.addChild(this.ground);

    ///
	///  setup the lanes
    ///
    this.lane1 = new Kiwi.Group(this);
    this.lane1.addChild(this.lanePath1);
    this.lane1.addChild(this.cat1);
    this.lane1.y += 130;

    this.lane2 = new Kiwi.Group(this);
    this.lane2.addChild(this.lanePath2);
    this.lane2.addChild(this.cat2);
    this.lane2.y += 280;


    this.lane3 = new Kiwi.Group(this);
    this.lane3.addChild(this.lanePath3);
    this.lane3.addChild(this.bad1);
    this.lane3.y += 400;

    // create hand object to render in the correct place
    this.hand = new Kiwi.Group(this);
    this.hand.y += 500;

    this.redAndBlueAttachCardImage.input.onDown.add(
        function (event) {
            this.cat1.x += 10;
        },
        this
    );

    //
    // Add elements to the state
    //

    this.hand.addChild(this.redAndBlueAttachCardImage);
    this.hand.addChild(this.yellowAndBlueAttack);
    this.hand.addChild(this.yellowAndRedAttack);

    this.addChild(this.background);

    this.addChild(this.lane1);
    this.addChild(this.lane2);
    this.addChild(this.lane3);

    this.addChild(this.hand);
	
	

};

game.states.addState(play);
