class ActionList {


    constructor() {
        this.firstAnimation = null;
        this.previousAnimation = null;
    }

    /**
     *
     * Add the current animation to play after the previous one
     *
     * If there is no previous animation just init the list
     *
     * @param actionAnimation
     * @param lastAnimation
     */
    add(actionAnimation, lastAnimation) {

        if (this.firstAnimation === null) {
            this.firstAnimation = actionAnimation
        }

        if (this.previousAnimation !== null) {
            this.previousAnimation.chain(actionAnimation);
        }

        this.previousAnimation = lastAnimation;

    }

    /**
     * Play all animations then wipe the list;
     */
    play() {
        this.firstAnimation.start();
        this.firstAnimation = null;
        this.previousAnimation = null;
    }

}