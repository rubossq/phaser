var Manager = Base.extend({

	state: null,
	game: null,
	sizeManager: null,
	screenManager: null,

	constructor: function(){
		Manager.i = this;

	},

	onLoad: function(){
		
		new Lang();
		Manager.i.sizeManager = new SizeManager();
		Manager.i.screenManager = new ScreenManager();
		new AdManager();
	},

	init: function(){
	},

	preload: function(game){

		this.game = game;
		Manager.i.screenManager.preload();
		this.game.time.advancedTiming = true;
	},

	create: function(){
		this.game.stage.backgroundColor = "#1D1F26";

		Helper.i.setSizes();
		Manager.i.screenManager.create();

		Manager.i.screenManager.start();
	},

	render: function(){
		//Manager.i.screenManager.render();
		//console.log(this.game.time.fps);
	},

	update: function(){
		//Manager.i.game.physics.arcade.collide(ScreenManager.i.gamePage.ballsManager.balls, ScreenManager.i.gamePage.boxesManager.boxes, this.collide, null, this);
		//Manager.i.game.debug.body(ScreenManager.i.gamePage.ballsManager.balls);
    	//Manager.i.game.debug.body(ScreenManager.i.gamePage.boxesManager.boxes);
		Manager.i.screenManager.update();
	},
	
	restartGame: function(){
		
	},

	isClicked: function(event, elems){
		for(var i = 0; i < elems.length; i++){
			var coords = getCoords(elems[i].entity, elems[i].type);
			// check is clicked current element
			if(event.x >= coords.left && event.x <= coords.right && event.y >= coords.top && event.y <= coords.bottom){
				return elems[i].name;
			}
		}
		return false;

		// get coordinates of point elements
		function getCoords(elem, type){
			switch(type){
				case Constant.GRAPHICS_TYPE:
					var left = (elem.x - 15);
					var right = (left + elem.width + 30);
					var top = (elem.y - 20);
					var bottom = (top + elem.height + 40);
					break;
				case Constant.TEXT_TYPE:
					var left = (elem.x - 15);
					var right = (left + elem.width + 30);
					var top = (elem.y - 20);
					var bottom = (top + elem.fontSize + 40);
					break;
				default:
					break;
			}
			return {left: left, right: right, top: top, bottom: bottom};
		}
	},

	getShortScore: function(val){
		var k = Math.floor(val / 1000);
		var m = Math.floor(val / 1000000);
		var b = Math.floor(val / 1000000000);

		return b ? b+"B" : m ? m+"M" : k ? k+"K" : val;
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
	},

	render: function(){
		this.manager.render();
	}
};