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

		console.log(this.curWidth + " " + this.curHeight);

		this.scaleX = this.curWidth / this.targetWidth;
		this.scaleY = this.curHeight / this.targetHeight;
	},

	create: function(){

	},

	// get size of title on view pages
	getTopTitleText: function(){
		var def = 140;
		return parseInt(def * this.scaleX);
	},

	// get size of title on view pages
	getTitleText: function(){
		var def = 125;
		return parseInt(def * this.scaleX);
	},

	// get size of select menu
	getPointText: function(){
		var def = 66;
		return parseInt(def * this.scaleX);
	},

	// get size of mini text on game over page
	getMiniText: function(){
		var def = 45;
		return parseInt(def * this.scaleX);
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
	TARGET_GAME_WIDTH: 1080,
	TARGET_GAME_HEIGHT: 1920
});

