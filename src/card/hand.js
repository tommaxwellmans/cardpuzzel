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
		
		card.makeClickable();//get the card to have a click listener
		card.setHand(this);//tell it what hand it is in

        // add to the list of cats
        this.cards.push(card);

        // add the cat sprite to the lanes gui
        this.group.addChild(card.getSprite());

    }
	
	
	removeCard(clickedCard){
		
		console.log("tried to remove" + clickedCard);
		
		//clickedCard.getSprite().visible = false;
		
		
		
		
		
		if(this.cards.indexOf(clickedCard)> -1)
		{
					this.cards.splice(this.cards.indexOf(clickedCard), 1);
					clickedCard.getSprite().y -= 200;//clicks are bubbling
					
		}	
		
	console.log("already gone from cards in hand."+this.cards.length);
		
		//cards/or the hand need to have a pointer to the discard pile (hand object) if we want them to go there
		//this.discard.push(card);//could instead add it to active cards for comboes
		
		
		
	}
	
	highlightCard(clickedCard){
		//
		
	}

}