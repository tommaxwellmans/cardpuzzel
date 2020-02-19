class World {


    constructor(hand, deck, lanes) {
        this.hand = hand;
        this.hand.setWorld(this);
        this.deck = deck;
        this.discard = [];
        this.lanes = lanes;
        this.lanes.forEach(l => l.setWorld(this));

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
        //this.hand.reorder();

    }
}