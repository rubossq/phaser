var BulletManager = Base.extend({

	bulletsGroup: null,
	manager: null,
	bulletTime: null, 
	bullets: null,

	constructor: function(manager){
		this.manager = manager;
		this.bullets = new Array();
	},

	preload: function(){
		//console.log("preload");
		this.manager.game.load.image('bullet', BulletManager.IMAGE);
	},

	update: function(){
		for(var i=0; i < this.bullets.length; i++){
			if(this.bullets[i].entity.exists){
				this.bullets[i].update();
			}
		}
	},

	create: function(){
		this.bulletsGroup = this.manager.game.add.group();
        this.bulletsGroup.enableBody = true;
        this.bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < BulletManager.BULLETS_LIMIT; i++)
        {
        	var bullet = new Bullet(this, i);
        	bullet.create();
            this.bullets.push(bullet);
        }
	},
	
    tryFireBullet: function(target){
    	//console.log("tryFireBullet " + target.name);
    	if (Manager.i.game.time.now >= this.bulletTime){
    		this.fireBullet(target);
    	}else{
    		//console.log("disrapt");
    	}
    },

    fireBullet: function(target) {
    	var bullet = this.bulletsGroup.getFirstExists(false);

		if (bullet){
		   
			for(var i=0; i < this.bullets.length; i++){
				if(this.bullets[i].name == bullet.name){
					//console.log("bul " + this.bullets[i].name);
					//console.log("bul target " + target.name);
					this.bullets[i].reset();
					this.bullets[i].setTarget(target);
					Manager.i.ship.fire();
					break;
				}
			}

		    this.bulletTime = Manager.i.game.time.now;
		}else{
			//console.log("no bullets");
		}

    },

	setBullets: function(bullets){
		this.bullets = bullets;
	},

	getBullets: function(){
		return this.bullets;
	},

	hideAll:function(){

	}
}, {
	BULLETS_LIMIT: 30,
	IMAGE: 'res/images/bullet.png'
});