function Character() {
    this.health = 1;
    this.attack = 1;
    this.block = 0;
}

Bad.prototype.isDead = function () {
    return this.health > 0;
};

Bad.prototype.attack = function () {
    return this.attack;
};

Bad.prototype.hurt = function (damage) {
    this.health -= damage;
};

Bad.prototype.defend = function (block) {
    this.block += block;
};
