var SizeManager = Base.extend({

	targetWidth: null,
	targetHeight: null,
	curWidth: null,
	curHeight: null,
	scaleX: null,
	scaleY: null,

	constructor: function(){
		SizeManager.i = this;
		this.targetWidth = SizeManager.TARGET_GAME_WIDTH;
		this.targetHeight = SizeManager.TARGET_GAME_HEIGHT;

		this.curWidth = window.innerWidth;
		this.curHeight = window.innerHeight;

		//console.log("w0 = " + this.curWidth + " h = " + this.curHeight + " " + window.devicePixelRatio);

		this.scaleX = this.curWidth / this.targetWidth;
		this.scaleY = this.curHeight / this.targetHeight;
	},

	create: function(){
		//console.log("w1 = " + this.curWidth + " h = " + this.curHeight + " " + window.devicePixelRatio);
		//console.log(this.scaleX + " " + this.scaleY);
	},	

	// get size of title on view pages
	getTitleText: function(){
		var def = 65;
		return def * this.scaleX;
	},

	// get size of point and added texts on view pages
	getPointText: function(){
		var def = 55;
		return def * this.scaleX;
	},

	// get size of result text on game over page
	getResultText: function(){
		var def = 65;
		return def * this.scaleX;
	},

	// get size of words on keyboard
	getKeyboardSize: function(){
		var def = 78;
		return parseInt(this.scaleX * def, 10);
	},

	// get size of shockwave but on keyboard
	getShockWaveSize: function(){
		var def = 42;
		return parseInt(this.scaleX * def, 10);
	},

	// get size of word of enemy on game
	getEnemyWordsSize: function(){
		var def = 40;
		return parseInt(this.scaleX * def, 10);
	},

	getSpeed: function(type){
		var def = 0;
		switch(type){
			case EnemyManager.ENEMY_MICRO_TYPE:
				def = 78;
				break;
			case EnemyManager.ENEMY_SMALL_TYPE:
				def = 75;
				break;
			case EnemyManager.ENEMY_MIDDLE_TYPE:
				def = 54;
				break;
			case EnemyManager.ENEMY_BIG_TYPE:
				def = 48;
				break;
		}
		//console.log("s = " + this.scaleY + " " + def);
		return parseInt(this.scaleY * def, 10);
	},

	getBulletSpeed: function(){
		var def = 2750;
		return parseInt(this.scaleY * def, 10);
	},

	getHitArea: function(){
		var def = 50;
		return parseInt(this.scaleY * def, 10);
	},

	overlapAreaShip: function(){
		var def = 30;
		return parseInt(this.scaleY * def, 10);
	},
	
	setTargetWidth: function(targetWidth){
		this.targetWidth = targetWidth;
	},

	getTargetWidth: function(){
		return this.targetWidth;
	},

	setTargetHeight: function(targetHeight){
		this.targetHeight = targetHeight;
	},

	getTargetHeight: function(){
		return this.targetHeight;
	},

	setCurWidth: function(curWidth){
		this.curWidth = curWidth;
	},

	getCurWidth: function(){
		return this.curWidth;
	},

	setCurHeight: function(curHeight){
		this.curHeight = curHeight;
	},

	getCurHeight: function(){
		return this.curHeight;
	}
},{
	i: null,
	TARGET_GAME_WIDTH: 981,
	TARGET_GAME_HEIGHT: 1572
});

