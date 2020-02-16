class Hand {


    // constant of spacing between cards in the had
    static cardSpacing = 175;

    // buffer on the x axis
    static cardXOffset = 10;

    static height = 350;

    //static width = 500;

    constructor(limit, group) {

        this.cards = [];
        this.limit = limit;
        this.group = group;
        this.group.y = GameDimension.Height - Hand.height;

    }

    getGroup() {
        return this.group;
    }

    getLimit() {
        return this.limit;
    }

    addCard(card) {

        if (this.cards.length >= this.limit) {
            return;
        }

        // adjust for amount of cat in the lane
        card.getSprite().x = Hand.cardXOffset + Hand.cardSpacing * this.cards.length;

        // add to the list of cats
        this.cards.push(card);

        // add the cat sprite to the lanes gui
        this.group.addChild(card.getSprite());

    }

}