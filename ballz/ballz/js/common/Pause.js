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
		this.entityImage.scale.setTo(SizeManager.i.scaleX * 1.4, SizeManager.i.scaleX * 1.4);
		this.entityImage.x = (55 * Manager.i.sizeManager.scaleX);
		this.entityImage.y = ((TopBar.BAR_HEIGHT - this.entityImage.height) / 2) + 2;

		// set pause field for click
		this.entity = Manager.i.game.add.graphics();
		this.entity.beginFill(0xFFFFFF, 0);
		this.entity.drawRect(0, 0, 1, 1);
		this.entity.endFill();
		this.entity.width = this.entityImage.width + (2 * this.entityImage.x);
		this.entity.height = this.entityImage.height + (2 * this.entityImage.y);

		this.entity.inputEnabled = true;
		this.entity.events.onInputDown.add(function(){
			NavigationManager.i.click();
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
	}
},{
	IMAGE: 'res/images/pause.png'
});