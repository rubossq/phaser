var Background = Base.extend({

	backgroundImage: null,		// background with stars
	cloud: null,				// moved cloud

	constructor: function(){
		
	},

	preload: function(){
		Manager.i.game.load.image('background', Background.BACKGROUD_IMAGE);
		Manager.i.game.load.image('cloud', Background.CLOUD);
	},

	create: function(){
		// set background image
		this.backgroundImage = Manager.i.game.add.sprite(0, 0, 'background');
		this.backgroundImage.width = Manager.i.game.width;
		this.backgroundImage.height = Manager.i.game.height;

		// set cloud
		this.cloud = Manager.i.game.add.tileSprite(0, 0, 0, 0, 'cloud');
		this.cloud.width = Manager.i.game.width;
		this.cloud.height = Manager.i.game.height;
		this.cloud.tileScale.setTo((Manager.i.game.width / Manager.i.game.cache.getImage('cloud').width), 
									(Manager.i.game.height / Manager.i.game.cache.getImage('cloud').height));
	},

	update: function(){
		// move cloud infinity
		this.cloud.tilePosition.y += 1.5;

		// set bg and cloud behind all
		this.cloud.sendToBack();
		this.backgroundImage.sendToBack();
	}
},{
	BACKGROUD_IMAGE: 'res/images/background.png',
	CLOUD: 'res/images/cloud.png',
});