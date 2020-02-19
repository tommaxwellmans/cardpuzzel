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

        this.animationList = new ActionList();

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

        this.animationList.play();
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

        matcats.forEach(cat => {//using the this.cats did not retain the change from play function and matching cats call
            let nearestBad = self.getNearRestBad();
            if (nearestBad != null) {
                nearestBad.hurt(cat.getAttack())
            }
			
			console.log("changing a stance");
            cat.changeStance(0);
            var startpos = cat.getSprite().x;

            let chainTo = this.game.tweens.create(cat.getSprite());
            chainTo.to({x: 1150}, 1000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);
            let chainBack = this.game.tweens.create(cat.getSprite());
            chainBack.to({x: startpos}, 1000, Kiwi.Animations.Tweens.Easing.Quartic.Out, false);
            chainTo.chain(chainBack);

            this.animationList.add(chainTo, chainBack);

        });

	}

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