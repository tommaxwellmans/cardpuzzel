function ArcherGenerator (state) {
    this.state = state;
    this.strenght = 1;
    this.agility = 1;
    this.defence = 0;
}

ArcherGenerator.prototype.generate = function (amount) {

    let amountOfLanes = Object.keys(LaneNumber).length;
    let amountOfStances = Object.keys(CatStances).length;
    let amountOfColors = Object.keys(CatColor).length;

    let dudes = [];
    for (let i = 0; i < amount; i++) {
        dudes.push(

            new Archer(this.state, this.strenght, this.agility, this.defence)
            // {
            //     lane: Math.floor(Math.random() * 10) % amountOfLanes,
            //     color: Math.floor(Math.random() * 10) % amountOfColors,
            //
			// 	stance: 1
			// 	//stance: i % amountOfStances % amountOfStances
            // }

        );
    }
    return dudes;
};