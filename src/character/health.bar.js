class HealthBar {

    constructor(state, x, y, width, height) {

        this.group = new Kiwi.Group(state);

        this.bar = new Kiwi.Plugins.Primitives.Rectangle( {
            state: this.group.state,
            width: width,
            height: height,
            drawStroke: false,
            color: [ 0.9, 0.1, 0.1 ],
            x: x,
            y: y,
            anchorPointX: 0
        } );
        this.barShadow = new Kiwi.Plugins.Primitives.Rectangle( {
            state: this.group.state,
            width: width,
            height: height + 1,
            drawStroke: false,
            color: [ 0.8, 0.8, 0.8 ],
            x: x,
            y: y,
            anchorPointX: 0
        } );

        this.group.addChild(this.barShadow);
        this.group.addChild(this.bar);

    }

    /**
     *
     * Not sure if this class should just extend group.
     *
     * Health bar is a composite of shapes .......
     *
     * @returns {Group}
     */
    getGroup() {
        return this.group;
    }

    /**
     *
     * updates the health bar to reflect to amount of health the character has
     *
     * @param percent
     */
    update (percent) {
        let tween = game.tweens.create( his.bar);
        tween.to(
            { scaleX: percent },
            500,
            Kiwi.Animations.Tweens.Easing.Sinusoidal.Out,
            true
        );
        tween.start();
    }

}