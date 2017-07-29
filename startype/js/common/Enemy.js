var Enemy = Base.extend({

	entity: null,
	type: null,
	word: null,
	isTarget: null,
	enemyManager: null,
	type: null,
	speedY:null,
	explosion: null,
	hitSound: null,
	alias: null,
	animationHit: null,
	animationBlow: null,
	animationJump: null,
	prepared:false,
	speedY: null,
	action: null,
	clone: false,
	alive: false,
	blowAlias: null,
	overlapArea: null,
	info: null,
	ready: false,
	
	constructor: function(enemyManager, type){
		this.enemyManager = enemyManager;
		this.type = type;
		this.action = new Action(this.type);
	},

	create: function(i){
		var info = this.enemyManager.getInfoByType(this.type);
		//console.log("sprite = "  + info.sprite);
		this.alias = info.sprite;
		this.blowAlias = info.blow;
		this.entity = Manager.i.game.add.sprite(this.randomInteger(0, Manager.i.game.width), 0, info.sprite);
		this.entity.animations.add(info.sprite);
		this.entity.animations.add(EnemyManager.RADAR_ANIMATION_ALIAS);
		this.info = info;

		this.speedY = info.speedY;
		this.entity.name = "enemy_"+i;
        this.entity.exists = false;
        this.entity.anchor.set(0.5);
        //this.entity.scale.setTo(0.5, 0.5);
        this.entity.visible = false;
        this.entity.checkWorldBounds = true;
        this.entity.events.onOutOfBounds.add(this.kill, this);
       
        Manager.i.game.physics.arcade.enable(this.entity);

        this.word = new Word(this);
        this.word.create();

        //this.explosion = Manager.i.game.add.audio(info.explodeAudio);
        //this.hitSound = Manager.i.game.add.audio(info.hitAudio);

        this.animationHit = Manager.i.game.add.sprite(this.entity.x, -1000, EnemyManager.HIT_ANIMATION_ALIAS);
    	this.animationHit.animations.add(EnemyManager.HIT_ANIMATION_ALIAS);
    	this.animationHit.anchor.set(0.5);

    	//this.animationHit.scale.setTo(0.5, 0.5);
    	this.animationHit.rotation = this.randomInteger(0,360);
    	var ah = this.animationHit.animations.play(EnemyManager.HIT_ANIMATION_ALIAS, 30, false, true);
		//ah.onComplete.removeAll(this);

		this.animationBlow = Manager.i.game.add.sprite(this.entity.x, -1000, this.blowAlias);
    	this.animationBlow.animations.add(this.blowAlias);
    	this.animationBlow.anchor.set(0.5);
    	//this.animationBlow.scale.setTo(0.5, 0.5);
    	this.animationBlow.rotation = this.randomInteger(0,360);
    	var ab = this.animationBlow.animations.play(this.blowAlias, 30, false, true);
    	//ab.onComplete.removeAll(this);

    	this.animationJump = Manager.i.game.add.sprite(this.entity.x, -1000, EnemyManager.JUMP_ANIMATION_ALIAS);
    	this.animationJump.animations.add(EnemyManager.JUMP_ANIMATION_ALIAS);
    	this.animationJump.anchor.set(0.5);
    	//this.animationJump.scale.setTo(0.25, 0.25);
    	var ab = this.animationJump.animations.play(EnemyManager.JUMP_ANIMATION_ALIAS, 30, false, true);
    	//ab.onComplete.removeAll(this);

    	this.action.create(this.entity);

    	this.setSizes();
	},


	loadMedia: function(url){
		  var my_media = new Media(cordova.file.applicationDirectory + 'www/' + url,
	        // success callback
	        function () {
	            console.log("playAudio():Audio Success");
	        },
	        // error callback
	        function (err) {
	            console.log("playAudio():Audio Error: " + err);
	        }
	    );
	    // Play audio
	    return my_media;
	},

	setSizes: function(){
		var scaleX = Manager.i.sizeManager.scaleX;
		var scaleY = Manager.i.sizeManager.scaleY;
		this.entity.scale.setTo(scaleX * 0.8, scaleY * 0.8);
		this.animationHit.scale.setTo(scaleX, scaleY);
		this.animationBlow.scale.setTo(scaleX, scaleY);
		this.animationJump.scale.setTo(scaleX * 0.5, scaleY * 0.5);
		this.overlapArea = Manager.i.sizeManager.overlapAreaShip();
	},

	release: function(){
		
		var x = this.randomInteger(this.entity.width/2, Manager.i.game.width - this.entity.width) ;
		var y = -this.entity.height/2;
		
		this.releaseDefault(x, y, true);

		var tween = Manager.i.game.add.tween(this.entity).to( { y: this.entity.height/2 }, this.randomInteger(100, 500), Phaser.Easing.Exponential.Out, true);
		tween.onComplete.removeAll();
		this.jump(this.entity.height/2);

		this.action.release();
		this.clone = false;
	},

	releaseDefault: function(x, y, needX){
		this.entity.reset(x, y);
		var speeds = this.getSpeeds(needX);
		this.entity.body.velocity.y = speeds.speedY;
		
		this.entity.body.velocity.x = speeds.speedX;
		this.entity.angle = 90;
		this.word.setText(Manager.i.roundManager.getRandWord(this.type));
		//console.log("word /"+this.word.entity.text+"/ " + this.entity.name);
		this.isTarget = false;
		this.word.release();
		this.entity.frame = 0;
		this.prepared = false;
		this.ready = true;
		//this.entity.sendToBack();
		this.alive = true;

		if(this.type == EnemyManager.ENEMY_MIDDLE_TYPE || this.type == EnemyManager.ENEMY_BIG_TYPE){
			this.entity.bringToTop();
			this.word.entity.bringToTop();
		}
	},

	releaseFrom: function(x, y){
		this.releaseDefault(x, y, false);
		this.clone = true;
		this.prepared = true;
	},

	releaseFromCount: function(x, y, num, count){
		this.releaseDefault(x, y, false);
		this.clone = true;

		this.getRoundMovement(num, count);
	},

	getRoundMovement: function(num, count){
		var middle = Math.ceil(count/2);
		var grades = count - middle;
		var gradeSpeed = this.speedY / grades;
		
		var speed = (num - middle) * gradeSpeed;
		this.entity.body.velocity.x = speed;
		
		var diff = Math.abs(num - middle);

		var step = diff * this.entity.height/2;

		this.entity.y -= step;

	},

	getSpeeds: function(needX){
		

		//var speedY = parseInt(Math.round(Math.random()) ? this.speexY + this.speexY * 0.1 : this.speexY - this.speexY * 0.1, 10);
		var speedY = this.speedY;
		var speedX = 0;
		var wayY =  (Manager.i.ship.entity.y - Manager.i.ship.entity.height) - (this.entity.y + this.entity.height);
		
		var timeY = wayY / speedY;

		var dealTime = this.randomInteger(15,80)/100 * timeY;
		var left = timeY - dealTime;
		
		//console.log("dealTime = " + dealTime);
		if(needX){
			Manager.i.game.time.events.add(dealTime*1000, this.setSpeedX, this, left);	
		}else{
			speedX = this.randomInteger(-speedY, speedY);
		}
		
		
		return {speedX: speedX, speedY: speedY};
	},

	jump: function(y){
		//console.log("jump");
		this.animationJump.reset(this.entity.x, (this.animationJump.height/4) * 0.25);
		this.animationJump.animations.play(EnemyManager.JUMP_ANIMATION_ALIAS, 30, false, true);
	},

	setSpeedX: function(left){
		//var targetX = Manager.i.ship.entity.x;
		//var wayX =  targetX - (this.entity.x);
		//var speedX = parseInt(wayX / left, 10);
		//this.entity.body.velocity.x = speedX;
		this.radar();
		this.prepared = true;
	},

	radar: function(){
		//this.entity.animations.play(EnemyManager.RADAR_ANIMATION_ALIAS, 30);
	},

	update: function(){
		if(this.entity.visible){
			this.word.update();

			Manager.i.game.physics.arcade.overlap(this.entity, Manager.i.ship.entity, this.overlap, null, this);
			Manager.i.game.physics.arcade.overlap(this.entity, Manager.i.wave.entity, this.overlapBlow, null, this);
			

			if(this.entity.y + this.entity.height/2 < Manager.i.ship.entity.y - Manager.i.ship.entity.height/2 && this.prepared){
				Manager.i.game.physics.arcade.moveToObject(this.entity, Manager.i.ship.entity, this.speedY);
				var rotation = Manager.i.game.physics.arcade.angleBetween(this.entity,  Manager.i.ship.entity);
					
				var diff = ((this.entity.rotation - rotation) * 180) / Math.PI;
				if(diff != 0){
					
					if(Math.abs(diff) >= 5){
						var tween = Manager.i.game.add.tween(this.entity).to( { rotation: rotation }, 500, Phaser.Easing.Exponential.Out, true);
						tween.onComplete.removeAll();
						////console.log("animate rotation");
					}else{
						////console.log("simple rotation");
						this.entity.rotation = rotation;
					}
					
				}else{
					////console.log("no diff");
				}
				
			}

			if(this.isTarget){
				this.entity.bringToTop();
			}

			if(this.type == EnemyManager.ENEMY_MICRO_TYPE){
				if(this.entity.y - this.entity.height / 2 > Manager.i.game.height - Manager.i.keyboard.height){
					//console.log("kill abroad");
					this.kill();
				}
			}
		}
		
		
	},

	overlap: function(enemy, ship){
		
		if(Math.abs(enemy.x - ship.x) <= this.overlapArea && Math.abs(enemy.y - ship.y) <= this.overlapArea){
			Manager.i.roundManager.lose();
		}
		
	},

	overlapBlow: function(enemy, wave){
		//console.log("overlapBlow");
		//if(Math.abs((enemy.y+enemy.height/2) - (wave.y - wave.height/2)) <= this.overlapArea){
			if(this.alive){
				this.blow();
				this.alive = false;
				Manager.i.roundManager.killedCount(this.type);
			}
		//}
		
	},

	kick: function(){
		var returnX = this.entity.body.velocity.x / 10;
		var returnY = this.entity.body.velocity.y / 10;
		var toY = this.entity.y - returnY;
		var toX = this.entity.x - returnX;
		var tween = Manager.i.game.add.tween(this.entity).to( { y: toY, x: toX }, 300, Phaser.Easing.Linear.None, true);
		tween.onComplete.removeAll();
		this.animationHit.reset(this.entity.x, this.entity.y);
		this.animationHit.animations.play(EnemyManager.HIT_ANIMATION_ALIAS, 30, false, true);
	},

	randomInteger: function(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	},

	kill: function(){
		this.entity.kill();
		this.word.kill();
		//console.log("in enemy kill");
		this.action.kill();
		this.alive = false;
		this.ready = false;
		if(this.isTarget){
			Manager.i.ship.release();
		}
	},

	blow: function(){
		//console.log("in enemy blow");
		if(Manager.i.sound){
			//this.explosion.play();
			SoundManager.i.play(this.info.explodeAudio);
		}
		this.entity.animations.play(this.alias, 60);
		//console.log("in enemy blow 2");
		
		var t = Manager.i.game.time.events.add(100, this.realBlow, this);
		//console.log(t);
	},

	realBlow: function(){
		//console.log("in enemy realBlow");
		this.animationBlow.reset(this.entity.x, this.entity.y);
    	this.animationBlow.animations.play(this.blowAlias, 30, false, true);
    	this.kill();
	},

	hit: function(){
		//console.log("hit " + this.entity.name);
		if(this.word.hit() <= 0){
			this.isTarget = false;
			Manager.i.ship.release();
			this.word.hide();
		}
		//console.log("lefthit "+this.word.getHealth()+" " + this.entity.name);
	},

	hitReal: function(){
		//console.log("hit real " + this.entity.name);
		this.kick();
		if(this.word.realHit() <= 0){
			this.blow();
			this.alive = false;
			Manager.i.roundManager.killedCount(this.type);
		}else{
			if(Manager.i.sound){
				SoundManager.i.play(this.info.hitAudio);
				//this.hitSound.play();
			}
		}
		//console.log("leftrealhit "+this.word.getRealHealth()+" " + this.entity.name);
	},

	health: function(){
		
	},

	firstLetter: function(){
		return this.word.firstLetter();
	},
	
	setEntity: function(entity){
		this.entity = entity;
	},

	getEntity: function(){
		return this.entity;
	},

	setType: function(type){
		this.type = type;
	},

	getType: function(){
		return this.type;
	},

	setWord: function(word){
		this.word = word;
	},

	getWord: function(){
		return this.word;
	},

	setIsTarget: function(isTarget){
		this.isTarget = isTarget;
		this.word.setIsTarget(isTarget);
		this.radar();
		this.prepared = true;
	},

	getIsTarget: function(){
		return this.isTarget;
	}
}, {
	
});