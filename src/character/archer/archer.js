class Archer extends Character {

    constructor(state, strength, agility, defence) {

        var sprite = new Kiwi.GameObjects.Sprite(state, state.textures.archer, 0, 0);
        sprite.animation.add("idle", [0, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 0], 0.1, true);
        sprite.animation.add("start", [0], 0.1, true);

        super(state, sprite, strength, agility, defence);
    }

}