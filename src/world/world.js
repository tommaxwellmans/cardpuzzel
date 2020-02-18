class World {


    constructor(hand, deck, discard, lanes) {
        this.hand = hand;
        this.hand.setWorld(this);
        this.deck = deck;
        this.discard = discard;
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
    }
}