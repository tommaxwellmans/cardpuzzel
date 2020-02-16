function CatGenerator (amountOfCats) {
    this.amountOfCats = amountOfCats;
}

CatGenerator.prototype.generate = function () {
    return {
        lane: Math.random() % 3,
        cat: new Cat(((Math.random() % 2) === 0) ? CatColor.White :  CatColor.Black)
    };
};