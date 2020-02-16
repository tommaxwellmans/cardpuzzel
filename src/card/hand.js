class Hand {


    // constant of spacing between cards in the had
    static cardSpacing = 175;

    // buffer on the x axis
    static cardXOffset = 10;

    static height = 350;

    //static width = 500;

    static highLightedHeight = -50;

    static highLightedIndex = 100;

    static highLightedScale = 1.1;

    constructor(limit, state) {

        this.state = state;

        this.cards = [];
        this.highLightedCard = null;
        this.limit = limit;
        this.group = new Kiwi.Group(state);
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

        card.getSprite().input.onEntered.add( this.highlightCard, this );
        card.getSprite().input.onLeft.add( this.lowLightCard, this );

		card.makeClickable();//get the card to have a click listener
		card.setHand(this);//tell it what hand it is in

        // add to the list of cats
        this.cards.push(card);

        // add the cat sprite to the lanes gui
        this.group.addChild(card.getSprite());

    }

    highlightCard(cardSprite) {

        console.log("Entered card");

        if (this.highLightedCard  === cardSprite) {
            return ; // this card is all readHighLighted
        }

        // force the previous card back into its normal position
        this.lowLightCard(this.highLightedCard);

        //    this.cards.splice(this.cards.indexOf(clickedCard), 1);
        cardSprite.y = Hand.highLightedHeight;//clicks are bubbling
        cardSprite.scaleX = Hand.highLightedScale;
        cardSprite.scaleY = Hand.highLightedScale;

        this.group.setChildIndex(cardSprite, Hand.highLightedIndex);

        this.highLightedCard = cardSprite;

    }

    lowLightCard(cardSprite) {

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

	removeCard(clickedCard){
		
		console.log("tried to remove" + clickedCard);
		
		//clickedCard.getSprite().visible = false;

	console.log("already gone from cards in hand."+this.cards.length);
		
		//cards/or the hand need to have a pointer to the discard pile (hand object) if we want them to go there
		//this.discard.push(card);//could instead add it to active cards for comboes
		
		
		
	}

}