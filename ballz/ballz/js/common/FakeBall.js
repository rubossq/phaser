var FakeBall = Base.extend({

	entity: null,
	countText: null,
	textMode: true,
	color: 0xFFFFFF,

	constructor: function(textMode){
		this.textMode = textMode;
	},

	preload: function(){
		
	},

	create: function(){
		this.entity = Manager.i.game.add.sprite(Manager.i.game.width/2, Manager.i.game.height/2, "ball");
		this.setSizes();
		this.entity.anchor.setTo(0.5);

		if(this.textMode){
			this.countText = Manager.i.game.add.text(this.entity.x, this.entity.y, "x1", {fill:"#FFFFFF", fontSize: FakeBall.TEXT_SIZE});
			this.countText.anchor.setTo(0.5);
		}
		
		this.hide();
	},

	setSizes: function(){
		FakeBall.COUNT_TEXT_OFFSET *= SizeManager.i.scaleX;
		FakeBall.TEXT_SIZE = parseInt(FakeBall.TEXT_SIZE * SizeManager.i.scaleX, 10);
		this.entity.scale.setTo(1.1 * SizeManager.i.scaleX);
	},

	update: function(){
		
	},

	show: function(){
		this.entity.exists = true;
        this.entity.visible = true;

        if(this.textMode){
        	this.countText.exists = true;
        	this.countText.visible = true;
      	}
	},

	setColor: function(color){
		this.color = color;
		this.entity.tint = this.color;
	},

	getColor: function(){
		return this.color;
	},

	scale: function(scale){
		this.entity.scale.setTo(scale);
	},	

	setCount: function(cnt){
		this.countText.text = "x"+cnt;
	},

	showTo: function(x, y){
		this.entity.x = x;
		this.entity.y = y;

		if(this.textMode){
			if(x > Manager.i.game.width/2){
				this.countText.x = this.entity.x - this.countText.width;
			}else{
				this.countText.x = this.entity.x + this.countText.width;
			}
			
			this.countText.y = this.entity.y - (this.entity.height/2 + FakeBall.COUNT_TEXT_OFFSET);
		}

		this.show();
	},

	bringToTop: function(){
		this.entity.bringToTop();
	},

	hide: function(){
		this.entity.exists = false;
        this.entity.visible = false;
        if(this.textMode){
       		this.countText.exists = false;
        	this.countText.visible = false;
        }
	},

	isGood: function(){
		return Conveyor.GOOD_TYPES.indexOf(this.type) == -1;
	}
},{
	COUNT_TEXT_OFFSET: 20,
	TEXT_SIZE: 45
});