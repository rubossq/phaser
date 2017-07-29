var Wave = Base.extend({

	entity: null,
	blowSound: null,
	waveCount: 0,
	
	constructor: function(manager){
		this.manager = manager;
	},

	update: function(){
		
	},

	preload: function(){
		//Manager.i.game.load.atlasJSONHash(Wave.BLOW_WAVE_ANIMATION_ALIAS, Wave.BLOW_WAVE_ANIMATION_IMAGE, Wave.BLOW_WAVE_ANIMATION_MAP);
		Manager.i.game.load.image(Wave.BLOW_WAVE_ANIMATION_ALIAS,  Wave.BLOW_WAVE_ANIMATION_IMAGE);
		//this.manager.game.load.audio(Wave.BLOW_AUDIO, Wave.BLOW_SOUND);
		SoundManager.i.quietSoundLoad(Wave.BLOW_AUDIO, Wave.BLOW_SOUND[0], true);
	},

	create: function(){
		this.entity = this.manager.game.add.sprite(this.manager.game.width / 2, this.manager.game.height, Wave.BLOW_WAVE_ANIMATION_ALIAS);
		this.entity.anchor.set(0.5);
		this.manager.game.physics.arcade.enable(this.entity);
       
        this.blowSound = Manager.i.game.add.audio(Wave.BLOW_AUDIO);
        this.entity.scale.setTo(0, 0);
        this.waveCount = Wave.MAX_WAVE_COUNT;
	},

	restart: function(){
		this.waveCount = Wave.MAX_WAVE_COUNT;
	},

	blow: function(callback){
		if(this.waveCount > 0){
			this.entity.x = Manager.i.ship.entity.x;
			this.entity.y = Manager.i.ship.entity.y;
			if(Manager.i.sound){
				//this.blowSound.play();
				SoundManager.i.play(Wave.BLOW_AUDIO);
			}
			this.show();

			var tween = Manager.i.game.add.tween(this.entity.scale).to( { x: 4, y: 4 }, 1000, Phaser.Easing.Linear.None, true);
			tween.onComplete.addOnce(this.animHide, this);
			var tweenRotate = Manager.i.game.add.tween(this.entity).to( { angle: this.entity.angle + 180}, 1000, Phaser.Easing.Linear.None, true);
			tweenRotate.onComplete.addOnce(this.antiRotate, this);
			
			//this.entity.animations.play(Ship.BLOW_SHIP_ANIMATION_ALIAS, 30);
			this.waveCount--;
			callback();
		}
		
	},

	getWaveCount: function(){
		return this.waveCount;
	},

	animHide: function(){
		var tween = Manager.i.game.add.tween(this.entity.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Linear.None, true);
		tween.onComplete.removeAll();
	},

	antiRotate: function(){
		var tween = Manager.i.game.add.tween(this.entity).to( { angle: this.entity.angle - 90 }, 500, Phaser.Easing.Linear.None, true);
		var self = this;
		tween.onComplete.addOnce(function(){
			self.hide();
		}, this);
	},

	show: function(){
		this.entity.exists = true;
        this.entity.visible = true;
	},

	hide: function(){
		this.entity.exists = false;
        this.entity.visible = false;
	}
}, {
	MAX_WAVE_COUNT: 3,
	BLOW_AUDIO: "blow_wave",
	BLOW_SOUND: ["res/sounds/wave.ogg", "res/sounds/wave.mp3"],

	BLOW_WAVE_ANIMATION_ALIAS: 'wave',
	BLOW_WAVE_ANIMATION_IMAGE: 'res/animations/images/wave.png',
});