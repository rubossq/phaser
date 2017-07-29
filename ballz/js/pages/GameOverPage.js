var GameOverPage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {gameOverView: null, titleText: null, scoreNum: null, bestNum: null, bestText: null, totalNum: null,  totalText: null,
							restartBut: null, restartText: null, menuBut: null, menuText: null, rateBut: null, rateText: null};
	},

	preload: function(){
	
	},

	create: function(){
		var comps = this.components;

		// set Game Over view
		comps.gameOverView = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Game Over title
		comps.titleText =  Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("gameOverTitle"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set Game Over scores
		comps.scoreNum =  Manager.i.game.add.bitmapText(0, 0, "Roboto", "0", Manager.i.sizeManager.getTitleText());

		comps.bestText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("gameOverBest"), Manager.i.sizeManager.getMiniText());
		comps.bestNum = Manager.i.game.add.bitmapText(0, 0, "Roboto", "0", Manager.i.sizeManager.getPointText());
		
		comps.totalText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("gameOverTotal"), Manager.i.sizeManager.getMiniText());
		comps.totalNum = Manager.i.game.add.bitmapText(0, 0, "Roboto", "0", Manager.i.sizeManager.getPointText());

		// set Game Over restart
		comps.restartBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.restartText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("gameOverRestart"), Manager.i.sizeManager.getPointText());
		this.setRestartParams(comps);

		// set Game Over menu
		comps.menuBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.menuText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("gameOverMenu"), Manager.i.sizeManager.getPointText());
		this.setMenuParams(comps);

		// set Game Over rate
		comps.rateBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.rateText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("gameOverRate"), Manager.i.sizeManager.getPointText());
		this.setRateParams(comps);

		// handle click on game over page
		comps.gameOverView.events.onInputUp.add(this.viewGameOverTouch, this);

		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.gameOverView.beginFill(0x20232D);
		comps.gameOverView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.gameOverView.endFill();
		comps.gameOverView.inputEnabled = true;
	},

	setTitleParams: function(comps){
		// set title coordinates
		comps.titleText.x = (Manager.i.game.width - comps.titleText.width) / 2;
		comps.titleText.y = (Manager.i.game.height / 4) - (2 * Manager.i.sizeManager.getTitleText()) - (40 * Manager.i.sizeManager.scaleX);
	},

	setScores: function(){
		var comps = this.components;

		comps.scoreNum.setText(ScreenManager.i.gamePage.score.curScore);
		comps.bestNum.setText(ScreenManager.i.gamePage.score.bestScore);
		comps.totalNum.setText(Manager.i.getShortScore(Score.i.totalScore));
		
		// set current score coordinates
		comps.scoreNum.x = (Manager.i.game.width - comps.scoreNum.width) / 2;
		comps.scoreNum.y = (Manager.i.game.height / 4) - Manager.i.sizeManager.getTitleText() - (40 * Manager.i.sizeManager.scaleX);
		// set best score coordinates
		comps.bestText.x = (Manager.i.game.width / 4) - (comps.bestText.width / 2);
		comps.bestText.y = (3 * (Manager.i.game.height / 8)) - Manager.i.sizeManager.getMiniText() - (20 * Manager.i.sizeManager.scaleX);
		comps.bestText.tint = 0x3C4150;
		comps.bestNum.x = (Manager.i.game.width / 4) - (comps.bestNum.width / 2);
		comps.bestNum.y = (3 * (Manager.i.game.height / 8));
		// set best total coordinates
		comps.totalText.x = (3 * (Manager.i.game.width / 4)) - (comps.totalText.width / 2);
		comps.totalText.y = (3 * (Manager.i.game.height / 8)) - Manager.i.sizeManager.getMiniText() - (20 * Manager.i.sizeManager.scaleX);
		comps.totalText.tint = 0x3C4150;
		comps.totalNum.x = (3 * (Manager.i.game.width / 4)) - (comps.totalNum.width / 2);
		comps.totalNum.y = (3 * (Manager.i.game.height / 8));
	},

	setRestartParams: function(comps){
		// set restart coordinates and sizes
		comps.restartBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.restartBut.x = ((Manager.i.game.width - comps.restartBut.width) / 2);
		comps.restartBut.y = (Manager.i.game.height / 2);
		comps.restartBut.tint = 0xE91574;

		comps.restartText.x = ((Manager.i.game.width - comps.restartText.width) / 2) - 2;
		comps.restartText.y = comps.restartBut.y + ((comps.restartBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	setMenuParams: function(comps){
		// set menu coordinates and sizes
		comps.menuBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.menuBut.x = ((Manager.i.game.width - comps.menuBut.width) / 2);
		comps.menuBut.y = (Manager.i.game.height / 2) + comps.menuBut.height + (65 * Manager.i.sizeManager.scaleX);
		comps.menuBut.tint = 0x2EB03A;

		comps.menuText.x = ((Manager.i.game.width - comps.menuText.width) / 2) - 2;
		comps.menuText.y = comps.menuBut.y + ((comps.menuBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	setRateParams: function(comps){
		// set rate coordinates and sizes
		comps.rateBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.rateBut.x = ((Manager.i.game.width - comps.rateBut.width) / 2);
		comps.rateBut.y = (Manager.i.game.height / 2) + (2 * comps.rateBut.height) + (130 * Manager.i.sizeManager.scaleX);
		comps.rateBut.tint = 0x7E2FC9;

		comps.rateText.x = ((Manager.i.game.width - comps.rateText.width) / 2) - 2;
		comps.rateText.y = comps.rateBut.y + ((comps.rateBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	viewGameOverTouch: function(view, event){
		var clickedPoint = Manager.i.isClicked(event, [{name: "restart", entity: this.components.restartBut, type: Constant.GRAPHICS_TYPE},
													   {name: "menu", entity: this.components.menuBut, type: Constant.GRAPHICS_TYPE},
													   {name: "rate", entity: this.components.rateBut, type: Constant.GRAPHICS_TYPE}]);

		switch(clickedPoint){
			case "restart":
				// restart the game
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME_OVER);
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_GAME);
				break;
			case "menu":
				// hide gameover page and show manu page
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME_OVER);
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_MAIN);
				break;
			case "rate":
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
		// set all user's scores
		this.setScores();
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
});