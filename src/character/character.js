class Character {
    constructor(state, sprite, strength, agility, defence) {

        this.group = new Kiwi.Group(state);
        this.sprite = sprite;

        this.group.addChild(sprite);

        this.strength = strength;
        this.agility = agility;
        this.defence = defence;

        ///
        /// Setup health system
        ///


        let healthBar = new HealthBar(this.group.state, 0, sprite.height + 5, sprite.width, 3);
        this.healthMeter = healthBar;

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
                ///healthBar.update(this.valueNormalized);
            },
            doOnMax: function( pack ) {
            },
            doOnOverflow: function( pack ) {
            },
            doOnBreak: function( pack ) {
            },
            doOnZero: function( pack ) {
                //theWorld.catDead();
            }
        });

        this.pipeline.addChild(this.healthMeter);

        this.group.addChild(healthBar.getGroup());


    }

    isAlive() {
        return this.health > 0;
    }

    getAttack() {
        return new Kiwi.Plugins.DamagePipeline.Pack({value: this.strength, tags: DamageType.physical});
    }

    getDoge() {
        return this.agility;
    }

    getBlock() {
        return this.defence;
    }

    getGroup() {
        return this.group;
    }

    getSprite() {
        return this.sprite;
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

    ///
    ///
    /// Animation methods
    ///
    ///

    /**
     *
     */
    idle() {
        this.getSprite().animation.play('idle');
    }

    /**
     *
     */
    start() {
        this.getSprite().animation.play('start');
    }

}