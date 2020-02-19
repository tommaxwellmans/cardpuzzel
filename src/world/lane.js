class Lane {


    static baseOffset = 150;

    static laneCount = 0;

    static laneSpacing = 100;

    // constant of spacing between characters in the lane
    static characterSpacing = 15;

    // buffer on the x axis
    static characterXOffset = 10;

    constructor(group, background, game) {

        this.world = null;
		this.game = game;
		
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
		

        ///
        /// Cats do their actions
        ///

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

        ///
        /// Big bad does their action
        ///

        this.bads.forEach(bad => {
            cats.forEach(cat => {// this isn't supposed to only be the matching cats, cats not affected by card can still get hurt!
                cat.hurt(bad.getAttack())
            })
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

    catsAttack(matcats) {

        let self = this;

		//console.log("number of affected cats" + matcats.length);

			var i = 0;
	
        matcats.forEach(cat => {//using the this.cats did not retain the change from play function and matching cats call
            let nearestBad = self.getNearRestBad();
            if (nearestBad != null) {
                nearestBad.hurt(cat.getAttack())
            }
			
			console.log("changing a stance");
			
			
			
			
        });
		
		
		matcats[0].changeStance(0);
		var startpos = matcats[0].getSprite().x;
		this.chainTo = this.game.tweens.create(matcats[0].getSprite());//i can't do this from the foreach and i can't loop through the cats in matcats and do it!
		this.chainTo.to({x: 1150}, 1000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);
		//this.chainTo.onComplete(console.log("finished tween"), this);
		this.chainBack = this.game.tweens.create(matcats[0].getSprite());
		this.chainBack.to({x: startpos}, 1000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);
		this.chainTo.chain(this.chainBack);
    
		this.chainTo.start();
		
			//
			
	}
	
	/*
	this.chainTo = this.game.tweens.create(this.lanes[0].getCats()[0].getSprite());
    this.chainTo.to({x: x}, i*1000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);
	this.chainTo.onComplete ( cat.changeStance(1); , this)
	
	
			this.chainTo.onComplete ( cat.changeStance(1); , this)
			let i=i+1;
			
			
	
	
	this.chainTo = this.game.tweens.create(this.lanes[0].getCats()[0].getSprite());
    this.chainTo.to({x: 1100}, 1000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);

    this.chainBack = this.game.tweens.create(this.lanes[0].getCats()[0].getSprite());
    this.chainBack.to({x: 400}, 1000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);
    this.chainTo.chain(this.chainBack);
    this.chainTo.start();
	*/
	
	

    catsBlock(matcats) {
        matcats.forEach(c => {
            c.defend(10);
			
			c.changeStance(2);
			
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