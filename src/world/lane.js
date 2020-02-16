class Lane {


    static baseOffset = 150;

    static laneCount = 0;

    static laneSpacing = 100;

    // constant of spacing between characters in the lane
    static characterSpacing = 15;

    // buffer on the x axis
    static characterXOffset = 10;

    constructor(group, background) {

        this.world = null;
        this.group = group;
        this.group.y = Lane.baseOffset + Lane.laneCount++ * Lane.laneSpacing;
        this.background = background;
        this.group.addChild(background);
        this.cats = [];
        this.bads = [];

    }

    setWorld(world) {
        this.world  = world;
    }

    getGroup() {
        return this.group;
    }

    getCats() {
        return this.cats;
    }

    addCat(cat) {

        // adjust for amount of cat in the lane
        cat.getSprite().x = Lane.characterXOffset + (cat.getWidth() + Lane.characterSpacing) * this.cats.length;

        // add to the list of cats
        this.cats.push(cat);

        // add the cat sprite to the lanes gui
        this.group.addChild(cat.getSprite());

    }

    addBad(bad) {

        // add to the list of cats
        this.bads.push(bad);

        // adjust for amount of cat in the lane
        bad.getSprite().x = GameDimension.Width - (Lane.characterXOffset + (bad.getWidth() + Lane.characterSpacing) * this.bads.length);

        // add the cat sprite to the lanes gui
        this.group.addChild(bad.getSprite());

    }

    /**
     *
     * Does the played card effect on the lane.
     *
     * @param card
     */
    play(card) {

        let cats = this.matchingCats(card);

        card.getActions().forEach(a => {
            switch (a) {
                case Actions.Attack:
                    this.catsAttack(cats);
                    break;
                case Actions.Block:
                    this.catsBlock(cats);
                    break;
            }
        });
    }

    getNearRestBad() {
        let nearestBad = null;

        this.bads.forEach(b => {
                if (b.isAlive()) {
                    nearestBad = b;
                }
            }
        );
        return nearestBad;
    }

    catsAttack(cats) {

        let self = this;

        this.cats.forEach(cat => {
            let nearestBad = self.getNearRestBad();
            if (nearestBad != null) {
                nearestBad.hurt(cat.getAttack())
            }
        });
    }

    catsBlock(cats) {
        this.cats.forEach(c => {
            c.defend(10);
        });
    }

    matchingCats(card) {

        let obeyingCats = [];

        this.cats.forEach(cat => {
            let obeys = cat.obeys(card);
            if (obeys) {
                obeyingCats.push(cat);
            }
        });

        return obeyingCats;
    }


}