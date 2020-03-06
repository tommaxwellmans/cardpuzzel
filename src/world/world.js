class World {

    constructor(game, state) {

        this.sky = new Kiwi.GameObjects.StaticImage(state, state.textures.sky, 0, 0);
        this.ground = new Kiwi.GameObjects.StaticImage(state, state.textures.ground, 0, 100);

        this.background = new Kiwi.Group(state);
        this.background.addChild(this.sky);
        this.background.addChild(this.ground);
        state.addChild(this.background);

        this.result = GameResult.playing;

        this.game = game;
        this.state = state;
        //this.hand = hand;
        //this.hand.setWorld(this);
        this.discard = [];
        this.dudes = [];

        //let cards = this.makeCards();
        //this.deck = new Deck(cards);

        ///
        /// Setup lanes
        ///

        //this.lanes = lanes;
        //this.lanes.forEach(l => l.setWorld(this));

        ///
        /// Setup Cats
        ///

        //let badPlans = World.badGenerator.generate();
        //badPlans.forEach(bad => lanes[bad.lane].addBad(this.makeBad(bad)));


        ///
        /// Setup bad guys
        ///

        //let catPlans  = World.catGenerator.generate();
        //this.aliveCats = catPlans.length;
        //catPlans.forEach(cat => lanes[cat.lane].addCat(this.makeCat(cat)));

        // this.hand.addCard(this.deck.dealTopCard());
        // this.hand.addCard(this.deck.dealTopCard());
        // this.hand.addCard(this.deck.dealTopCard());
        // this.hand.addCard(this.deck.dealTopCard());
        // this.hand.addCard(this.deck.dealTopCard());

    }

    play(card) {
        // this.lanes.forEach (l => l.play(card));
        //
        // this.discard.push(card);
        //
        // if (this.deck.empty()) {
        //     this.deck.addAll(this.discard);
        //     this.discard = [];
        // }
        //
        // this.hand.addCard(this.deck.dealTopCard());
    }

    addDudes(dudes) {
        dudes.forEach(dude => this.addDude(dude));
    }

    addDude(dude) {
        this.dudes.push(dude);
        this.background.addChild(dude.getGroup());
        dude.idle();
    }


    win() {
        this.result = GameResult.won;
        this.game.victory();
    }

    /**
     *  record that a cat is a goner and check if the play has lost the game
     */
    catDead() {
        this.aliveCats -= 1;
        if (this.aliveCats < 1) {
            this.lose();
        }
    }

    lose () {
        this.result = GameResult.lost;
        this.game.defeat();
    }

    getResult() {
        return this.result;
    }


}