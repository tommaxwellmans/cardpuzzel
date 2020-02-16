var play = new Kiwi.State('play');

const catLaneOffSet = 50;

var badGenerator = new BadGenerator(5);
var catGenerator = new CatGenerator(6);

play.preload = function () {
    Kiwi.State.prototype.preload.call(this);

    this.addImage('ground', 'asset/background/ground.png');
    this.addImage('lane', 'asset/background/lane.png');
    this.addImage('sky', 'asset/background/sky.png');

    this.addImage('whiteCatsAttack', 'asset/card/whiteCatsAttack.png');
    this.addImage('blackCatsAttack', 'asset/card/blackCatsAttack.png');

    this.addImage('whiteCatsBlock', 'asset/card/whiteCatsBlock.png');
    this.addImage('blackCatsBlock', 'asset/card/blackCatsBlock.png');

    this.addImage('whiteCatsAttackAndBlock', 'asset/card/whiteCatsAttackAndBlock.png');
    this.addImage('blackCatsAttackAndBlock', 'asset/card/blackCatsAttackAndBlock.png');

    this.addImage('whiteCatsAttackAndBlock', 'asset/card/whiteCatsAttackAndBlock.png');
    this.addImage('blackCatsAttackAndBlock', 'asset/card/blackCatsAttackAndBlock.png');

    this.addImage('blackAndWhiteCatsAttack', 'asset/card/blackAndWhiteCatsAttack.png');
    this.addImage('blackAndWhiteCatsBlock', 'asset/card/blackAndWhiteCatsBlock.png');

    this.addSpriteSheet( 'catBlack', 'asset/cat/spritesheet3.png', 60, 40);
    this.addSpriteSheet( 'catWhite', 'asset/cat/spritesheet3white.png', 60, 40);

    this.addSpriteSheet( 'bad1', 'asset/bad/badSheet1.png', 60, 40);

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    var cats = catGenerator.generate();

    this.sky = new Kiwi.GameObjects.StaticImage(this, this.textures.sky, 0, 0);
    this.ground = new Kiwi.GameObjects.StaticImage(this, this.textures.ground, 0, 100);

    this.whiteCatsAttack = new Kiwi.GameObjects.Sprite(this, this.textures.whiteCatsAttack, 40, 0);
    this.blackCatsAttack = new Kiwi.GameObjects.Sprite(this, this.textures.blackCatsAttack, 140, 0);

    this.whiteCatsBlock = new Kiwi.GameObjects.Sprite(this, this.textures.whiteCatsBlock, 240, 0);
    this.blackCatsBlock = new Kiwi.GameObjects.Sprite(this, this.textures.blackCatsBlock, 340, 0);

    this.whiteCatsAttackAndBlock = new Kiwi.GameObjects.Sprite(this, this.textures.whiteCatsAttackAndBlock, 440, 0);
    this.blackCatsAttackAndBlock = new Kiwi.GameObjects.Sprite(this, this.textures.blackCatsAttackAndBlock, 540, 0);

    this.blackAndWhiteCatsAttack = new Kiwi.GameObjects.Sprite(this, this.textures.blackAndWhiteCatsAttack, 640, 0);
    this.blackAndWhiteCatsBlock = new Kiwi.GameObjects.Sprite(this, this.textures.blackAndWhiteCatsBlock, 740, 0);

    this.background = new Kiwi.Group(this);
    this.background.addChild(this.sky);
    this.background.addChild(this.ground);

    ///
    ///  setup the lanes
    ///
    this.lanes = [];
    this.lane1 = new Lane (
        new Kiwi.Group(this),
        new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0)
    );
    this.lanes[LaneNumber.Lane1] = this.lane1;

    this.lane2 = new Lane (
        new Kiwi.Group(this),
        new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0)
    );
    this.lanes[LaneNumber.Lane2] = this.lane2;

    this.lane3 = new Lane (
        new Kiwi.Group(this),
        new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0)
    );
    this.lanes[LaneNumber.Lane3] = this.lane3;

    //
    // add cats to lanes
    //

    this.cats = catGenerator.generate();
    this.cats.forEach(
        function (cat) { play.lanes[cat.lane].addCat(play.makeCat(cat)); }
    );

    //
    // add bad things to the lanes
    //

    this.bads = badGenerator.generate();
    this.bads.forEach(
        function (bad) { play.lanes[bad.lane].addBad(play.makeBad(bad)); }
    );

    // create hand object to render in the correct place
    this.hand = new Kiwi.Group(this);
    this.hand.y += 500;

    // this.redAndBlueAttachCardImage.input.onDown.add(
    //     function (event) {
    //         //this.cat1.x += 10;
    //     },
    //     this
    // );

    //
    // Add elements to the state
    //

    this.hand.addChild(this.whiteCatsAttack);
    this.hand.addChild(this.blackCatsAttack);
    this.hand.addChild(this.whiteCatsBlock);
    this.hand.addChild(this.blackCatsBlock);
    this.hand.addChild(this.whiteCatsAttackAndBlock);
    this.hand.addChild(this.blackCatsAttackAndBlock);
    this.hand.addChild(this.blackAndWhiteCatsAttack);
    this.hand.addChild(this.blackAndWhiteCatsBlock);

    this.addChild(this.background);

    this.addChild(this.lane1.getGroup());
    this.addChild(this.lane2.getGroup());
    this.addChild(this.lane3.getGroup());

    this.addChild(this.hand);



};

// creates a cat object for a cat plan?
play.makeCat = function(catPlan) {

    var sprite;

    switch (catPlan.color) {
        case CatColor.White:
            sprite =  new Kiwi.GameObjects.Sprite(this, this.textures.catWhite, 0, 0);
            break;
        case CatColor.Black:
        default:
            sprite =  new Kiwi.GameObjects.Sprite(this, this.textures.catBlack, 0, 0);
            break;
    }
    return new Cat(catPlan.color, sprite);
};

// creates a cat object for a cat plan?
play.makeBad = function(badPlan) {
    return new Bad(new Kiwi.GameObjects.Sprite(this, this.textures.bad1, 0, 0));
};

game.states.addState(play);
