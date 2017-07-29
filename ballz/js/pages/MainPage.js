var MainPage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {mainView: null, titleText1: null, titleText2: null, totalText: null, startBut: null, startText: null, 
						   rateBut: null, rateText: null, soundBut: null, skinsBut: null};
	},

	preload: function(){
		Manager.i.game.load.bitmapFont('Roboto', MainPage.ROBOTO_FONT_IMAGE, MainPage.ROBOTO_FONT_MAP);
		Manager.i.game.load.bitmapFont('Norwester', MainPage.NORWESTER_FONT_IMAGE, MainPage.NORWESTER_FONT_MAP);
		Manager.i.game.load.image('menu_circle', MainPage.MENU_CIRCLE);
		Manager.i.game.load.image('menu_oval', MainPage.MENU_OVAL);
		Manager.i.game.load.image('sound', MainPage.SOUND_IMAGE);
		Manager.i.game.load.image('skins', MainPage.SKINS_IMAGE);
	},

	create: function(){
		var comps = this.components;

		// set Main view
		comps.mainView = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Main title
		comps.titleText1 = Manager.i.game.add.bitmapText(0, 0, "Norwester", Lang.i.getWord("mainTitle1"), Manager.i.sizeManager.getTopTitleText());
		comps.titleText2 = Manager.i.game.add.bitmapText(0, 0, "Norwester", Lang.i.getWord("mainTitle2"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set Main total score
		comps.totalText = Manager.i.game.add.bitmapText(0, 0, "Roboto", "0", Manager.i.sizeManager.getMiniText());

		// set Main start
		comps.startBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.startText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("mainStart"), Manager.i.sizeManager.getPointText());
		this.setStartParams(comps);

		// set Main rate
		comps.rateBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.rateText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("mainRate"), Manager.i.sizeManager.getPointText());
		this.setRateParams(comps);

		// set Main sound
		comps.soundBut = Manager.i.game.add.sprite(0, 0, "menu_circle");
		comps.soundImage = Manager.i.game.add.sprite(0, 0, "sound");
		this.setSoundParams(comps);

		// set Main skins
		comps.skinsBut = Manager.i.game.add.sprite(0, 0, "menu_circle");
		comps.skinsImage = Manager.i.game.add.sprite(0, 0, "skins");
		this.setSkinsParams(comps);

		// handle click on main page
		comps.mainView.events.onInputUp.add(this.viewMainTouch, this);
		
		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.mainView.beginFill(0x1D1F26);
		comps.mainView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.mainView.endFill();
		comps.mainView.inputEnabled = true;
	},

	setTitleParams: function(comps){
		// set title coordinates
		comps.titleText1.x = ((Manager.i.game.width - comps.titleText1.width) / 2);
		comps.titleText1.y = (Manager.i.game.height / 4) - Manager.i.sizeManager.getTopTitleText();
		comps.titleText1.tint = 0xE91574;

		comps.titleText2.x = ((Manager.i.game.width - comps.titleText2.width) / 2);
		comps.titleText2.y = (Manager.i.game.height / 4) + (20 * Manager.i.sizeManager.scaleX);
		comps.titleText2.tint = 0x3A86DB;
	},

	setTotalScore: function(){
		var comps = this.components;
		
		comps.totalText.setText(Lang.i.getWord("mainTotal") + " " + Manager.i.getShortScore(Score.i.totalScore));
		// set total score coordinates
		comps.totalText.x = (Manager.i.game.width - comps.totalText.width) / 2;
		comps.totalText.y = (80 * Manager.i.sizeManager.scaleX);
	},

	setStartParams: function(comps){
		// set start coordinates and sizes
		comps.startBut.scale.setTo(SizeManager.i.scaleX *  1.35, SizeManager.i.scaleX *  1.25);
		comps.startBut.x = ((Manager.i.game.width - comps.startBut.width) / 2);
		comps.startBut.y = (Manager.i.game.height / 2) + (60 * Manager.i.sizeManager.scaleX);
		comps.startBut.tint = 0xE91574;

		comps.startText.x = ((Manager.i.game.width - comps.startText.width) / 2) - 2;
		comps.startText.y = comps.startBut.y + ((comps.startBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	setRateParams: function(comps){
		// set rate coordinates and sizes
		comps.rateBut.scale.setTo(SizeManager.i.scaleX *  1.35, SizeManager.i.scaleX * 1.25);
		comps.rateBut.x = ((Manager.i.game.width - comps.rateBut.width) / 2);
		comps.rateBut.y = (Manager.i.game.height / 2) + comps.startBut.height + (125 * Manager.i.sizeManager.scaleX);
		comps.rateBut.tint = 0x3A86DB;

		comps.rateText.x = ((Manager.i.game.width - comps.rateText.width) / 2) - 2;
		comps.rateText.y = comps.rateBut.y + ((comps.rateBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	setSoundParams: function(comps){
		// set sound coordinates and sizes
		comps.soundBut.scale.setTo(SizeManager.i.scaleX * 1.4, SizeManager.i.scaleX * 1.4);
		comps.soundBut.x = (Manager.i.game.width / 2) - comps.soundBut.width - (40 * Manager.i.sizeManager.scaleX);
		comps.soundBut.y = (Manager.i.game.height / 2) + (2 * comps.startBut.height) + (200 * Manager.i.sizeManager.scaleX);

		comps.soundImage.scale.setTo(SizeManager.i.scaleX * 1.4, SizeManager.i.scaleX * 1.4);
		comps.soundImage.x = comps.soundBut.x + ((comps.soundBut.width - comps.soundImage.width) / 2);
		comps.soundImage.y = comps.soundBut.y + ((comps.soundBut.height - comps.soundImage.height) / 2);

		// set right color in depend of sound
		if(SoundManager.i.sound){
			comps.soundBut.tint = 0x49E625;
			comps.soundImage.tint = 0xFFFFFF;
		}else{
			comps.soundBut.tint = 0xBBBBBB;
			comps.soundImage.tint = 0xBBBBBB;
		}
	},

	setSkinsParams: function(comps){
		// set skins coordinates and sizes
		comps.skinsBut.scale.setTo(SizeManager.i.scaleX * 1.4, SizeManager.i.scaleX * 1.4);
		comps.skinsBut.x = (Manager.i.game.width / 2) + (40 * Manager.i.sizeManager.scaleX);
		comps.skinsBut.y = (Manager.i.game.height / 2) + (2 * comps.startBut.height) + (200 * Manager.i.sizeManager.scaleX);
		comps.skinsBut.tint = 0x1BEEDD;

		comps.skinsImage.scale.setTo(SizeManager.i.scaleX * 1.4, SizeManager.i.scaleX * 1.4);
		comps.skinsImage.x = comps.skinsBut.x + ((comps.skinsBut.width - comps.skinsImage.width) / 2);
		comps.skinsImage.y = comps.skinsBut.y + ((comps.skinsBut.height - comps.skinsImage.height) / 2);
	},

	viewMainTouch: function(view, event){
		var clickedPoint = Manager.i.isClicked(event, [{name: "start", entity: this.components.startBut, type: Constant.GRAPHICS_TYPE},
													   {name: "rate", entity: this.components.rateBut, type: Constant.GRAPHICS_TYPE},
													   {name: "sound", entity: this.components.soundBut, type: Constant.GRAPHICS_TYPE},
													   {name: "skins", entity: this.components.skinsBut, type: Constant.GRAPHICS_TYPE}]);

		switch(clickedPoint){
			case "start":
				// hide main page and begin game
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_MAIN);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_GAME);
				NavigationManager.i.click();
				break;
			case "rate":
				NavigationManager.i.click();
				// rate the app
				// show rate
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						Cocoon.App.openURL("https://play.google.com/store/apps/details?id=" + Constant.APP_PACKAGE);
						break;
					case Constant.IOS_DEVICE:
						Cocoon.App.openURL("https://itunes.apple.com/app/" + Constant.APP_STRING_IOS_NAME + "/" + Constant.APP_STRING_IOS_ID);
						break;
				}
				break;
			case "sound":
				NavigationManager.i.click();
				// turn on or turn off sound
				if(SoundManager.i.sound){
					this.components.soundBut.tint = 0xBBBBBB;
					this.components.soundImage.tint = 0xBBBBBB;
				}else{
					this.components.soundBut.tint = 0x49E625;
					this.components.soundImage.tint = 0xFFFFFF;
				}
				SoundManager.i.changeSound();
				break;
			case "skins":
				NavigationManager.i.click();
				// hide main page and show skins page
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_MAIN);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_SKINS);
				break;
			default:
				break;
		}
	},

	show: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = true;
				this.components[prop].visible = true;
				Manager.i.game.world.bringToTop(this.components[prop]);
			}
		}
		// set current total score on Main page
		this.setTotalScore();
	},

	hide: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = false;
				this.components[prop].visible = false;
			}
		}
	},

	setComponents: function(components){
		this.components = components;
	},

	getComponents: function(){
		return this.components;
	},

	getTitle: function(){
		return this.components.titleText;
	}

},{
	MENU_CIRCLE: "res/images/menu_circle.png",
	MENU_OVAL: "res/images/menu_oval.png",
	SOUND_IMAGE: "res/images/sound.png",
	SKINS_IMAGE: "res/images/skins.png",
	ROBOTO_FONT_IMAGE: "res/fonts/Roboto.png",
	ROBOTO_FONT_MAP: "res/fonts/Roboto.fnt",
	NORWESTER_FONT_IMAGE: "res/fonts/Norwester.png",
	NORWESTER_FONT_MAP: "res/fonts/Norwester.fnt"
});