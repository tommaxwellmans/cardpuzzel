function CatGenerator (amountOfCats) {
    this.amountOfCats = amountOfCats;
}

CatGenerator.prototype.generate = function () {
    var cats = [];
    for (var i = 0; i < this.amountOfCats; i++) {
        cats.push(
            {
                lane: Math.floor(Math.random() * 10) % 3,
                color: ((Math.floor(Math.random() * 10) % 2) === 0 ? CatColor.White :  CatColor.Black)
            }
        );
    }
    return cats;
};