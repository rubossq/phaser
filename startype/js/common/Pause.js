var Pause = Base.extend({

	entityImage: null,
	entity: null,

	constructor: function(){
		
	},

	update: function(){
		
	},

	preload: function(){
		Manager.i.game.load.image('pause', Pause.IMAGE);
	},

	create: function(){
		// set pause image
		this.entityImage = Manager.i.game.add.sprite(0, 0, 'pause');
		this.entityImage.x = (48 * Manager.i.sizeManager.scaleX);
		this.entityImage.y = (47 * Manager.i.sizeManager.scaleY);
		this.entityImage.width = (28 * Manager.i.sizeManager.scaleX);
		this.entityImage.height = (32 * Manager.i.sizeManager.scaleY);

		// set pause field for click
		this.entity = Manager.i.game.add.graphics();
		this.entity.beginFill(0xFFFFFF, 0);
		this.entity.drawRect(0, 0, 1, 1);
		this.entity.endFill();
		this.entity.width = this.entityImage.width + (48 * 2 * Manager.i.sizeManager.scaleX);
		this.entity.height = this.entityImage.height + (47 * 2 * Manager.i.sizeManager.scaleY);

		this.entity.inputEnabled = true;
		this.entity.events.onInputDown.add(function(){
			Manager.i.game.paused = true;
			Manager.i.screenManager.showScreen(ScreenManager.SCREEN_PAUSE);
		}, this);

		
		this.hide();
	},

	show: function(){
		this.entity.exists = true;
    	this.entity.visible = true;

    	this.entityImage.exists = true;
    	this.entityImage.visible = true;
	},

	hide: function(){
		this.entity.exists = false;
    	this.entity.visible = false;

    	this.entityImage.exists = false;
    	this.entityImage.visible = false;
	},

	setEntity: function(entity){
		this.entity = entity;
	},

	getEntity: function(){
		return this.entity;
	},

	setEntityImage: function(entityImage){
		this.entityImage = entityImage;
	},

	getEntityImage: function(){
		return this.entityImage;
	}
},{
	IMAGE: 'res/images/pause.png'
});