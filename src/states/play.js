var play = new Kiwi.State('play');

const catLaneOffSet = 50;

var badGenerator = new BadGenerator(5);
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

    this.addSpriteSheet( 'bad1', 'asset/bad/badSheet1.png', 60, 40);

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    var cats = catGenerator.generate();

    this.sky = new Kiwi.GameObjects.StaticImage(this, this.textures.sky, 0, 0);
    this.ground = new Kiwi.GameObjects.StaticImage(this, this.textures.ground, 0, 100);

    this.redAndBlueAttachCardImage = new Kiwi.GameObjects.Sprite(this, this.textures.redAndBlueAttackCard, 40, 0);
    this.yellowAndBlueAttack = new Kiwi.GameObjects.Sprite(this, this.textures.yellowAndBlueAttack, 240, 0);
    this.yellowAndRedAttack = new Kiwi.GameObjects.Sprite(this, this.textures.yellowAndRedAttack, 440, 0);

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
