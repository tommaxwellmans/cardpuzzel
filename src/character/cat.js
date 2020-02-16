class Cat extends Character {

    constructor (color, sprite) {
        super(sprite);
        this.color = color;
    }

    /**
     *  Return the cats colour
     * @returns {*}
     */
    getColor() {
        return this.color;
    }
}
