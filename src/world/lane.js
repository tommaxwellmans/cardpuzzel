class Lane {


    static baseOffset = 150;

    static laneCount = 0;

    static laneSpacing = 100;

    // constant of spacing between characters in the lane
    static characterSpacing = 60;

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
        cat.getSprite().x = Lane.characterXOffset + Lane.characterSpacing * this.cats.length;

        // add to the list of cats
        this.cats.push(cat);

        // add the cat sprite to the lanes gui
        this.group.addChild(cat.getSprite());

    }

}