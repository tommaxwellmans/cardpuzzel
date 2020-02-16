class Cat extends Character {

    constructor (color) {
        super();
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
