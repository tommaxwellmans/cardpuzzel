function BadGenerator (amount) {
    this.amount = amount;
}

BadGenerator.prototype.generate = function () {
    let badThings = [];
    for (let i = 0; i < this.amount; i++) {
        badThings.push(
            {
                lane: Math.floor(Math.random() * 10) % 3,
            }
        );
    }
    return badThings;
};