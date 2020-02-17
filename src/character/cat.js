class Cat extends Character {

    constructor (group, sprite, color, stance) {
        super(group, sprite);
        this.color = color;
        this.changeStance(stance);
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

	changeStance(stance) {
        this.stance = stance;

        switch (stance) {
            case CatStances.pounce:
                this.sprite.animation.play("pounce");
                break;
            case CatStances.tailWiggle:
                this.sprite.animation.play("walkRight");
                break;
            case CatStances.walkRight:
                this.sprite.animation.play("yowl");
                break;
            case CatStances.yowl:
                this.sprite.animation.play("tailWiggle");
                break;
        }


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
