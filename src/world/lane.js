class Lane {


    static baseOffset = 150;

    static laneCount = 0;

    static laneSpacing = 100;

    // constant of spacing between characters in the lane
    static characterSpacing = 15;

    // buffer on the x axis
    static characterXOffset = 10;

    constructor(group, background) {

        this.group = group;
        this.group.y = Lane.baseOffset + Lane.laneCount++ * Lane.laneSpacing;
        this.background = background;
        this.group.addChild(background);
        this.cats = [];
        this.bads = [];

    }

    getGroup() {
        return this.group;
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

}