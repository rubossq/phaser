var EnemyManager = Base.extend({

	enemies: null,
	manager:null,

	constructor: function(manager){
		this.manager = manager;
		this.enemies = new Array();

		this.enemies[EnemyManager.ENEMY_MICRO_TYPE] = new Array();
		this.enemies[EnemyManager.ENEMY_SMALL_TYPE] = new Array();
		this.enemies[EnemyManager.ENEMY_MIDDLE_TYPE] = new Array();
		this.enemies[EnemyManager.ENEMY_BIG_TYPE] = new Array();
	},
	
	preload: function(){
		//Manager.i.game.load.image(EnemyManager.SPRITE_SMALL, EnemyManager.IMAGE_SMALL);
		//Manager.i.game.load.image(EnemyManager.SPRITE_MIDDLE, EnemyManager.IMAGE_MIDDLE);
		//Manager.i.game.load.image(EnemyManager.SPRITE_BIG, EnemyManager.IMAGE_BIG);

		//Manager.i.game.load.audio(EnemyManager.AUDIO_MICRO, EnemyManager.EXPLOSION_MICRO);
		//Manager.i.game.load.audio(EnemyManager.AUDIO_SMALL, EnemyManager.EXPLOSION_SMALL);
		//Manager.i.game.load.audio(EnemyManager.AUDIO_MIDDLE, EnemyManager.EXPLOSION_MIDDLE);
		//Manager.i.game.load.audio(EnemyManager.AUDIO_BIG, EnemyManager.EXPLOSION_BIG);

		SoundManager.i.quietSoundLoad(EnemyManager.AUDIO_MICRO, EnemyManager.EXPLOSION_MICRO[0], true);
		SoundManager.i.quietSoundLoad(EnemyManager.AUDIO_SMALL, EnemyManager.EXPLOSION_SMALL[0], true);
		SoundManager.i.quietSoundLoad(EnemyManager.AUDIO_MIDDLE, EnemyManager.EXPLOSION_MIDDLE[0], true);
		SoundManager.i.quietSoundLoad(EnemyManager.AUDIO_BIG, EnemyManager.EXPLOSION_BIG[0], true);


		//Manager.i.game.load.audio(EnemyManager.HIT_SOUND_ALIAS, EnemyManager.HIT_SOUND);
		SoundManager.i.quietSoundLoad(EnemyManager.HIT_SOUND_ALIAS, EnemyManager.HIT_SOUND[0], true);

		Manager.i.game.load.atlasJSONHash(EnemyManager.HIT_ANIMATION_ALIAS, EnemyManager.HIT_ANIMATION_IMAGE, EnemyManager.HIT_ANIMATION_MAP);
		Manager.i.game.load.atlasJSONHash(EnemyManager.BLOW_ANIMATION_ALIAS, EnemyManager.BLOW_ANIMATION_IMAGE, EnemyManager.BLOW_ANIMATION_MAP);
		Manager.i.game.load.atlasJSONHash(EnemyManager.BIG_BLOW_ANIMATION_ALIAS, EnemyManager.BIG_BLOW_ANIMATION_IMAGE, EnemyManager.BIG_BLOW_ANIMATION_MAP);
		Manager.i.game.load.atlasJSONHash(EnemyManager.JUMP_ANIMATION_ALIAS, EnemyManager.JUMP_ANIMATION_IMAGE, EnemyManager.JUMP_ANIMATION_MAP);

		Manager.i.game.load.atlasJSONHash(EnemyManager.DESTROY_MICRO_ANIMATION_ALIAS, EnemyManager.DESTROY_MICRO_ANIMATION_IMAGE, EnemyManager.DESTROY_MICRO_ANIMATION_MAP);
		Manager.i.game.load.atlasJSONHash(EnemyManager.DESTROY_SMALL_ANIMATION_ALIAS, EnemyManager.DESTROY_SMALL_ANIMATION_IMAGE, EnemyManager.DESTROY_SMALL_ANIMATION_MAP);
		Manager.i.game.load.atlasJSONHash(EnemyManager.DESTROY_MIDDLE_ANIMATION_ALIAS, EnemyManager.DESTROY_MIDDLE_ANIMATION_IMAGE, EnemyManager.DESTROY_MIDDLE_ANIMATION_MAP);
		Manager.i.game.load.atlasJSONHash(EnemyManager.DESTROY_BIG_ANIMATION_ALIAS, EnemyManager.DESTROY_BIG_ANIMATION_IMAGE, EnemyManager.DESTROY_BIG_ANIMATION_MAP);


	},

	create: function(){
		console.log("enemy create");
		this.createEnemies(EnemyManager.ENEMY_MICRO_TYPE, EnemyManager.ENEMIES_COUNT_MICRO);
		this.createEnemies(EnemyManager.ENEMY_SMALL_TYPE, EnemyManager.ENEMIES_COUNT_SMALL);
		this.createEnemies(EnemyManager.ENEMY_MIDDLE_TYPE, EnemyManager.ENEMIES_COUNT_MIDDLE);
		this.createEnemies(EnemyManager.ENEMY_BIG_TYPE, EnemyManager.ENEMIES_COUNT_BIG);
	},

	update: function(){
		this.updateType(EnemyManager.ENEMY_MICRO_TYPE);
		this.updateType(EnemyManager.ENEMY_SMALL_TYPE);
		this.updateType(EnemyManager.ENEMY_MIDDLE_TYPE);
		this.updateType(EnemyManager.ENEMY_BIG_TYPE);
	},

	updateType: function(type){
		for(var i=0; i<this.enemies[type].length; i++){
			this.enemies[type][i].update();
		}
	},

	attack:function(smallCount, middleCount, bigCount, timeSmall, timeMiddle, timeBig){
		this.releaseEnemies(EnemyManager.ENEMY_SMALL_TYPE, smallCount, timeSmall);
		this.releaseEnemies(EnemyManager.ENEMY_MIDDLE_TYPE, middleCount, timeMiddle);
		this.releaseEnemies(EnemyManager.ENEMY_BIG_TYPE, bigCount, timeBig);
	},

	releaseEnemies: function(type, count, time){
		var released = 0;
		for(var i=0; i<this.enemies[type].length; i++){
			if(released == count){
				break;
			}
			if(!this.enemies[type][i].entity.visible && !this.enemies[type][i].ready){

				var rtime = (released+1) * time;
				if(type != EnemyManager.ENEMY_SMALL_TYPE){
					rtime = (released+1) * time;
				}
				//console.log("release after " + rtime);
				this.enemies[type][i].ready = true;
				Manager.i.game.time.events.add(rtime, this.delayRelease, this, this.enemies[type][i]);
				released++;	
			}		
		}
	},

	delayRelease: function(enemy){
		//console.log("release ");
		enemy.release();
	},

	releaseEnemiesFrom: function(type, count, time, x, y){
		var released = 0;
		for(var i=0; i<this.enemies[type].length; i++){
			if(released == count){
				break;
			}
			if(!this.enemies[type][i].entity.visible && !this.enemies[type][i].ready){
				this.enemies[type][i].ready = true;
				Manager.i.game.time.events.add(time, this.delayReleaseFrom, this, type, this.enemies[type][i], x, y, released+1, count);	
				released++;	
			}
		}
	},

	delayReleaseFrom: function(type, enemy, x, y, num, count){
		//console.log("delayReleaseFrom from " + num);
		if(type == EnemyManager.ENEMY_MICRO_TYPE){
			enemy.releaseFromCount(x, y, num, count);
		}else{
			enemy.releaseFrom(x, y);
		}
		
	},

	createEnemies: function(type, count){
		for(var i=0; i<count; i++){
			var enemy = new Enemy(this, type);
			enemy.create(type+"_"+i);
			this.enemies[type].push(enemy);
		}
	},

	killEnemies: function(type, isGameOver){
		for(var i=0; i<this.enemies[type].length; i++){
			if(this.enemies[type][i].alive && isGameOver){
				this.enemies[type][i].blow();
			}else{
				this.enemies[type][i].kill();
			}	
		}
	},

	killAll: function(isGameOver){
		this.killEnemies(EnemyManager.ENEMY_MICRO_TYPE, isGameOver);
		this.killEnemies(EnemyManager.ENEMY_SMALL_TYPE, isGameOver);
		this.killEnemies(EnemyManager.ENEMY_MIDDLE_TYPE, isGameOver);
		this.killEnemies(EnemyManager.ENEMY_BIG_TYPE, isGameOver);
	},

	hit: function(target){
		var enemy = this.getEnemyByEntityFull(target);
		if(enemy){
			enemy.hit();
		}else{
			//console.log("can not find to hit");
		}
	},

	hitReal: function(target){
		var enemy = this.getEnemyByEntityFull(target);
		if(enemy){
			enemy.hitReal();
		}else{
			//console.log("can not find to hit");
		}
	},

	getEnemyByEntityFull: function(target){
		var enemy = this.getEnemyByEntity(target, EnemyManager.ENEMY_MICRO_TYPE);
		if(!enemy){
			enemy = this.getEnemyByEntity(target, EnemyManager.ENEMY_SMALL_TYPE);
		}
		if(!enemy){
			enemy = this.getEnemyByEntity(target, EnemyManager.ENEMY_MIDDLE_TYPE);
		}
		if(!enemy){
			enemy = this.getEnemyByEntity(target, EnemyManager.ENEMY_BIG_TYPE);
		}
		return enemy;
	},

	getEnemyByEntity: function(target, type){
		for(var i=0; i<this.enemies[type].length; i++){
			
			if(target.name == this.enemies[type][i].entity.name){
				return this.enemies[type][i];
			}
		}
		return false;
	},

	tryFire: function(letter){
		if(Manager.i.ship.target){
			var enemy = this.getEnemyByEntityFull(Manager.i.ship.target);
			//console.log("target now is " + enemy.word.entity.text);
			//console.log(letter + " != " + enemy.firstLetter());
		
			if(enemy.firstLetter() == letter){
				//console.log("go hit 1 " + enemy.entity.name);
				enemy.hit();
			
				Manager.i.bulletManager.tryFireBullet(enemy.entity);
			}else{
				//console.log("no right letter");
				Manager.i.ship.miss();
			}
		}else{
			var fullArr = new Array();
			fullArr = fullArr.concat(this.findEnemy(letter, EnemyManager.ENEMY_MICRO_TYPE));
			fullArr = fullArr.concat(this.findEnemy(letter, EnemyManager.ENEMY_SMALL_TYPE));
			fullArr = fullArr.concat(this.findEnemy(letter, EnemyManager.ENEMY_MIDDLE_TYPE));
			fullArr = fullArr.concat(this.findEnemy(letter, EnemyManager.ENEMY_BIG_TYPE));
			

			if(fullArr.length > 0){
				var enemy = this.findLower(fullArr);
				//console.log("set target");
				enemy.setIsTarget(true);
				Manager.i.ship.setTarget(enemy.entity);
				//console.log("go hit 2" + enemy.entity.name);
				enemy.hit();
				Manager.i.bulletManager.tryFireBullet(enemy.entity);
			}else{
				Manager.i.ship.miss();
				//console.log("no enemy found");
			}
		}
		
	},

	findLower: function(arr){
		var enemy = arr[0];
		for(var i=0; i<arr.length; i++){
			if(enemy.entity.y + enemy.entity.height/2 < arr[i].entity.y + arr[i].entity.height/2){
				enemy = arr[i];
			}
		}
		return enemy;
	},

	findEnemy: function(letter, type){
		var enemies = new Array();
		for(var i=0; i<this.enemies[type].length; i++){
			//console.log(letter + " != " + this.enemies[type][i].firstLetter());
		
			if(letter == this.enemies[type][i].firstLetter() && this.enemies[type][i].entity.visible){
				enemies.push(this.enemies[type][i])
			}
		}
		return enemies;
	},

	noAlive: function(){
		//we do not count micro
		var liveSmall = this.getLive(EnemyManager.ENEMY_SMALL_TYPE);
		var liveMiddle = this.getLive(EnemyManager.ENEMY_MIDDLE_TYPE);
		var liveBig = this.getLive(EnemyManager.ENEMY_BIG_TYPE);

		if(liveSmall.length == 0 && liveMiddle.length == 0 && liveBig.length == 0){
			return true;
		} 

		return false;
	},

	getAllLive: function(){
		
		var liveSmall = this.getLive(EnemyManager.ENEMY_SMALL_TYPE);
		var liveMiddle = this.getLive(EnemyManager.ENEMY_MIDDLE_TYPE);
		var liveBig = this.getLive(EnemyManager.ENEMY_BIG_TYPE);

		var arr = liveSmall.concat(liveMiddle);
		arr = arr.concat(liveBig);

		return arr;
	},

	getLive: function(type){
		var arr = new Array();
		for(var i=0; i<this.enemies[type].length; i++){
			if(this.enemies[type][i].alive){
				arr.push(this.enemies[type][i]);
			}
		}
		return arr;
	},

	getInfoByType: function(type){
		var sprite = null;
		var speedY = Manager.i.sizeManager.getSpeed(type);
		var explodeAudio = null;
		var hitAudio = EnemyManager.HIT_SOUND_ALIAS;
		var blow = "";
		switch(type){
			case EnemyManager.ENEMY_MICRO_TYPE:
				sprite = EnemyManager.DESTROY_MICRO_ANIMATION_ALIAS;
				explodeAudio = EnemyManager.AUDIO_MICRO;
				blow = EnemyManager.BLOW_ANIMATION_ALIAS;
				break;
			case EnemyManager.ENEMY_SMALL_TYPE:
				sprite = EnemyManager.DESTROY_SMALL_ANIMATION_ALIAS;
				explodeAudio = EnemyManager.AUDIO_SMALL;
				blow = EnemyManager.BLOW_ANIMATION_ALIAS;
				break;
			case EnemyManager.ENEMY_MIDDLE_TYPE:
				sprite = EnemyManager.DESTROY_MIDDLE_ANIMATION_ALIAS;
				explodeAudio = EnemyManager.AUDIO_MIDDLE;
				blow = EnemyManager.BIG_BLOW_ANIMATION_ALIAS;
				break;
			case EnemyManager.ENEMY_BIG_TYPE:
				sprite = EnemyManager.DESTROY_BIG_ANIMATION_ALIAS;
				explodeAudio = EnemyManager.AUDIO_BIG;
				blow = EnemyManager.BIG_BLOW_ANIMATION_ALIAS;
				break;
		}

		console.log(type + " speedY " + speedY);

		return {sprite: sprite, speedY: speedY, explodeAudio: explodeAudio, hitAudio: hitAudio, blow: blow};
	}
},{
	IMAGE_SMALL: 'assets/sprites/shmup-ship.png',
	IMAGE_MIDDLE: 'assets/sprites/shmup-ship.png',
	IMAGE_BIG: 'assets/sprites/shmup-ship.png',

	EXPLOSION_MICRO: ['res/sounds/explosion_small.ogg', 'res/sounds/explosion_small.mp3'],
	EXPLOSION_SMALL: ['res/sounds/explosion_small.ogg', 'res/sounds/explosion_small.mp3'],
	EXPLOSION_MIDDLE: ['res/sounds/explosion_big.ogg', 'res/sounds/explosion_big.mp3'],
	EXPLOSION_BIG: ['res/sounds/explosion_big.ogg', 'res/sounds/explosion_big.mp3'],

	HIT_SOUND: ['res/sounds/hit.ogg', 'res/sounds/hit.mp3'],
	HIT_SOUND_ALIAS: 'hit',

	AUDIO_MICRO: 'blow_micro',
	AUDIO_SMALL: 'blow_small',
	AUDIO_MIDDLE: 'blow_middle',
	AUDIO_BIG: 'blow_bid',

	SPRITE_SMALL: 'enemy_small',
	SPRITE_MIDDLE: 'enemy_middle',
	SPRITE_BIG: 'enemy_bid',

	HIT_ANIMATION_ALIAS: 'hit_enemy',
	HIT_ANIMATION_MAP: 'res/animations/map/hit.json',
	HIT_ANIMATION_IMAGE: 'res/animations/images/hit.png',

	BLOW_ANIMATION_ALIAS: 'small_blow',
	BLOW_ANIMATION_MAP: 'res/animations/map/blow.json',
	BLOW_ANIMATION_IMAGE: 'res/animations/images/blow.png',

	BIG_BLOW_ANIMATION_ALIAS: 'big_blow',
	BIG_BLOW_ANIMATION_MAP: 'res/animations/map/big_blow.json',
	BIG_BLOW_ANIMATION_IMAGE: 'res/animations/images/big_blow.png',

	DESTROY_MICRO_ANIMATION_ALIAS: 'micro_enemy',
	DESTROY_MICRO_ANIMATION_IMAGE: 'res/animations/images/micro_enemy.png',
	DESTROY_MICRO_ANIMATION_MAP: 'res/animations/map/micro_enemy.json',

	DESTROY_SMALL_ANIMATION_ALIAS: 'small_enemy',
	DESTROY_SMALL_ANIMATION_IMAGE: 'res/animations/images/small_enemy.png',
	DESTROY_SMALL_ANIMATION_MAP: 'res/animations/map/small_enemy.json',

	DESTROY_MIDDLE_ANIMATION_ALIAS: 'middle_enemy',
	DESTROY_MIDDLE_ANIMATION_IMAGE: 'res/animations/images/middle_enemy.png',
	DESTROY_MIDDLE_ANIMATION_MAP: 'res/animations/map/middle_enemy.json',

	DESTROY_BIG_ANIMATION_ALIAS: 'big_enemy',
	DESTROY_BIG_ANIMATION_IMAGE: 'res/animations/images/big_enemy.png',
	DESTROY_BIG_ANIMATION_MAP: 'res/animations/map/big_enemy.json',

	RADAR_ANIMATION_ALIAS: 'radar_enemy',
	RADAR_ANIMATION_MAP: 'res/animations/map/blow.json',
	RADAR_ANIMATION_IMAGE: 'res/animations/images/blow.png',

	JUMP_ANIMATION_ALIAS: 'jump_enemy',
	JUMP_ANIMATION_MAP: 'res/animations/map/jump_enemy.json',
	JUMP_ANIMATION_IMAGE: 'res/animations/images/jump_enemy.png',

	ENEMIES_COUNT_MICRO: 21,
	ENEMIES_COUNT_SMALL: 20,
	ENEMIES_COUNT_MIDDLE: 5,
	ENEMIES_COUNT_BIG: 3,

	XP_MICRO: 5,
	XP_SMALL: 10,
	XP_MIDDLE: 20,
	XP_BIG: 30,

	ENEMY_SMALL_TYPE: 1,
	ENEMY_MIDDLE_TYPE: 2,
	ENEMY_BIG_TYPE: 3,
	ENEMY_MICRO_TYPE: 4

});