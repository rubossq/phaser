var Bullet = Base.extend({

	entity: null,
	target: null,
	bulletManager: null,
	name: null,
	speed: null,
	hitArea: null,

	constructor: function(bulletManager, i){
		this.bulletManager = bulletManager;
		this.name = "bullet_"+i;
	},

	create: function(){
		this.speed = Manager.i.sizeManager.getBulletSpeed();
		this.hitArea = Manager.i.sizeManager.getHitArea();
		this.entity = this.bulletManager.bulletsGroup.create(0, 0, 'bullet');
        this.entity.name = this.name;
        this.entity.exists = false;
        this.entity.anchor.set(0.5);
        this.entity.visible = false;
        this.entity.checkWorldBounds = true;
        this.entity.events.onOutOfBounds.add(this.kill, this);
	},

	update: function(){
		if(this.target.exists){
			Manager.i.game.physics.arcade.moveToObject(this.entity, this.target, this.speed);
			this.entity.rotation = Manager.i.game.physics.arcade.angleBetween(this.entity, this.target);

			Manager.i.game.physics.arcade.overlap(this.entity, this.target, this.overlap, null, this);
	
		}else{
			this.kill();
		}
	},

	preload: function(){
		
	},

	reset: function(){
		this.entity.reset(Manager.i.ship.entity.x, Manager.i.ship.entity.y);
		this.target = null;
	},

	kill: function(){
		//console.log("bullet kill " + this.entity.name);
		this.target = null;
		this.entity.kill();
	},

	overlap: function(bullet, target){
		
		if(Math.abs(bullet.x - target.x) <= this.hitArea && Math.abs(bullet.y - target.y) <= this.hitArea){
			//console.log("bullet overlap " + this.entity.name + " target " +  target.name);
			Manager.i.enemyManager.hitReal(target);
			this.kill();
		}
		
	},
	
	setEntity: function(entity){
		this.entity = entity;
	},

	getEntity: function(){
		return this.entity;
	},

	setTarget: function(target){
		this.target = target;
	},

	getTarget: function(){
		return this.target;
	}
});