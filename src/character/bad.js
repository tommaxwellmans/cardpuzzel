class Bad extends Character {

    static intentGenerator = new IntentGenerator();

    constructor(group, sprite, attackIntentSprite, blockIntentSprite) {
        super(group,sprite);

        this.attackIntentSprite = attackIntentSprite;
        this.blockIntentSprite = blockIntentSprite;

        group.addChild(this.attackIntentSprite);
        group.addChild(this.blockIntentSprite);

        this.changeMode(Bad.intentGenerator.generate());

    }

    changeMode(intent) {
        switch (intent) {
            //default:
            case BadGuyIntents.Attack:
                this.attackIntentSprite.visible = true;
                this.blockIntentSprite.visible = false;
                break;
            case BadGuyIntents.Block:
                this.blockIntentSprite.visible = true;
                this.attackIntentSprite.visible = false;
                break;
        }

        this.intent = intent;
    }

}