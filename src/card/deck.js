class Deck {

    constructor(cards) {
        this.deck = cards;
        this.shuffle();
    }

    shuffle() {

        // does some shuffling here

    }

    dealTopCard() {
        return this.deck.pop();
    }

}