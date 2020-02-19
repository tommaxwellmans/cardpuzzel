function CatGenerator (amountOfCats) {
    this.amountOfCats = amountOfCats;
}

CatGenerator.prototype.generate = function () {

    let amountOfLanes = Object.keys(LaneNumber).length;
    let amountOfStances = Object.keys(CatStances).length;
    let amountOfColors = Object.keys(CatColor).length;

    var cats = [];
    for (var i = 0; i < this.amountOfCats; i++) {
        cats.push(
            {
                lane: Math.floor(Math.random() * 10) % amountOfLanes,
                color: Math.floor(Math.random() * 10) % amountOfColors,
                
				stance: 1
				//stance: i % amountOfStances % amountOfStances
            }
        );
    }
    return cats;
};