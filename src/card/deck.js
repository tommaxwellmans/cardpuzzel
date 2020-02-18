class Deck {

    static switchAmount = 10;

    constructor(cards) {
        this.deck = cards;
        this.shuffle();
    }

    shuffle() {

        var tempCard;
        var tempIndex;

        // does some shuffling here
        for (let count = 0; count < Deck.switchAmount; count++) {

             tempIndex = Math.random() * 100 % this.deck.length;
             tempCard = this.deck[0];
             this.deck[0] = this.deck[tempIndex];
             this.deck[tempIndex] = tempCard;

        }

    }

    dealTopCard() {
        return this.deck.pop();
    }

}