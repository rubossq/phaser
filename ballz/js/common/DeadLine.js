var DeadLine = Base.extend({

	entity: null,
	deadPos: null,
	gamePage: null,
	color:  0xFFFFFF,

	constructor: function(gamePage){
		this.gamePage = gamePage;
	},

	preload: function(){
		
	},

	create: function(){
		var pos = this.getPos();
		
		this.entity = Manager.i.game.add.graphics(0, pos.posY);
		this.entity.moveTo(0, 0);
		this.entity.beginFill(this.color);
		this.entity.lineStyle(3, this.color, 1);
		this.entity.lineTo(Manager.i.game.width, 0);
	    this.entity.endFill();

	    this.deadPos = pos.posY;
		
	},

	getPos: function(){
		var s = Helper.i.getBoxWidth();
		var p = Helper.i.getPadding();
		var h = Manager.i.game.height;

		var cnt = parseInt(h / (s + p), 10);
		cnt -= 2;
		
		var posY = cnt * (s + p) + this.gamePage.topBar.entity.height;
		return {cnt: cnt, posY: posY};
	},

	setColor: function(color){
		this.color = color;
		if(this.entity){
			this.entity.destroy();
			this.entity = null;
		}
		var pos = this.getPos();
		this.entity = Manager.i.game.add.graphics(0, pos.posY);
		this.entity.moveTo(0, 0);
		this.entity.beginFill(this.color);
		this.entity.lineStyle(3, this.color, 1);
		this.entity.lineTo(Manager.i.game.width, 0);
	    this.entity.endFill();
	},

	show: function(){
		this.entity.exists = true;
        this.entity.visible = true;
	},

	hide: function(){
		this.entity.exists = false;
        this.entity.visible = false;
	},

	isDead: function(y){
		if(y > this.deadPos){
			return true;
		}

		return false;
	},

	getDeadPosY: function(){
		return this.deadPos;
	}

},{
	SPRITE_IMAGE: "res/images/bag.png",
	GOOD_SOUND: "res/sounds/good_bag.ogg",
	BAD_SOUND: "res/sounds/bad_bag.ogg",
});