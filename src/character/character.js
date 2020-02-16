class Character {
    constructor(sprite) {
        this.health = 1;
        this.attack = 1;
        this.block = 0;
        this.sprite = sprite;
    }

    isDead() {
        return this.health > 0;
    }

    getAttack() {
        return this.attack;
    }

    getSprite() {
        return this.sprite;
    }

    hurt (damage) {
        this.health -= damage;
    }

    defend (block) {
        this.block += block;
    }
}
