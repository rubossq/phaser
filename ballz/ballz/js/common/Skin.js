var Skin = Base.extend({

	entity: null,
	info: null,

	constructor: function(skinManager, info){
		this.info = info;
		this.skinManager = skinManager;
	},

	preload: function(){
		
	},

	create: function(){
		this.entity = Manager.i.game.add.sprite(Manager.i.game.width / 2, Manager.i.game.height / 2, "ball");
		this.entity.scale.setTo(1.2 * SizeManager.i.scaleX, 1.2 * SizeManager.i.scaleX);
		this.entity.tint = this.info.tint;

		this.hide();
	},

	getColor: function(){
		return this.info.tint;
	},

	resetAvailable: function(score){
		if(score >= this.info.score){
			 this.info.available = true;
		}else{
			this.info.available = false;
		}
	},

	show: function(){
		this.entity.exists = true;
        this.entity.visible = true;
	},

	hide: function(){
		this.entity.exists = false;
        this.entity.visible = false;
	},

	getInfo: function(){
		return this.info;
	}
});