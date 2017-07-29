var Manager = Base.extend({

	state: null,
	game: null,
	roundManager: null,
	sizeManager: null,
	background: null,
	keyboard: null,
	ship: null,
	pause: null,
	enemyManager: null,
	roundManager: null,
	mainPage: null,
	pausePage: null,
	settingsPage: null,
	gameOverPage: null,
	screenManager: null,
	wave: null,
	sound: true,
	splash: null,

	constructor: function(){
		Manager.i = this;

	},

	onLoad: function(){
		
		new Lang();
		Manager.i.sizeManager = new SizeManager();
		Manager.i.background = new Background();
		Manager.i.splash = new Splash();
		Manager.i.mainPage = new MainPage();
		Manager.i.pausePage = new PausePage();
		Manager.i.settingsPage = new SettingsPage();
		Manager.i.gameOverPage = new GameOverPage();
		Manager.i.keyboard = new Keyboard(Manager.i);
		Manager.i.ship = new Ship(Manager.i);
		Manager.i.pause = new Pause(Manager.i);
		Manager.i.bulletManager = new BulletManager(Manager.i);
		Manager.i.enemyManager = new EnemyManager(Manager.i);
		Manager.i.roundManager = new RoundManager(Manager.i);
		Manager.i.screenManager = new ScreenManager();
		Manager.i.wave = new Wave(Manager.i);
		new AdManager();
		//Manager.i.init();
	},

	init: function(){
		//console.log("init");
		this.game = new Phaser.Game(this.sizeManager.curWidth, this.sizeManager.curHeight, Phaser.AUTO, 'star-type-go',
		 							{preload: this.preload, create: this.create, render: this.render,
		 							 update: this.update});
	},

	preload: function(game){

		this.game = game;

		console.log("preload");
		Manager.i.background.preload();
		Manager.i.pause.preload();
		Manager.i.ship.preload();
		Manager.i.bulletManager.preload();
		Manager.i.enemyManager.preload();
		Manager.i.roundManager.preload();
		Manager.i.keyboard.preload();
		Manager.i.mainPage.preload();
		Manager.i.settingsPage.preload();
		Manager.i.wave.preload();
		Manager.i.gameOverPage.preload();
	},

	create: function(){

		console.log("create");
		Manager.i.sizeManager.create();
		Manager.i.background.create();
		Manager.i.keyboard.create();
		Manager.i.ship.create();
		Manager.i.pause.create();
		Manager.i.bulletManager.create();
		Manager.i.enemyManager.create();
		Manager.i.roundManager.create();
		Manager.i.mainPage.create();
		Manager.i.pausePage.create();
		Manager.i.settingsPage.create();
		Manager.i.gameOverPage.create();
		Manager.i.wave.create();
		Manager.i.screenManager.create();

	},

	render: function(){
		
	},

	update: function(){
		Manager.i.background.update();
		Manager.i.bulletManager.update();
		Manager.i.enemyManager.update();
		Manager.i.ship.update();
	},

	showGameView: function(){
		Manager.i.pause.show();
		Manager.i.keyboard.show();
		Manager.i.keyboard.setWaveCount(Manager.i.wave.getWaveCount());
		Manager.i.roundManager.score.show();
		Manager.i.roundManager.restart();
	},

	hideGameView: function(){
		Manager.i.pause.hide();
		Manager.i.keyboard.hide();
		Manager.i.roundManager.score.hide();
		this.restartGame();
	},

	restartGame: function(){
		Manager.i.roundManager.restart();
		Manager.i.enemyManager.killAll();
		Manager.i.game.time.removeAll();
		Manager.i.game.tweens.removeAll();
		Manager.i.wave.restart();
		Manager.i.keyboard.setWaveCount(Manager.i.wave.getWaveCount());
	},

	isClicked: function(event, elems){
		for(var i = 0; i < elems.length; i++){
			var coords = getCoords(elems[i].entity);
			// check is clicked current element
			if(event.x >= coords.left && event.x <= coords.right && event.y >= coords.top && event.y <= coords.bottom){
				return elems[i].name;
			}
		}
		return false;

		// get coordinates of point elements
		function getCoords(elem){
			var left = (elem.x - (15 * Manager.i.sizeManager.scaleX));
			var right = (left + elem.width + (30 * Manager.i.sizeManager.scaleX));
			var top = (elem.y - (20 * Manager.i.sizeManager.scaleY));
			var bottom = (top + elem.fontSize + (40 * Manager.i.sizeManager.scaleY));

			return {left: left, right: right, top: top, bottom: bottom};
		}
	},

	soundChange: function(){
		this.sound = !this.sound;
	},
	
	setState: function(state){
		this.state = state;
	},

	getState: function(){
		return this.state;
	},

	setGame: function(game){
		this.game = game;
	},

	getGame: function(){
		return this.game;
	},

	setRoundManager: function(roundManager){
		this.roundManager = roundManager;
	},

	getRoundManager: function(){
		return this.roundManager;
	}
},{
	i: null
});

/*window.onload = function(){
	Manager.i.onLoad();
}*/

STG.Manager = function(game) {};
STG.Manager.prototype = {
	manager: new Manager(),
	preload: function() {
		this.manager.preload(this.game);
	},
	create: function() {
		this.manager.create();
	},
	update: function() {
		this.manager.update();
	}
};