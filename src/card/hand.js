class Hand {

    static cardRotation = Math.PI / 16;

    static cardRotationHeavy = Math.PI / 8;

    // constant of spacing between cards in the had
    static cardSpacing = 220;

    // buffer on the x axis
    static cardXOffset = 10;

    static height = 350;

    //static width = 500;

    static highLightedHeight = -50;

    static highLightedIndex = 100;

    static highLightedScale = 1.1;

    // replace with some with calculates width and height of the group object
    static handWidth = 1000;

    constructor(limit, state) {

        this.state = state;

        this.cards = [];
        this.highLightedCard = null;
        this.limit = limit;
        this.group = new Kiwi.Group(state);
        this.group.y = GameDimension.Height - Hand.height;
        this.world = null;

        this.firstCardSlot = new Kiwi.Group(state);
        this.firstCardSlot.rotation =   -(Hand.cardRotationHeavy);
        this.firstCardSlot.y = 140;

        this.secondCardSlot = new Kiwi.Group(state);
        this.secondCardSlot.rotation = - (Hand.cardRotation);
        this.secondCardSlot.y = 50;

        this.thirdCardSlot = new Kiwi.Group(state);

        this.fourthCardSlot = new Kiwi.Group(state);
        this.fourthCardSlot.rotation = Hand.cardRotation;
        this.fourthCardSlot.y = 10;

        this.fithCardSlot = new Kiwi.Group(state);
        this.fithCardSlot.rotation = Hand.cardRotationHeavy;
        this.fithCardSlot.y  = 60;

        this.cardSlots = [ this.firstCardSlot, this.secondCardSlot, this.thirdCardSlot, this.fourthCardSlot, this.fithCardSlot];

        this.cardSlots.forEach(
            (slot, index) => {
                this.group.addChild(slot);
                slot.x = Hand.cardXOffset + Hand.cardSpacing * index;
            }
        );

        // center the hand on screen
        this.group.x = GameDimension.Width / 2 - Hand.handWidth / 2;

    }

    setWorld(world) {
        this.world = world;
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

        this.cards.push(card);
        this.reorder();

        card.getSprite().input.onEntered.add( this.highlightCard, this );
        card.getSprite().input.onLeft.add( this.onCardLeft, this );


        card.makeClickable();//get the card to have a click listener
        card.setHand(this);//tell it what hand it is in
    }

    highlightCard(cardSprite) {

        //console.log("Entered card");

        if (this.highLightedCard  === cardSprite) {
            return ; // this card is all readHighLighted
        }

        // force the previous card back into its normal position
        this.lowLightCard();

        //    this.cards.splice(this.cards.indexOf(clickedCard), 1);
        cardSprite.y = Hand.highLightedHeight;//clicks are bubbling
        cardSprite.scaleX = Hand.highLightedScale;
        cardSprite.scaleY = Hand.highLightedScale;

        this.group.setChildIndex(cardSprite, Hand.highLightedIndex);

        this.highLightedCard = cardSprite;

    }

    onCardLeft(card) {

        // we only care about minimising the highlighted card
        if (this.highLightedCard !== card) {
            return;
        }
        this.lowLightCard();
    }

    lowLightCard() {

        console.log("Left card");

        if (this.highLightedCard === null) {
            return ; // this card is highlighted
        }
        //  if (this.highLightedCard === null && this.highLightedCard  !== cardSprite) {
        //      return ; // this card is highlighted
        // }

        this.highLightedCard.y = 0;
        this.highLightedCard.scaleX = 1;
        this.highLightedCard.scaleY = 1;

        //this.normalCards.addChild(cardSprite);
        // this.highLightedCards.removeChild(cardSprite);


        this.highLightedCard = null;

    }

    play(card) {
        //console.log("played card" + card.getName());
        this.world.play(card);
        this.removeCard(card);
    }

    removeCard(clickedCard) {

        //console.log("tried to remove" + clickedCard);
        //console.log("already gone from cards in hand."+this.cards.length);

        clickedCard.getSprite().visible = false

        //this.group.removeChild(clickedCard.getSprite());

        //this.reorder();

        //cards/or the hand need to have a pointer to the discard pile (hand object) if we want them to go there
        //this.discard.push(card);//could instead add it to active cards for comboes
    }

    reorder() {

        this.cards.forEach((card, index ) => {
            let currentCardSlot = this.cardSlots[index];
            currentCardSlot.clear();

            let sprite = card.getSprite();
            currentCardSlot.addChild(sprite);
        });

        // set the group to be drity
        //this.group.

    }

}