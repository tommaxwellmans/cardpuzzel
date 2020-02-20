class Bad extends Character {

    static intentGenerator = new IntentGenerator();

    constructor(world, group, sprite, attackIntentSprite, blockIntentSprite) {
        super(group,sprite);

        var self = this;
        this.world = world;

        this.attackIntentSprite = attackIntentSprite;
        this.blockIntentSprite = blockIntentSprite;

        group.addChild(this.attackIntentSprite);
        group.addChild(this.blockIntentSprite);

        this.changeMode(Bad.intentGenerator.generate());

        ///
        /// Create health ui
        ///
        let healthBar = new HealthBar(this.group.state, 0, this.sprite.height + 5, this.sprite.width, 5);

        ///
        /// Create damage pipeline
        ///

        this.pipeline = new Kiwi.Plugins.DamagePipeline.PipelineNode( {
            name: "Physical Armor",
            tags: DamageType.physical,
            operation: function( pack ) {
                //pack.value -= 10;
            }
        });

        this.healthMeter = new Kiwi.Plugins.DamagePipeline.MeterNode( {
                name: "Health Meter",
                valueMax: 10,
                doOnReceive: function( pack ) {
                    Kiwi.Plugins.DamagePipeline.MeterNode.prototype.doOnReceive.call ( this, pack );
                    healthBar.update(this.valueNormalized);
                },
                doOnMax: function( pack ) {
                },
                doOnOverflow: function( pack ) {
                },
                doOnBreak: function( pack ) {
                },
                doOnZero: function( pack ) {
                    world.win();
                }
            })
        ;
        this.pipeline.addChild(this.healthMeter);

        this.group.addChild(healthBar.getGroup());
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

    /**
     *
     * Use the damage pipeline on the boss
     *
     * @param damage
     */
    hurt(damage) {
        this.pipeline.receive(damage);
    }


}