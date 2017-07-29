var BonusManager = Base.extend({

	bonuses: null,
	gamePage: null,
	collisionGroup: null,
	padding: null,
	width: null,
	emitter: null,
	emitTimer: null,

	constructor: function(gamePage){
		this.gamePage = gamePage;

	},

	preload: function(){
		Manager.i.game.load.spritesheet('bonus',  BonusManager.SPRITE_IMAGE, 89, 85);
		Manager.i.game.load.image('small_ball',  BonusManager.SMALL_SPRITE_IMAGE);
		SoundManager.i.quietSoundLoad('hit_bonus', BonusManager.HIT_SOUND, true);
	},

	add: function(){
		this.collisionGroup = Manager.i.game.physics.p2.createCollisionGroup();
	},

	create: function(){
		this.bonuses = Manager.i.game.add.group();
		//this.bonuses.enableBody = true;
   		//this.bonuses.physicsBodyType = Phaser.Physics.P2JS;
   		this.curCount = 0;

   		this.emitter = Manager.i.game.add.emitter(Manager.i.game.world.centerX, Manager.i.game.world.centerY, 100);
		this.emitter.makeParticles('small_ball');
		this.emitter.setRotation(0, 45);
    	this.emitter.setScale(1, 2, 1, 2);
    	this.emitter.setXSpeed(-250, 250)
    	this.emitter.setYSpeed(-250, 250)
    	this.emitter.start(false, 200, 5);
    	this.emitter.on = false;
    },

	recreate: function(){
		this.curCount = 0;
	},

	addRow: function(places, count){
		var l = this.bonuses.length;
		var s = Helper.i.getBoxWidth();
		var padding = Helper.i.getPadding();
		var y = s/2 + padding + this.gamePage.topBar.entity.height;
		var places = this.getExceptPlaces(places, count, s);
		for(var i=0; i<count; i++){
			var b = this.bonuses.create(places[i], y, 'bonus');
			Manager.i.game.physics.p2.enable(b, false);
			b.animations.add("fall", [0, 1], false);
			b.name = "bonus";
	        b.anchor.setTo(0.5);
	        b.scale.setTo(this.gamePage.ballsManager.fakeBall.entity.scale.y);
			
	        b.body.setRectangle(b.width, b.height);
	        //b.body.bounce.set(1);
	        b.body.damping = 0;
            b.body.angularDamping = 0;
            b.body.angle = 45;
            b.body.setCollisionGroup(this.collisionGroup);
            b.fixedRotation = true;
	        //b.body.collideWorldBounds = true;
	        b.body.static = true;
	        //b.body.collides([this.gamePage.ballsManager.collisionGroup]);
	        b.body.collides(this.gamePage.ballsManager.collisionGroup);
       		//b.checkWorldBounds = true;
	        //b.events.onOutOfBounds.add(this.out, this);
	        b.logic = {type:"bonus", id: l, hit: this.hit, self: this, waitTouch: true};
	        l++;
		}
		
		this.curCount += count;
		this.slideAll();
	},

	hit: function(bonus, self){
		if(bonus.sprite.logic.waitTouch){
			SoundManager.i.play("hit_bonus");
			self.emitter.emitX = bonus.sprite.x;
    		self.emitter.emitY = bonus.sprite.y;
    		self.emitter.on = true;

    		if(self.emitTimer){
				self.emitTimer.timer.remove(self.emitTimer);
				self.emitTimer = null;
			}
			self.emitTimer = Manager.i.game.time.events.add(200, function(){
				self.emitter.on = false;
				self.emitTimer = null;
			}, self);

			bonus.sprite.bringToTop();
			bonus.sprite.logic.waitTouch = false;
			bonus.setCircle(self.gamePage.ballsManager.fakeBall.entity.height/2);
			//console.log("callapse bonus");
			bonus.angle = 0;
			bonus.sprite.animations.play("fall");
			
			bonus.clearCollision(true);
			bonus.static = false;
			bonus.removeCollisionGroup(self.gamePage.ballsManager.collisionGroup);
			var y = Manager.i.game.height - (self.gamePage.ballsManager.fakeBall.entity.height/2 + self.gamePage.bottomBar.entity.height);
			var tween = Manager.i.game.add.tween(bonus).to( {y: y}, 500, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();
			//bonus.allowGravity = true;
			//bonus.velocity.y = 1000;
			//bonus.gravity = 1000;
			self.gamePage.ballsManager.bonusWaitUp();
			
		}
		
	},

	goAllTo: function(x, y){
		for(var i=0; i<this.bonuses.length; i++){
			var b = this.bonuses.getChildAt(i);
			if(!b.logic.waitTouch){
				var tween = Manager.i.game.add.tween(b.body).to( {y: y, x:x}, 300, Phaser.Easing.Linear.None, true);
				tween.onComplete.addOnce(function(body, tween, bns){
					
					//console.log(bns);
					this.curCount--;
					bns.destroy();
				}, this, 0, b);
			}
		}
	},

	clearLower: function(y){
		for(var i=0; i<this.bonuses.length; i++){
			var b = this.bonuses.getChildAt(i);
			if(b.height/2 + b.y > y){
				b.destroy();
			}
		}
	},

	out: function(bonus){
		console.log("out before = " + this.bonuses.length);
		console.log(arguments);
		bonus.destroy();
		console.log("out after = " + this.bonuses.length);
	},

	slideAll: function(){
		for(var i=0; i<this.bonuses.length; i++){
			var b = this.bonuses.getChildAt(i);
			var padding = Helper.i.getPadding();
			var y = b.y + padding + Helper.i.getBoxWidth();
			
			var tween = Manager.i.game.add.tween(b.body).to( {y: y}, 200, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();

		}
	},

	getExceptPlaces: function(except, count, width){
		var half = width / 2;
		var places = new Array();
		var padding = Helper.i.getPadding();
		var excludes = new Array();
		var cnt = 0;
		while(true){
			var p = Helper.i.randomInteger(0, BoxesManager.MAX_IN_ROW-1)
			if(excludes.indexOf(p) === -1 && except.indexOf(p) === -1){
				excludes.push(p);
				places.push(padding + padding*p + p * width + half);
			}

			cnt++;
			if(cnt >= 1000 || places.length >= count){
				break;
			}
		}
		//console.log(places);
		return places;
	},

	removeAll: function(){
		while(this.bonuses.length > 0){
			var member = this.bonuses.getChildAt(0);
			member.destroy();
		}
		this.emitter.on = false;
	},

	//sprite.body.blocked.down

	update: function(){
		//console.log("update");
		/*for(var i=0; i<this.bonuses.length; i++){
			var b = this.bonuses.getChildAt(i);
			
		}*/
	},

	show: function(){
		this.bonuses.exists = true;
        this.bonuses.visible = true;
	},

	hide: function(){
		this.bonuses.exists = false;
        this.bonuses.visible = false;
	},

	getBonuses: function(){
		return this.bonuses;
	}


},{
	SPRITE_IMAGE: "res/images/bonus.png",
	VELOCITY: 2000,
	MAX_IN_ROW: 7,
	SMALL_SPRITE_IMAGE: "res/images/small_ball.png",
	HIT_SOUND: "res/sounds/hit_bonus.ogg"
});