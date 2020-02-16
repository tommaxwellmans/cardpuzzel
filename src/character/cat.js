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

    obeys(card) {
        let obeys = false;
        card.getCatColors().forEach(
            color => {
                if (color === this.getColor()) {
                    obeys = true;
                }
            }
        );
        return obeys;
    }

}
