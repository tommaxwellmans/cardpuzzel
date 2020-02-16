function Card(name, catColors, actions) {

    this.name = name;
    this.catColors = catColors;
    this.actions = actions;

}

var whiteCatsAttack = new Card("White Cats Attack", [CatColor.White], [Actions.Attack]);
var blackCatsAttack = new Card("Black Cats Attack", [CatColor.Black], [Actions.Attack]);

var whiteCatsBlock = new Card("White Cats Attack", [CatColor.White], [Actions.Block]);
var blackCatsBlock = new Card("Black Cats Attack", [CatColor.Black], [Actions.Block]);


var whiteCatsAttackAndBlock = new Card("White Cats Attack and Block", [CatColor.White], [Actions.Attack]);
var blackCatsAttackAndBlock = new Card("Black Cats Attack and Block", [CatColor.Black], [Actions.Block]);

var blackAndWhiteCatsAttack = new Card("Black and White Cats Attack", [CatColor.Black, CatColor.White], [Actions.Attack, Actions.Block]);
var blackAndWhiteCatsBlock = new Card("Black and White Cats Block", [CatColor.Black, CatColor.White], [Actions.Attack, Actions.Block]);

