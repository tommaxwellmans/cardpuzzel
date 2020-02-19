var play = new Kiwi.State('play');

const catLaneOffSet = 50;

var badGenerator = new BadGenerator(1);
var catGenerator = new CatGenerator(8);
var cardGenerator = new CardGenerator();

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

    this.addSpriteSheet( 'catBlack', 'asset/cat/spritesheet4.png', 60, 40);
    this.addSpriteSheet( 'catWhite', 'asset/cat/spritesheet4white.png', 60, 40);

    this.addSpriteSheet( 'bad1', 'asset/bad/badSheet1.png', 60, 40);

    this.addImage('attackIntent', 'asset/intent/attack.png');
    this.addImage('blockIntent', 'asset/intent/block.png');

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    ///
    /// Damage Pipeline
    ///

    this.pipeline = new Kiwi.Plugins.DamagePipeline.PipelineNode( {
            name: "Physical Armor",
            tags: DamageType.physical,
            operation: function( pack ) {
                pack.value -= 10;
            }
        });

    let healthMeter = new Kiwi.Plugins.DamagePipeline.MeterNode( {
            name: "Health Meter",
            doOnReceive: function( pack ) {

                // doOnReceive contains the default functionality of
                // applying the packs damage which we do want to override.
                // If you did not call the super you would have to add
                // your own meter management algorthim
                Kiwi.Plugins.DamagePipeline.MeterNode.prototype.doOnReceive.call ( this, pack );

                var tween = game.tweens.create( play.bar );
                tween.to( { scaleX: this.valueNormalized }, 500,
                    Kiwi.Animations.Tweens.Easing.Sinusoidal.Out, true );
                tween.start();

            },
            doOnMax: function( pack ) {
            },
            doOnOverflow: function( pack ) {
            },
            doOnBreak: function( pack ) {
            },
            doOnZero: function( pack ) {
            }
        })
    ;

    this.pipeline.onExhaust.add( (function() { this.notify( 'Physical damage nullified!');} ).bind(this) );

    this.pipeline.addChild(healthMeter);

    ///
    /// create ui for damage
    ///

    // Add attack buttons
    this.attackButton1 = new Kiwi.Plugins.Primitives.Rectangle( {
        state: this,
        width: 150,
        height: 30,
        color: [ 0.8, 0.8, 0.8 ],
        drawStroke: true,
        x: 120,
        y: 180,
        enableInput: true
    } );
    this.attackButton1Text = new Kiwi.GameObjects.Textfield( this,
        '5 Physical + 50 Poison',
        130, 190, '#000', 12 );
    this.attackButton1.input.onDown.add( (function( event ) {

        let alittleBitOfDamage = new Kiwi.Plugins.DamagePipeline.Pack( {
            value: 60,
            tags: DamageType.physical,
        });

        this.pipeline.receive( alittleBitOfDamage );
    }).bind( this ) );

    this.bar = new Kiwi.Plugins.Primitives.Rectangle( {
        state: this,
        width: 600,
        height: 25,
        drawStroke: false,
        color: [ 0.9, 0.1, 0.1 ],
        x: 100,
        y: 30,
        anchorPointX: 0
    } );
    this.barShadow = new Kiwi.Plugins.Primitives.Rectangle( {
        state: this,
        width: 602,
        height: 27,
        drawStroke: false,
        color: [ 0.8, 0.8, 0.8 ],
        x: 100,
        y: 30,
        anchorPointX: 0
    } );

    this.sky = new Kiwi.GameObjects.StaticImage(this, this.textures.sky, 0, 0);
    this.ground = new Kiwi.GameObjects.StaticImage(this, this.textures.ground, 0, 100);

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

    // this.lane2 = new Lane (
    //     new Kiwi.Group(this),
    //     new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0)
    // );
    // this.lanes[LaneNumber.Lane2] = this.lane2;

    // this.lane3 = new Lane (
    //     new Kiwi.Group(this),
    //     new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0)
    // );
    // this.lanes[LaneNumber.Lane3] = this.lane3;

    //
    // add cats to lanes
    //

    this.cats = catGenerator.generate();
    this.cats.forEach( cat => play.lanes[cat.lane].addCat(play.makeCat(cat)) );

    //
    // add bad things to the lanes
    //

    this.bads = badGenerator.generate();
    this.bads.forEach( bad => play.lanes[bad.lane].addBad(play.makeBad(bad)) );

    ///
    /// start building the hand
    ///

    this.cards = this.makeCards();
    this.deck = new Deck(this.cards);
    this.hand = new Hand(5, this);
    this.discard = new Hand(100, this);

    ///
    /// Build the game system object
    ///

    this.world = new World(
        this.hand,
        this.deck,
        this.discard,
        this.lanes
    );


    this.addChild(this.background);

    this.lanes.forEach(l => this.addChild(l.getGroup()));

    this.addChild(this.hand.getGroup());

    this.addChild( this.attackButton1 );
    this.addChild( this.attackButton1Text );

    this.addChild( this.barShadow );
    this.addChild( this.bar );
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

    sprite.animation.add( "pounce", [0,1,2],0.1, true);
    sprite.animation.add( "walkRight", [ 24,25,26,27], 0.1, true );
    sprite.animation.add( "yowl", [ 16,17,18,19,20,21,22,23], 0.1, true );
    sprite.animation.add( "tailWiggle", [ 4,5,6,7], 0.1, true );

    return new Cat(
        new Kiwi.Group(this),
        sprite,
        catPlan.color,
        catPlan.stance
    );
};

// creates a bad object for a cat plan?
play.makeBad = function(badPlan) {
    return new Bad(
        new Kiwi.Group(this),
        new Kiwi.GameObjects.Sprite(this, this.textures.bad1, 0, 0),
        new Kiwi.GameObjects.Sprite(this, this.textures.attackIntent, 10, -35),
        new Kiwi.GameObjects.Sprite(this, this.textures.blockIntent, 10, -35)
    );
};

// creates a cat object for a cat plan?
play.makeCards = function() {

    let cards = [];
    let plans = cardGenerator.generate();

    plans.forEach(
        plan => cards.push(
            new Card(
                plan.name,
                new Kiwi.GameObjects.Sprite(this, this.textures[plan.sprite], 0, 0),
                plan.colors,
                plan.actions
            )
        )
    );

    return cards;
};

game.states.addState(play);
