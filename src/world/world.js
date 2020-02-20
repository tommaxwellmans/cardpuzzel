class World {

    static badGenerator = new BadGenerator(1);
    static catGenerator = new CatGenerator(8);
    static cardGenerator = new CardGenerator();

    constructor(game, state, hand, lanes) {

        this.result = GameResult.playing;

        this.game = game;
        this.state = state;
        this.hand = hand;
        this.hand.setWorld(this);
        this.discard = [];


        let cards = this.makeCards();
        this.deck = new Deck(cards);

        ///
        /// Setup lanes
        ///

        this.lanes = lanes;
        this.lanes.forEach(l => l.setWorld(this));

        ///
        /// Setup Cats
        ///

        let badPlans = World.badGenerator.generate();
        badPlans.forEach(bad => lanes[bad.lane].addBad(this.makeBad(bad)));


        ///
        /// Setup bad guys
        ///

        let catPlans  = World.catGenerator.generate();
        catPlans.forEach(cat => lanes[cat.lane].addCat(this.makeCat(cat)));

        this.hand.addCard(this.deck.dealTopCard());
        this.hand.addCard(this.deck.dealTopCard());
        this.hand.addCard(this.deck.dealTopCard());
        this.hand.addCard(this.deck.dealTopCard());
        this.hand.addCard(this.deck.dealTopCard());

    }

    play(card) {
        this.lanes.forEach (l => l.play(card));

        this.discard.push(card);

        if (this.deck.empty()) {
            this.deck.addAll(this.discard);
            this.discard = [];
        }

        this.hand.addCard(this.deck.dealTopCard());
    }

    // creates a bad object for a cat plan?
    makeBad(badPlan) {
        return new Bad(
            this,
            new Kiwi.Group(this.state),
            new Kiwi.GameObjects.Sprite(this.state, this.state.textures.bad1, 0, 0),
            new Kiwi.GameObjects.Sprite(this.state, this.state.textures.attackIntent, 10, -35),
            new Kiwi.GameObjects.Sprite(this.state, this.state.textures.blockIntent, 10, -35)
        );
    }

    // creates a cat object for a cat plan?
    makeCat(catPlan) {

        var sprite;
        switch (catPlan.color) {
            case CatColor.White:
                sprite =  new Kiwi.GameObjects.Sprite(this.state, this.state.textures.catWhite, 0, 0);
                break;
            case CatColor.Black:
            default:
                sprite =  new Kiwi.GameObjects.Sprite(this.state, this.state.textures.catBlack, 0, 0);
                break;
        }

        sprite.animation.add( "pounce", [24,0,1,2,3,4,14,28,29,30,31,28,29,30,31,4,5,6,7],0.1, false);
        sprite.animation.add( "walkRight", [ 24,25,26,27], 0.1, true );
        sprite.animation.add( "yowl", [ 16,17,18,19,20,21,22,23], 0.1, true );
        sprite.animation.add( "tailWiggle", [ 4,5,6,7], 0.1, true );
        sprite.animation.add( "dead", [11], 0.1, true );

        return new Cat(
            new Kiwi.Group(this.state),
            sprite,
            catPlan.color,
            catPlan.stance
        );
    }

    // creates a cat object for a cat plan?
    makeCards() {

        let cards = [];
        let plans = World.cardGenerator.generate();

        plans.forEach(
            plan => cards.push(
                new Card(
                    plan.name,
                    this.state.textures[plan.sprite],
                    plan.colors,
                    plan.actions
                )
            )
        );

        return cards;
    }

    win() {
        this.result = GameResult.won;

        this.game.victory();

    }

    lose () {
        this.result = GameResult.lost;
    }

    getResult() {
        return this.result;
    }


}