var Score = Base.extend({

	entity: null,
	curScore: null,
	roundManager: null,
	
	constructor: function(roundManager){
		this.curScore = 0;
		this.roundManager = roundManager;
	},

	preload: function(){
		
	},

	create: function(){
		this.entity = Manager.i.game.add.bitmapText(0, 0, "Neuropol", "", Manager.i.sizeManager.getPointText());
		this.entity.text = this.curScore;
		this.entity.x = Manager.i.game.width - this.entity.width - (35 * Manager.i.sizeManager.scaleX);
		this.entity.y = 42 * Manager.i.sizeManager.scaleY;
		this.entity.anchor.set(1, 0);

		this.hide();
	},

	update: function(){
		
	},

	show: function(){
		this.entity.exists = true;
        this.entity.visible = true;
	},

	hide: function(){
		this.entity.exists = false;
        this.entity.visible = false;
	},

	up: function(up){
		this.curScore += up;
		this.entity.text = this.curScore;
	},

	resetCurScore: function(){
		this.curScore = 0;
		this.entity.text = this.curScore;
	}
});