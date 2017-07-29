var BottomBar = Base.extend({

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
		this.entity = Manager.i.game.add.graphics(-BottomBar.BAR_PADDING, Manager.i.game.height - BottomBar.BAR_HEIGHT);
		
		this.entity.beginFill(0x20232D);

		this.entity.drawRect(0, 0,
							 Manager.i.game.width + BottomBar.BAR_PADDING*2,
							 BottomBar.BAR_HEIGHT);

		this.entity.endFill();

		Manager.i.game.physics.p2.enable(this.entity, false);
		this.entity.body.setRectangle(Manager.i.game.width + BottomBar.BAR_PADDING*2,
										 BottomBar.BAR_HEIGHT, Manager.i.game.width/2 + BottomBar.BAR_PADDING,
										  BottomBar.BAR_HEIGHT/2);

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
		BottomBar.BAR_HEIGHT *= SizeManager.i.scaleY;
		BottomBar.BAR_PADDING *= SizeManager.i.scaleY;
	},

	hit: function(bar, ball){
		if(ball.sprite){
			if(ball.sprite.logic.alive){
				ball.sprite.logic.previousSide = "bottom_bar";
				this.gamePage.ballsManager.touchBottom(ball.sprite);
			}
		}
		
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
	BAR_HEIGHT: 40,
	BAR_PADDING: 20
});