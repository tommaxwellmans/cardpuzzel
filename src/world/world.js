class World {


    constructor(hand, deck, discard, lanes) {
        this.hand = hand;
        this.hand.setWorld(this);
        this.deck = deck;
        this.discard = discard;
        this.lanes = lanes;
        this.lanes.forEach(l => l.setWorld(this));
    }

    play(card) {
        this.lanes.forEach (l => l.play(card));
    }
}