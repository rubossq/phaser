var Splash = Base.extend({

	backgroundImage: null,		// background with stars
	game: null,

	constructor: function(){
		Splash.i = this;
	},

	preload: function(game){
		console.log("splash preload");
		Splash.i.game = game;
		Splash.i.game.load.image('splash', Splash.SPLASH_IMAGE);
	},

	create: function(){
		// set background image
		console.log("splash create");
		Splash.i.backgroundImage = Splash.i.game.add.sprite(0, 0, 'splash');
		Splash.i.backgroundImage.width = Splash.i.game.width;
		Splash.i.backgroundImage.height = Splash.i.game.height;
		Manager.i.preload(Splash.i.game);
		setTimeout(function(){
			Splash.i.game.state.start('Manager', false);
		}, 2500);
	},

	hide: function(){
		Splash.i.backgroundImage.visible = false;
		Splash.i.backgroundImage.exists = false;
	}
	
},{
	SPLASH_IMAGE: 'res/images/splash.png',
	i: null
});

STG.Splash = function(game) {};
STG.Splash.prototype = {
	splash: new Splash(),
	preload: function() {
		this.splash.preload(this.game);
	},
	create: function() {
		this.splash.create();	
	}
};