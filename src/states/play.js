var play = new Kiwi.State('play');

const catLaneOffSet = 50;

var catGenerator = new CatGenerator(6);

play.preload = function () {
    Kiwi.State.prototype.preload.call(this);

    this.addImage('ground', 'asset/background/ground.png');
    this.addImage('lane', 'asset/background/lane.png');
    this.addImage('sky', 'asset/background/sky.png');

    this.addImage('redAndBlueAttackCard', 'asset/card/redAndBlueAttack.png');
    this.addImage('yellowAndBlueAttack', 'asset/card/yellowAndBlueAttack.png');
    this.addImage('yellowAndRedAttack', 'asset/card/yellowAndRedAttack.png');
	
	this.addSpriteSheet( 'catBlack', 'asset/cat/spritesheet3.png', 60, 40);
	this.addSpriteSheet( 'catWhite', 'asset/cat/spritesheet3white.png', 60, 40);

	this.addSpriteSheet( 'catBad', 'asset/bad/badSheet1.png', 60, 40);

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    var cats = catGenerator.generate();

    this.sky = new Kiwi.GameObjects.StaticImage(this, this.textures.sky, 0, 0);
    this.ground = new Kiwi.GameObjects.StaticImage(this, this.textures.ground, 0, 100);

    this.lanePath1 = new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0);
    this.lanePath2 = new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0);
    this.lanePath3 = new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0);

    this.redAndBlueAttachCardImage = new Kiwi.GameObjects.Sprite(this, this.textures.redAndBlueAttackCard, 40, 0);
    this.yellowAndBlueAttack = new Kiwi.GameObjects.Sprite(this, this.textures.yellowAndBlueAttack, 240, 0);
    this.yellowAndRedAttack = new Kiwi.GameObjects.Sprite(this, this.textures.yellowAndRedAttack, 440, 0);

    this.background = new Kiwi.Group(this);
    this.background.addChild(this.sky);
    this.background.addChild(this.ground);

    ///
	///  setup the lanes
    ///
    this.lane1 = new Kiwi.Group(this);
    this.lane1.addChild(this.lanePath1);
    this.lane1.y += 130;

    this.lane2 = new Kiwi.Group(this);
    this.lane2.addChild(this.lanePath2);
    this.lane2.y += 280;


    this.lane3 = new Kiwi.Group(this);
    this.lane3.addChild(this.lanePath3);
    this.lane3.y += 400;

    //
    // add cats to lanes
    //

    this.cats = [];
    var lane1Count = 0, lane2Count = 0, lane3Count = 0;
    for (var c = 0; c < cats.length; c++) {

        var catSprite;
        switch (cats[c].cat.getColor()) {
            default:
            case CatColor.White:
                catSprite = this.textures.catWhite;
                break;
            case CatColor.Black:
                catSprite = this.textures.catBlack;
                break;
        }

        var newCat;
        switch (cats[c].lane) {
            case LaneNumber.Lane1:
                newCat = new Kiwi.GameObjects.Sprite(this, catSprite, catLaneOffSet * lane1Count++, 0 );
                this.cats.push(newCat);
                this.lane1.addChild(newCat);
                break;
            case LaneNumber.Lane2:
            default:
                newCat = new Kiwi.GameObjects.Sprite(this, catSprite, catLaneOffSet * lane2Count++, 0 );
                this.cats.push(newCat);
                this.lane2.addChild(newCat);
                break;
            case LaneNumber.Lane3:

                newCat = new Kiwi.GameObjects.Sprite(this, catSprite, catLaneOffSet * lane3Count++, 0 );
                this.cats.push(newCat);
                this.lane3.addChild(newCat);
                break;
        }
    }

    // create hand object to render in the correct place
    this.hand = new Kiwi.Group(this);
    this.hand.y += 500;

    this.redAndBlueAttachCardImage.input.onDown.add(
        function (event) {
            //this.cat1.x += 10;
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
