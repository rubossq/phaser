var ScreenManager = Base.extend({

	constructor: function(manager){
		
	},

	create:function(){
		this.showScreen(ScreenManager.SCREEN_MAIN);
	},

	showScreen: function(screen){
		switch(screen){
			case ScreenManager.SCREEN_MAIN:
				Manager.i.ship.setMenuView();
				Manager.i.mainPage.show();
				Manager.i.splash.hide();
				break;
			case ScreenManager.SCREEN_GAME:
				Manager.i.ship.setGameView();
				Manager.i.showGameView();
				Manager.i.roundManager.nextRound();
				break;
			case ScreenManager.SCREEN_PAUSE:
				Manager.i.pausePage.show();
				break;
			case ScreenManager.SCREEN_SETTINGS:
				Manager.i.settingsPage.show();
				break;
			case ScreenManager.SCREEN_GAME_OVER:
				Manager.i.gameOverPage.show();
				break;
		}
	},

	hideScreen: function(screen){
		switch(screen){
			case ScreenManager.SCREEN_MAIN:
				Manager.i.mainPage.hide();
				break;
			case ScreenManager.SCREEN_GAME:
				//stop game
				Manager.i.hideGameView();
				break;
			case ScreenManager.SCREEN_PAUSE:
				Manager.i.pausePage.hide();
				break;
			case ScreenManager.SCREEN_SETTINGS:
				Manager.i.settingsPage.hide();
				break;
			case ScreenManager.SCREEN_GAME_OVER:
				Manager.i.gameOverPage.hide();
				break;
		}
	},

	preload: function(){
		
	},

	update: function(){

	}

},{
	SCREEN_MAIN: 1,
	SCREEN_GAME: 2,
	SCREEN_PAUSE: 3,
	SCREEN_SETTINGS: 4,
	SCREEN_GAME_OVER: 5
});