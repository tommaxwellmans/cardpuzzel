class Card {

 constructor(name, sprite, catColors, actions,hand) {
     this.name = name;
     this.sprite = sprite;
     this.catColors = catColors;
     this.actions = actions;
	 this.hand = null;//this hsa to be set after the card is generated, when it is added to the hand! 
 }

 getName() {
     return name;
 }

 getSprite() {
     return this.sprite;
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
 
 singleClick (){
	
	//console.log("clicked card");
	this.hand.removeCard(this);
}

 
 makeClickable(){
	 
	 //sprite.input.onUp.add( this.singleClick, this );
	 this.getSprite().input.onUp.add( this.singleClick, this );
	 
 }
 


}
