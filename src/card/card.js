class Card {

 constructor(name, sprite, catColors, actions) {
     this.name = name;
     this.sprite = sprite;
     this.catColors = catColors;
     this.actions = actions;
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

}
