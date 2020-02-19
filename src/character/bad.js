class Bad extends Character {

    static intentGenerator = new IntentGenerator();

    constructor(group, sprite, attackIntentSprite, blockIntentSprite) {
        super(group,sprite);

        this.attackIntentSprite = attackIntentSprite;
        this.blockIntentSprite = blockIntentSprite;

        group.addChild(this.attackIntentSprite);
        group.addChild(this.blockIntentSprite);

        this.changeMode(Bad.intentGenerator.generate());

        ///
        /// Create damage pipeline
        ///

        this.pipeline = new Kiwi.Plugins.DamagePipeline.PipelineNode( {
            name: "Physical Armor",
            tags: DamageType.physical,
            operation: function( pack ) {
                pack.value -= 10;
            }
        });

        let healthMeter = new Kiwi.Plugins.DamagePipeline.MeterNode( {
                name: "Health Meter",
                doOnReceive: function( pack ) {

                    // doOnReceive contains the default functionality of
                    // applying the packs damage which we do want to override.
                    // If you did not call the super you would have to add
                    // your own meter management algorthim
                    Kiwi.Plugins.DamagePipeline.MeterNode.prototype.doOnReceive.call ( this, pack );



                },
                doOnMax: function( pack ) {
                },
                doOnOverflow: function( pack ) {
                },
                doOnBreak: function( pack ) {
                },
                doOnZero: function( pack ) {
                }
            })
        ;

        this.pipeline.onExhaust.add( (function() { this.notify( 'Physical damage nullified!');} ).bind(this) );

        this.pipeline.addChild(healthMeter);

        ///
        /// Create health ui
        ///

        this.healthBar = new HealthBar(this.group.state, 0, this.sprite.height + 5, this.sprite.width, 5);

        /**
         this.attackButton1 = new Kiwi.Plugins.Primitives.Rectangle( {
        state: this,
        width: 150,
        height: 30,
        color: [ 0.8, 0.8, 0.8 ],
        drawStroke: true,
        x: 120,
        y: 180,
        enableInput: true
    } );
         this.attackButton1Text = new Kiwi.GameObjects.Textfield( this,
         '5 Physical + 50 Poison',
         130, 190, '#000', 12 );
         this.attackButton1.input.onDown.add( (function( event ) {

        let alittleBitOfDamage = new Kiwi.Plugins.DamagePipeline.Pack( {
            value: 60,
            tags: DamageType.physical,
        });

        this.pipeline.receive( alittleBitOfDamage );
    }).bind( this ) );
         */

        this.group.addChild( this.healthBar.getGroup() );
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