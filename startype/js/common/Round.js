var Round = Base.extend({

	entityWindow: null,		// round window
	entity: null,			// round text
	num: null,
	roundManager: null,
	
	constructor: function(roundManager){
		this.num = 0;
		this.roundManager = roundManager;
	},

	preload: function(){
		
	},

	create: function(){
		// set Round window
		this.entityWindow = Manager.i.game.add.sprite(0, 0, 'window_blue');
		this.entityWindow.width = Manager.i.game.width * 0.8;
		this.entityWindow.height = Manager.i.sizeManager.getPointText() + (79 * Manager.i.sizeManager.scaleY);
		this.entityWindow.x = (Manager.i.game.width - this.entityWindow.width) / 2;
		this.entityWindow.y = (Manager.i.game.height - this.entityWindow.height) / 2;
		this.entityWindow.alpha = 0;

		// set Round text
		this.entity = Manager.i.game.add.bitmapText(0, 0, "Neuropol", "", Manager.i.sizeManager.getPointText());
		this.entity.setText(Lang.i.getWord("roundNum") + this.num);
		this.entity.x = this.entityWindow.x + (26 * Manager.i.sizeManager.scaleX);
		this.entity.y = this.entityWindow.y + ((this.entityWindow.height - Manager.i.sizeManager.getPointText()) / 2);
		this.entity.alpha = 0;

		this.hide();
	},

	update: function(){
		
	},

	restart: function(){
		this.num = 0;

		this.hide();
	},

	up: function(){
		var self = this;
		this.show();

		this.num++;
		this.entity.setText(Lang.i.getWord("roundNum") + this.num);

		// show round info
		var windowTween = Manager.i.game.add.tween(this.entityWindow).to( { alpha: 1 }, 2000, Phaser.Easing.Exponential.Out, true);
		windowTween.onComplete.removeAll();
		var textTween = Manager.i.game.add.tween(this.entity).to( { alpha: 1 }, 2000, Phaser.Easing.Exponential.Out, true);
		textTween.onComplete.addOnce(function(){
			// hide round info
			var textTween = Manager.i.game.add.tween(self.entity).to( { alpha: 0 }, 2000, Phaser.Easing.Exponential.Out, true);
			var windowTween = Manager.i.game.add.tween(self.entityWindow).to( { alpha: 0 }, 2000, Phaser.Easing.Exponential.Out, true);
			textTween.onComplete.removeAll();
			windowTween.onComplete.addOnce(function(){
				self.hide();
			}, this);
		}, this);
	},

	show: function(){
		this.entityWindow.exists = true;
    	this.entityWindow.visible = true;

		this.entity.exists = true;
    	this.entity.visible = true;
	},

	hide: function(){
		this.entityWindow.exists = false;
    	this.entityWindow.visible = false;

		this.entity.exists = false;
    	this.entity.visible = false;
	},
	
	setEntity: function(entity){
		this.entity = entity;
	},

	getEntity: function(){
		return this.entity;
	},

	setNum: function(num){
		this.num = num;
	},

	getNum: function(){
		return this.num;
	}
});