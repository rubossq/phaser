var Pointer = Base.extend({

	entity: null,
	ballsManager: null,
	countText: null,
	fakeBall:null,
	gamePage: null,
	color: 0xFFFFFF,

	constructor: function(gamePage, ballsManager){
		this.ballsManager = this.ballsManager;
		this.fakeBall = new FakeBall(false);
		this.gamePage = gamePage;
	},

	preload: function(){
		
	},

	setColor: function(color){
		this.color = color;
		this.fakeBall.setColor(color);
	},

	create: function(){
		this.fakeBall.create();
		this.setSizes();
	},

	setSizes: function(){
		Pointer.LINE_WEIGHT *= SizeManager.i.scaleY;
		Pointer.BALL_OFFSET *= SizeManager.i.scaleY;
	},

	show: function(){
		
	},

	hide: function(){
		this.destroy();
		this.fakeBall.hide();
		
	},

	destroy: function(){
		if(this.entity){
			this.entity.destroy();
			this.entity = null;
		}
		this.fakeBall.hide();
	},

	draw: function(x1, y1, x2, y2){
		if(this.entity){
			this.destroy();
		}
		this.entity = Manager.i.game.add.graphics(x2, y2);

		var startX = 0;
		var startY = 0;

		this.entity.moveTo(startX, startY);
		
		this.entity.beginFill(this.color);
		this.entity.lineStyle(Pointer.LINE_WEIGHT, this.color, 1);
		var targetX = x1 - x2 + (x1 - x2) * 0.3;
		var targetY = y1 - y2 + (y1 - y2) * 0.3;
		this.entity.lineTo(targetX, targetY);
	    this.entity.endFill();

	    //var offset = - (Pointer.BALL_OFFSET + this.fakeBall.entity.height/2);
	    this.fakeBall.showTo(x2 + targetX, y2 + targetY);
	    this.gamePage.ballsManager.fakeBall.bringToTop();
	    this.fakeBall.bringToTop();
	},
},{
	LINE_WEIGHT: 7,
	BALL_OFFSET: 5
});