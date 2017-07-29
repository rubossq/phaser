var PausePage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {pauseView: null, pauseWindow: null, titleText: null, resumeBut: null, resumeText: null,
							restartBut: null, restartText: null, menuBut: null, menuText: null, rateBut: null, rateText: null};
	},

	preload: function(){
		
	},

	create: function(){
		var comps = this.components;

		// set Pause view
		comps.pauseView = Manager.i.game.add.graphics();
		comps.pauseWindow = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Pause title
		comps.titleText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("pauseTitle"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set Pause resume
		comps.resumeBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.resumeText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("pauseResume"), Manager.i.sizeManager.getPointText());
		this.setResumeParams(comps);

		// set Pause restart
		comps.restartBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.restartText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("pauseRestart"), Manager.i.sizeManager.getPointText());
		this.setRestartParams(comps);

		// set Pause menu
		comps.menuBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.menuText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("pauseMenu"), Manager.i.sizeManager.getPointText());
		this.setMenuParams(comps);

		// set Pause rate
		comps.rateBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.rateText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("pauseRate"), Manager.i.sizeManager.getPointText());
		this.setRateParams(comps);

		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.pauseView.beginFill(0x000000, 0);
		comps.pauseView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.pauseView.endFill();
		comps.pauseView.inputEnabled = true;

		comps.pauseWindow.beginFill(0x20232D);
		comps.pauseWindow.drawRect(0, 0, 1, 1);
		comps.pauseWindow.endFill();
		comps.pauseWindow.width = Manager.i.game.width * 0.95;
		comps.pauseWindow.height = Manager.i.game.height * 0.8;
		comps.pauseWindow.x = (Manager.i.game.width - comps.pauseWindow.width) / 2;
		comps.pauseWindow.y = (Manager.i.game.height - comps.pauseWindow.height) / 2;
	},

	setTitleParams: function(comps){
		// set title coordinates
		comps.titleText.x = (Manager.i.game.width - comps.titleText.width) / 2;
		comps.titleText.y = comps.pauseWindow.y + (50 * Manager.i.sizeManager.scaleX);
	},

	setResumeParams: function(comps){
		// set resume coordinates and sizes
		comps.resumeBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.resumeBut.x = ((Manager.i.game.width - comps.resumeBut.width) / 2);
		comps.resumeBut.y = (comps.pauseWindow.y + comps.pauseWindow.height) - (4 * comps.resumeBut.height) - ((80 + 195) * Manager.i.sizeManager.scaleX);
		comps.resumeBut.tint = 0x3A86DB;

		comps.resumeText.x = ((Manager.i.game.width - comps.resumeText.width) / 2) - 2;
		comps.resumeText.y = comps.resumeBut.y + ((comps.resumeBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	setRestartParams: function(comps){
		// set resume coordinates and sizes
		comps.restartBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.restartBut.x = ((Manager.i.game.width - comps.restartBut.width) / 2);
		comps.restartBut.y = (comps.pauseWindow.y + comps.pauseWindow.height) - (3 * comps.resumeBut.height) - ((80 + 130) * Manager.i.sizeManager.scaleX);
		comps.restartBut.tint = 0xE91574;

		comps.restartText.x = ((Manager.i.game.width - comps.restartText.width) / 2) - 2;
		comps.restartText.y = comps.restartBut.y + ((comps.restartBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	setMenuParams: function(comps){
		// set resume coordinates and sizes
		comps.menuBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.menuBut.x = ((Manager.i.game.width - comps.menuBut.width) / 2);
		comps.menuBut.y = (comps.pauseWindow.y + comps.pauseWindow.height) - (2 * comps.resumeBut.height) - ((80 + 65) * Manager.i.sizeManager.scaleX);
		comps.menuBut.tint = 0x2EB03A;
		
		comps.menuText.x = ((Manager.i.game.width - comps.menuText.width) / 2) - 2;
		comps.menuText.y = comps.menuBut.y + ((comps.menuBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	setRateParams: function(comps){
		// set resume coordinates and sizes
		comps.rateBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.rateBut.x = ((Manager.i.game.width - comps.rateBut.width) / 2);
		comps.rateBut.y = (comps.pauseWindow.y + comps.pauseWindow.height) - comps.resumeBut.height - (80 * Manager.i.sizeManager.scaleX);
		comps.rateBut.tint = 0x7E2FC9;

		comps.rateText.x = ((Manager.i.game.width - comps.rateText.width) / 2) - 2;
		comps.rateText.y = comps.rateBut.y + ((comps.rateBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	viewPauseTouch: function(event){
		var clickedPoint = Manager.i.isClicked(event, [{name: "resume", entity: this.components.resumeBut, type: Constant.GRAPHICS_TYPE},
													   {name: "restart", entity: this.components.restartBut, type: Constant.GRAPHICS_TYPE},
													   {name: "menu", entity: this.components.menuBut, type: Constant.GRAPHICS_TYPE},
													   {name: "rate", entity: this.components.rateBut, type: Constant.GRAPHICS_TYPE}]);

		switch(clickedPoint){
			case "resume":
				NavigationManager.i.click();
				// continue game
				Manager.i.game.paused = false;
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_PAUSE);
				break;
			case "restart":
				NavigationManager.i.click();
				// switch off paused
				Manager.i.game.paused = false;
				// continue game
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_PAUSE);
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_GAME);
				break;
			case "menu":
				NavigationManager.i.click();
				// switch off paused
				Manager.i.game.paused = false;
				// continue game
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_PAUSE);
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_MAIN);
				break;
			case "rate":
				NavigationManager.i.click();
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
		// handle click on pause page
		Manager.i.game.input.onDown.add(this.viewPauseTouch, this);
	},

	hide: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = false;
				this.components[prop].visible = false;
			}
		}
		// unhandle click on pause page
		Manager.i.game.input.onDown.remove(this.viewPauseTouch, this);
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
	
});