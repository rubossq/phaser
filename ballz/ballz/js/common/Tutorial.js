var Tutorial = Base.extend({

	components: null,
	gamePage: null,
	slideAnim: null,
	showed: false,

	constructor: function(gamePage){
		this.components = {slideImage: null, slideText1: null, slideText2: null, deadLineText: null};

		this.gamePage = gamePage;
	},

	preload: function(){
		Manager.i.game.load.image('slide', Tutorial.SLIDE_IMAGE);
	},

	create: function(){

		var comps = this.components;

		// set Tutorial slide image
		comps.slideImage = Manager.i.game.add.sprite(0, 0, "slide");
		// set Tutorial slide text
		comps.slideText1 = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("tutorialSlide1"), Manager.i.sizeManager.getPointText());
		comps.slideText2 = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("tutorialSlide2"), Manager.i.sizeManager.getPointText());
		this.setSlideParams(comps);

		// set Tutorial deadline text
		comps.deadLineText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("tutorialDeadLine"), Manager.i.sizeManager.getPointText());
		this.setDeadLineParams(comps);

		this.hide();
	},

	update: function(){
		
	},

	setSlideParams: function(comps){
		var self = this;
		// set slide coordinates and params
		comps.slideText1.x = (Manager.i.game.width - comps.slideText1.width) / 2;
		comps.slideText1.y = this.gamePage.deadLine.getDeadPosY() - (2 * Manager.i.sizeManager.getPointText()) - (60 * Manager.i.sizeManager.scaleX);
		comps.slideText1.tint = 0x3C4150;
		comps.slideText2.x = (Manager.i.game.width - comps.slideText2.width) / 2;
		comps.slideText2.y = this.gamePage.deadLine.getDeadPosY() - Manager.i.sizeManager.getPointText() - (50 * Manager.i.sizeManager.scaleX);
		comps.slideText2.tint = 0x3C4150;

		comps.slideImage.scale.setTo(SizeManager.i.scaleX * 1.4, SizeManager.i.scaleX * 1.4);
		comps.slideImage.x = (Manager.i.game.width - comps.slideImage.width) / 2;
		startSlide();

		function startSlide(){
			comps.slideImage.y = self.gamePage.deadLine.getDeadPosY() - comps.slideImage.width - (2 * Manager.i.sizeManager.getPointText()) - (75 * Manager.i.sizeManager.scaleX);
			self.slideAnim = Manager.i.game.add.tween(comps.slideImage).to( {y: (Manager.i.game.height / 2)}, 1300, Phaser.Easing.Linear.None, true);
			self.slideAnim.onComplete.add(startSlide, this);
		}
	},

	setDeadLineParams: function(comps){
		// set deadline text coordinates and params
		comps.deadLineText.x = (30 * Manager.i.sizeManager.scaleX);
		comps.deadLineText.y = this.gamePage.deadLine.getDeadPosY() + (15 * Manager.i.sizeManager.scaleX);
		comps.deadLineText.tint = 0x3C4150;
	},

	stopSlide: function(){
		this.slideAnim.onComplete.removeAll();
	},

	show: function(){
		if(!this.showed){
			this.showed = true;
			for (var prop in this.components){
				if(this.components.hasOwnProperty(prop)){
					this.components[prop].exists = true;
					this.components[prop].visible = true;
				}
			}
		}
	},

	hide: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = false;
				this.components[prop].visible = false;
			}
		}
	},
},{
	SLIDE_IMAGE: "res/images/slide.png"
});