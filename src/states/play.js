var play = new Kiwi.State('play');

const catLaneOffSet = 50;

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

    this.addSpriteSheet( 'bad1', 'asset/bad/badSheet1.png', 180, 120);

    this.addImage('attackIntent', 'asset/intent/attack.png');
    this.addImage('blockIntent', 'asset/intent/block.png');

};

play.create = function () {

    Kiwi.State.prototype.create.call(this);

    ///
    /// Damage Pipeline
    ///

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
        new Kiwi.GameObjects.StaticImage(this, this.textures.lane, 0, 0),
        this.game

    );
    this.lanes[LaneNumber.Lane1] = this.lane1;

    ///
    /// start building the hand
    ///


    this.hand = new Hand(5, this);

    this.world = new World(
        play,
        this,
        this.hand,
        this.lanes
    );

    ///
    /// Build the game system object
    ///


    this.addChild(this.background);

    this.lanes.forEach(l => this.addChild(l.getGroup()));

    this.addChild(this.hand.getGroup());

};

play.victory = function () {
    let rectangle = new Kiwi.Plugins.Primitives.Rectangle( {
        state: this,
        width: GameDimension.Width,
        height: GameDimension.Height,
        alpha: 0.5,
        color: [1,1,1]
    } );
    this.addChild(rectangle);

    let tween = this.game.tweens.create(rectangle);
    tween.to({alpha: 1.0}, 5000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);
    tween.onComplete(
        function () {
            //game.tweens.removeAll();
            game.tweens.remove(tween);
            play.active = false;
            game.states.switchState('victory');
        }
    );
    tween.start();

};

game.states.addState(play);