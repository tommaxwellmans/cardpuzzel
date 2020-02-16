class Character {
    constructor() {
        this.health = 1;
        this.attack = 1;
        this.block = 0;
    }

    isDead() {
        return this.health > 0;
    }

    attack() {
        return this.attack;
    }

    hurt = function (damage) {
        this.health -= damage;
    };

    defend = function (block) {
        this.block += block;
    }
}
