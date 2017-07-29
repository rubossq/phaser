var ScreenManager = Base.extend({

	mainPage: null,
	gamePage: null,
	gameOverPage: null,
	pausePage: null,
	skinsPage: null,
	splash: null,

	constructor: function(){
		ScreenManager.i = this;
		ScreenManager.i.mainPage = new MainPage();
		ScreenManager.i.gamePage = new GamePage();
		ScreenManager.i.gameOverPage = new GameOverPage();
		ScreenManager.i.pausePage = new PausePage();
		ScreenManager.i.skinsPage = new SkinsPage();
	},

	preload: function(){
		ScreenManager.i.mainPage.preload();
		ScreenManager.i.gamePage.preload();
		ScreenManager.i.gameOverPage.preload();
		ScreenManager.i.pausePage.preload();
		ScreenManager.i.skinsPage.preload();
		
		NavigationManager.i.preload();
	},

	create:function(){
		ScreenManager.i.gamePage.create();
		ScreenManager.i.mainPage.create();
		ScreenManager.i.gameOverPage.create();
		ScreenManager.i.pausePage.create();
		ScreenManager.i.skinsPage.create();
	},

	render: function(){
		ScreenManager.i.gamePage.render();
	},

	start: function(){
		console.log("screen manager start");
		ScreenManager.i.showScreen(ScreenManager.SCREEN_MAIN);
		
		Splash.i.hide();
	},

	showScreen: function(screen){
		switch(screen){
			case ScreenManager.SCREEN_MAIN:
				analytics.screenView("main");
				ScreenManager.i.mainPage.show();
				break;
			case ScreenManager.SCREEN_GAME:
				analytics.screenView("game");
				ScreenManager.i.gamePage.showGameView();
				break;
			case ScreenManager.SCREEN_GAME_OVER:
				analytics.screenView("game_over");
				ScreenManager.i.gameOverPage.show();
				break;
			case ScreenManager.SCREEN_PAUSE:
				analytics.screenView("pause");
				ScreenManager.i.pausePage.show();
				break
			case ScreenManager.SCREEN_SKINS:
				analytics.screenView("skins");
				ScreenManager.i.skinsPage.show();
				break;
		}
	},

	hideScreen: function(screen){
		switch(screen){
			case ScreenManager.SCREEN_MAIN:
				ScreenManager.i.mainPage.hide();
				break;
			case ScreenManager.SCREEN_GAME:
				ScreenManager.i.gamePage.hideGameView();
				break;
			case ScreenManager.SCREEN_GAME_OVER:
				ScreenManager.i.gameOverPage.hide();
				break;
			case ScreenManager.SCREEN_PAUSE:
				ScreenManager.i.pausePage.hide();
				break;
			case ScreenManager.SCREEN_SKINS:
				ScreenManager.i.skinsPage.hide();
				break;
		}
	},

	update: function(){
		ScreenManager.i.gamePage.update();
	}
},{
	i: null,
	SCREEN_MAIN: 1,
	SCREEN_GAME: 2,
	SCREEN_GAME_OVER: 3,
	SCREEN_PAUSE: 4,
	SCREEN_SKINS: 5
});
