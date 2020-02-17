class Cat extends Character {

    constructor (group, sprite, color) {
        super(group, sprite);
        this.color = color;
    }

    /**
     *  Return the cats colour
     * @returns {*}
     */
    getColor() {
        return this.color;
    }
	
	getSprite() {
		return this.sprite;
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
