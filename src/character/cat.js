class Cat extends Character {

    constructor (group, sprite, color, stance) {
        super(group, sprite);
        this.color = color;
        this.changeStance(stance);

        let healthBar = new HealthBar(this.group.state, 0, 0, 50, 5);

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
                sprite.animation.play('dead');
            }
        })
        ;
        this.pipeline.addChild(this.healthMeter);

        this.group.addChild(healthBar.getGroup());

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
