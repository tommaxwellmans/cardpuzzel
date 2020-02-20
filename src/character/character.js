class Character {
    constructor(group, sprite) {
        this.group = group;
        this.sprite = sprite;
        this.group.addChild(sprite);
        this.health = 1;
        this.attack = 1;
        this.block = 0;
    }

    isAlive() {
        return this.health > 0;
    }

    getAttack() {
        return new Kiwi.Plugins.DamagePipeline.Pack({value: 1, tags: DamageType.physical});
    }

    getGroup() {
        return this.group;
    }

    getSprite() {
        return this.group;
    }

    getWidth() {
        return this.sprite.width;
    }

    getHeight() {
        return this.sprite.height;
    }

    hurt (damage) {
        this.health -= damage;

        if (!this.isAlive()) {
            this.onDeath();
        }

    }

    defend (block) {
        this.block += block;
    }

    onDeath() {

        // play death animation

        // hide sprite
        this.getSprite().visible = false;

    }

}
