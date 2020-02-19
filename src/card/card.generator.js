  
function CardGenerator() {
}

CardGenerator.prototype.generate = function () {

    return [
    {name:"White Cats Attack", sprite: "whiteCatsAttack", colors:[CatColor.White], actions:[Actions.Attack]},
    {name:"Black Cats Attack", sprite: "blackCatsAttack", colors:[CatColor.Black], actions:[Actions.Attack]},
    {name:"White Cats Attack", sprite: "whiteCatsBlock", colors:[CatColor.White], actions:[Actions.Block]},
    {name:"Black Cats Attack", sprite: "blackCatsBlock", colors:[CatColor.Black], actions:[Actions.Block]},

    {name:"White Cats Attack and Block", sprite: "whiteCatsAttackAndBlock", colors:[CatColor.White], actions:[Actions.Attack]},
    {name:"Black Cats Attack and Block", sprite: "blackCatsAttackAndBlock", colors:[CatColor.Black], actions:[Actions.Block]},

    {name:"Black and White Cats Attack", sprite: "whiteCatsAttackAndBlock", colors:[CatColor.Black, CatColor.White], actions:[Actions.Attack, Actions.Block]},
    {name:"Black and White Cats Block", sprite: "blackCatsAttackAndBlock", colors:[CatColor.Black, CatColor.White], actions:[Actions.Attack, Actions.Block]},

    {name:"Black and White Cats Attack", sprite: "blackAndWhiteCatsAttack", colors:[CatColor.Black, CatColor.White], actions:[Actions.Attack, Actions.Block]},
    {name:"Black and White Cats Block", sprite: "blackAndWhiteCatsBlock", colors:[CatColor.Black, CatColor.White], actions:[Actions.Attack, Actions.Block]},

]

};