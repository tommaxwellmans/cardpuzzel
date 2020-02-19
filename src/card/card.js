class Card {

    constructor(name, texture, catColors, actions, hand) {
        this.name = name;
        this.texture = texture;
        this.catColors = catColors;
        this.actions = actions;
        this.hand = null; //this hsa to be set after the card is generated, when it is added to the hand!
    }

    getName() {
        return name;
    }

    getTexture() {
        return this.texture;
    }

    getCatColors() {
        return this.catColors;
    }

    getActions() {
        return this.actions;
    }

    setHand(hand){

        this.hand = hand;
    }

    play() {
        this.hand.play(this);
    }

}
