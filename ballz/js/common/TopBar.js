var TopBar = Base.extend({

	entity: null,
	collisionGroup: null,
	gamePage: null,

	constructor: function(gamePage){
		this.gamePage = gamePage;
	},

	preload: function(){
		
	},

	add: function(){
		this.collisionGroup = Manager.i.game.physics.p2.createCollisionGroup();
	},

	create: function(){
		this.setSizes();
		
		// set pause field for click
		this.entity = Manager.i.game.add.graphics();
		this.entity.moveTo(0,0);
		this.entity.beginFill(0x20232D);
		this.entity.drawRect(-TopBar.BAR_PADDING, 0,
							 Manager.i.game.width + (TopBar.BAR_PADDING * 2),
							 TopBar.BAR_HEIGHT);
		this.entity.endFill();

		Manager.i.game.physics.p2.enable(this.entity, false);
		this.entity.body.setRectangle(Manager.i.game.width + TopBar.BAR_PADDING*2, TopBar.BAR_HEIGHT, Manager.i.game.width/2 + TopBar.BAR_PADDING, TopBar.BAR_HEIGHT/2);

		this.entity.body.damping = 0;
		this.entity.body.angularDamping = 0;
		this.entity.body.static = true;
		this.entity.body.allowGravity = false;
		this.entity.body.setCollisionGroup(this.collisionGroup);
		this.entity.body.collides(this.gamePage.ballsManager.collisionGroup, this.hit, this);

		this.hide();
	},

	update: function(){
		
	},

	setSizes: function(){
		TopBar.BAR_HEIGHT *= SizeManager.i.scaleX;
		TopBar.BAR_PADDING *= SizeManager.i.scaleX;
	},

	
	hit: function(bar, ball){
		ball.sprite.logic.previousSide = "top_bar";
	},

	show: function(){
		this.entity.exists = true;
    	this.entity.visible = true;
	},

	hide: function(){
		this.entity.exists = false;
    	this.entity.visible = false;
	}
},{
	BAR_HEIGHT: 140,
	BAR_PADDING: 20
});