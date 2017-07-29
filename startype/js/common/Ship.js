var Ship = Base.extend({

	entity: null,
	target: null,
	bulletManager: null,
	manager: null,
	fireSound: null,
	missSound: null,
	blowSound: null,
	moveSound: null, 
	animationBlow: null,
	
	constructor: function(manager){
		this.manager = manager;
	},

	update: function(){
		if(this.target){
			var rotation = Manager.i.game.physics.arcade.angleBetween(this.entity, this.target);
				
			var diff = ((this.entity.rotation - rotation) * 180) / Math.PI;
			if(diff != 0){
				
				if(Math.abs(diff) >= 5){
					var tween = Manager.i.game.add.tween(this.entity).to( { rotation: rotation }, 50, Phaser.Easing.Exponential.Out, true);
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
	},

	preload: function(){
		Manager.i.game.load.atlasJSONHash(Ship.FIRE_SHIP_ANIMATION_ALIAS, Ship.FIRE_SHIP_ANIMATION_IMAGE, Ship.FIRE_SHIP_ANIMATION_MAP);
		Manager.i.game.load.atlasJSONHash(Ship.BLOW_SHIP_ANIMATION_ALIAS, Ship.BLOW_SHIP_ANIMATION_IMAGE, Ship.BLOW_SHIP_ANIMATION_MAP);
		//this.manager.game.load.audio('fire', Ship.FIRE_SOUND);
		//this.manager.game.load.audio('miss', Ship.MISS_SOUND);
		//this.manager.game.load.audio('blow_ship', Ship.BLOW_SOUND);
		//this.manager.game.load.audio('ship_move', Ship.MOVE_SOUND);

		SoundManager.i.quietSoundLoad('fire', Ship.FIRE_SOUND[0], true);
		SoundManager.i.quietSoundLoad('miss', Ship.MISS_SOUND[0], true);
		SoundManager.i.quietSoundLoad('blow_ship', Ship.BLOW_SOUND[0], true);
		SoundManager.i.quietSoundLoad('ship_move', Ship.MOVE_SOUND[0], true);
	},


	release: function(){
		this.target = null;
		this.show();
	},

	setForward: function(){
		var tween = Manager.i.game.add.tween(this.entity).to( { angle: -90 }, 1000, Phaser.Easing.Exponential.Out, true);
		tween.onComplete.removeAll();
	},

	create: function(){
		this.entity = this.manager.game.add.sprite(this.manager.game.width/2, this.manager.game.height, Ship.FIRE_SHIP_ANIMATION_ALIAS);
		this.entity.anchor.set(0.5);

		this.entity.animations.add(Ship.FIRE_SHIP_ANIMATION_ALIAS);
		this.manager.game.physics.arcade.enable(this.entity);

        //this.fireSound = Manager.i.game.add.audio("fire");
       // this.missSound = Manager.i.game.add.audio("miss");
        //this.blowSound = Manager.i.game.add.audio("blow_ship");
        //this.moveSound = Manager.i.game.add.audio("ship_move");

        this.entity.angle = -90;
        //this.entity.scale.setTo(0.5, 0.5);

        this.animationBlow = Manager.i.game.add.sprite(this.entity.x, -1000, Ship.BLOW_SHIP_ANIMATION_ALIAS);
    	this.animationBlow.animations.add(Ship.BLOW_SHIP_ANIMATION_ALIAS);
    	this.animationBlow.scale.setTo(0.5, 0.5);
    	this.animationBlow.anchor.set(0.465, 0.58);
    	var ab = this.animationBlow.animations.play(Ship.BLOW_SHIP_ANIMATION_ALIAS, 30, false, true);

        ////console.log("set rotation start " + this.entity.rotation);
        ////console.log("set angle start " + this.entity.angle);
        //this.setMenuView();

        this.setSizes();
	},

	setSizes: function(){
		var scaleX = Manager.i.sizeManager.scaleX;
		var scaleY = Manager.i.sizeManager.scaleY;
		this.entity.scale.setTo(scaleX+0.5, scaleY+0.5);
		//this.animationHit.scale.setTo(scaleX, scaleY);
		//this.animationBlow.scale.setTo(scaleX, scaleY);
		//this.animationJump.scale.setTo(scaleX * 0.5, scaleY * 0.5);
		//this.overlapArea = Manager.i.sizeManager.overlapAreaShip();
	},

	fire: function(){
		if(Manager.i.sound){
			//this.fireSound.play();
			SoundManager.i.play( 'fire' );
		}
		this.entity.animations.play(Ship.FIRE_SHIP_ANIMATION_ALIAS, 30);
	},

	miss: function(){
		if(Manager.i.sound){
			//this.missSound.play();
			SoundManager.i.play( 'miss' );
		}
		var self = this;
		this.entity.tint = 0xFFF000;

		Manager.i.game.time.events.add(100, function(){
			self.entity.tint = 0xFFFFFF; 
		}, this);

		
	},

	blow: function(){
		if(Manager.i.sound){
			//this.blowSound.play();
			SoundManager.i.play( 'blow_ship' );
		}
		this.animationBlow.reset(this.entity.x, this.entity.y);
    	var anim = this.animationBlow.animations.play(Ship.BLOW_SHIP_ANIMATION_ALIAS, 30, false, true);
    	var self = this;
    	anim.onComplete.addOnce(function(){
    		self.hide();
    	}, this);
    },

	setMenuView: function(){
		var txt = Manager.i.mainPage.getTitle();
		var oneWidth = txt.width / txt.text.length;
		var x = txt.x + oneWidth * 3 - 2;
		var y = txt.y + txt.height/2;
		var tween = Manager.i.game.add.tween(this.entity).to( {x:x,  y: y }, 1500, Phaser.Easing.Exponential.Out, true);
		tween.onComplete.removeAll();
		this.setForward();
		if(Manager.i.sound){
			//this.moveSound.play();
			SoundManager.i.play( 'ship_move' );
		}
	},

	setGameView: function(){
		var keyboardHeight = this.manager.keyboard.height;
		var x = this.manager.game.width/2;
		var tween = Manager.i.game.add.tween(this.entity).to( {x:x, y: this.manager.game.height - (keyboardHeight + this.entity.height/2) }, 1500, Phaser.Easing.Exponential.Out, true);
		tween.onComplete.removeAll();
		this.setForward();
		if(Manager.i.sound){
			//this.moveSound.play();
			SoundManager.i.play( 'ship_move' );
		}
	},

	setEntity: function(entity){
		this.entity = entity;
	},

	getEntity: function(){
		return this.entity;
	},

	show: function(){
		this.entity.exists = true;
        this.entity.visible = true;
	},

	hide: function(){
		this.entity.exists = false;
        this.entity.visible = false;
	},

	setTarget: function(target){
		this.target = target;
		var rotation = Manager.i.game.physics.arcade.angleBetween(this.entity, this.target);
		var tween = Manager.i.game.add.tween(this.entity).to( { rotation: rotation }, 50, Phaser.Easing.Exponential.Out, true);
		tween.onComplete.removeAll();
	},

	getTarget: function(){
		return this.target;
	},

	setBulletManager: function(bulletManager){
		this.bulletManager = bulletManager;
	},

	getBulletManager: function(){
		return this.bulletManager;
	},

	setManager: function(manager){
		this.manager = manager;
	},

	getManager: function(){
		return this.manager;
	}
}, {
	FIRE_SOUND: ["res/sounds/blaster.ogg", "res/sounds/blaster.mp3"],
	MISS_SOUND: ["res/sounds/miss.ogg", "res/sounds/miss.mp3"],
	BLOW_SOUND: ["res/sounds/explosion_ship.ogg", "res/sounds/explosion_ship.mp3"],
	MOVE_SOUND: ["res/sounds/ship_move.ogg", "res/sounds/ship_move.mp3"],

	FIRE_SHIP_ANIMATION_ALIAS: 'ship',
	FIRE_SHIP_ANIMATION_MAP: 'res/animations/map/ship.json',
	FIRE_SHIP_ANIMATION_IMAGE: 'res/animations/images/ship.png',

	MISS_SHIP_ANIMATION_ALIAS: 'ship_miss',
	MISS_SHIP_ANIMATION_MAP: 'res/animations/map/miss.json',
	MISS_SHIP_ANIMATION_IMAGE: 'res/animations/images/miss.png',

	BLOW_SHIP_ANIMATION_ALIAS: 'lose',
	BLOW_SHIP_ANIMATION_MAP: 'res/animations/map/lose.json',
	BLOW_SHIP_ANIMATION_IMAGE: 'res/animations/images/lose.png',
});