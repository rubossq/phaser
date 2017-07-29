var BoxesManager = Base.extend({

	boxes: null,
	gamePage: null,
	collisionGroup: null,
	bonusManager: null,
	emitter: null,
	emitTimer: null,
	material: null,
	hitCount: 0,

	constructor: function(gamePage){
		this.gamePage = gamePage;
		this.bonusManager = new BonusManager(gamePage);
	},

	preload: function(){
		Manager.i.game.load.image('box',  BoxesManager.SPRITE_IMAGE);
		Manager.i.game.load.image('small_box',  BoxesManager.SMALL_SPRITE_IMAGE);

		SoundManager.i.quietSoundLoad('hit_box', BoxesManager.HIT_SOUND, true);
	
		this.bonusManager.preload();
	},

	add: function(material){
		this.material = material;
		this.collisionGroup = Manager.i.game.physics.p2.createCollisionGroup();
		this.bonusManager.add();
	},

	create: function(){
		this.boxes = Manager.i.game.add.group();
		//this.boxes.enableBody = true;
   		//this.boxes.physicsBodyType = Phaser.Physics.P2JS;
		this.bonusManager.create(); 

		this.emitter = Manager.i.game.add.emitter(Manager.i.game.world.centerX, Manager.i.game.world.centerY, 100);
		this.emitter.makeParticles('small_box');
		this.emitter.setRotation(0, 45);
    	this.emitter.setScale(1, 2, 1, 2);
    	this.emitter.setXSpeed(-250, 250)
    	this.emitter.setYSpeed(-250, 250)
    	this.emitter.start(false, 200, 5);
    	this.emitter.on = false;
    	
		this.curCount = 0;
	},

	recreate: function(){
		this.curCount = 0;
		this.hitCount = 0;
		this.bonusManager.recreate();
		//console.log("try create boxes");
		this.addRow(RoundManager.i.getCountHealth());
	},

	addRow: function(roundData){
		this.hitCount = 0;
		var l = this.boxes.length;
		var s = Helper.i.getBoxWidth();
		var padding = Helper.i.getPadding();
		//console.log("padding = " + padding);
		var y = s/2 + padding + this.gamePage.topBar.entity.height;
		var places = this.getRandomPlaces(roundData.count, s);
		//console.log("try add bonuses");
		this.bonusManager.addRow(places.excepts, roundData.bonus);
		for(var i = 0; i < roundData.count; i++){
			var b = this.boxes.create(places.coords[i], y, 'box');
			Manager.i.game.physics.p2.enable(b, false);
			b.name = "box";
			b.anchor.setTo(0.5);
			b.width = s;
			b.height = s;
			b.fixedRotation = 1;
			//b.body.setMaterial(this.material);
			// var padding = b.height / (BoxesManager.MAX_IN_ROW + 1);
			if(places.excepts[i] == 0){
				b.body.setRectangle(s+(padding+1)*2, s+padding+1, -(padding+1)/2);
			}else if(places.excepts[i] == BoxesManager.MAX_IN_ROW-1){
				b.body.setRectangle(s+(padding+1)*2, s+padding+1, (padding+1)/2);
			}else{
				b.body.setRectangle(s+padding+1, s+padding+1);
			}
			//b.body.bounce.set(1);
			b.body.damping = 0;
			b.body.allowGravity = false;
			b.body.angularDamping = 0;
			b.body.setCollisionGroup(this.collisionGroup);
			//b.body.collideWorldBounds = true;
			b.body.static = true;
			//b.body.collides([this.gamePage.ballsManager.collisionGroup]);
			b.body.collides(this.gamePage.ballsManager.collisionGroup, this.hit, this);
			
			var text = Manager.i.game.add.bitmapText(b.x + 2, b.y, "Roboto", roundData.health[i], parseInt(s/2.6, 10));
			text.tint = 0x000000;
			text.anchor.set(0.5);
			b.tint = this.getColorForHealth(roundData.health[i]);
			b.logic = {type:"box", health: roundData.health[i], id: l, text: text};
			l++;
		}
		
		this.curCount += roundData.count;
		this.slideAll();
	},

	getAllAlive: function(){
		return this.boxes;
	},

	getLowest: function(){
		var lowest = this.boxes.getChildAt(0);
		for(var i=1; i<this.boxes.length; i++){
			var b = this.boxes.getChildAt(i);
			//console.log("check " + (b.height/2 + b.y));
			if((b.height / 2) + b.y > (lowest.height / 2) + lowest.y){
				lowest = b;
			}
		}

		return lowest;
	},

	getColorForHealth: function(health){
		if(health < 5){
			color = 0x00B4CF;
		}else if(health < 10){
			color = 0x009EF5;
		}else if(health < 20){
			color = 0x1089F4;
		}else if(health < 40){
			color = 0x3645AF;
		}else if(health < 60){
			color = 0x5C2EB1;
		}else if(health < 80){
			color = 0x931BA9;
		}else if(health < 100){
			color = 0xE81457;
		}else if(health < 130){
			color = 0xF43828;
		}else if(health < 180){
			color = 0xFF4B0A;
		}else if(health < 240){
			color = 0xFF8E00;
		}else if(health < 380){
			color = 0xFFE819;
		}else if(health < 430){
			color = 0x7FBC39;
		}else if(health < 600){
			color = 0x3FA742;
		}else if(health < 800){
			color = 0x008C7D;
		}else if(health < 900){
			color = 0x1A5B54;
		}else{
			color = 0x5F5F5F;
		}

		return color;
	},

	hit: function(box, ball){
		//console.log(ball.sprite.logic);
		//console.log(box.sprite.logic.health);
		ball.sprite.logic.previousSide = "box";
		box.sprite.logic.health--;
		this.hitCount++;
		SoundManager.i.play("hit_box");
		if(box.sprite.logic.health <= 0){
			this.emitter.emitX = box.sprite.x;
    		this.emitter.emitY = box.sprite.y;
    		this.emitter.setAll("tint", box.sprite.tint);
    		this.emitter.on = true;

			box.sprite.logic.text.destroy();
			box.sprite.destroy();
			this.curCount--;
			if(this.emitTimer){
				this.emitTimer.timer.remove(this.emitTimer);
				this.emitTimer = null;
			}
			this.emitTimer = Manager.i.game.time.events.add(200, function(){
				this.emitter.on = false;
				this.emitTimer = null;
			}, this);
		}else{
			box.sprite.tint = this.getColorForHealth(box.sprite.logic.health);
			box.sprite.logic.text.text = box.sprite.logic.health;
		}
	},

	getHitCount: function(){
		return this.hitCount;
	},

	slideAll: function(){
		for(var i=0; i<this.boxes.length; i++){
			var b = this.boxes.getChildAt(i);
			var padding = Helper.i.getPadding();
			var y = b.y + padding + b.height;
			
			var tween = Manager.i.game.add.tween(b.body).to( {y: y}, 200, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();

			var tween = Manager.i.game.add.tween(b.logic.text).to( {y: (y + 4)}, 200, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();
		}
	},

	getRandomPlaces: function(count, width){
		var half = width / 2;
		var places = new Array();
		var padding = Helper.i.getPadding();
		var excludes = new Array();
		var cnt = 0;
		while(true){
			var p = Helper.i.randomInteger(0, BoxesManager.MAX_IN_ROW-1)
			if(excludes.indexOf(p) === -1){
				excludes.push(p);
				places.push(padding + padding*p + p * width + half);
			}

			cnt++;
			if(cnt >= 1000 || places.length >= count){
				break;
			}
		}
		//console.log(places);
		return {coords: places, excepts: excludes};
	},


	//sprite.body.blocked.down

	update: function(){
		//console.log("update");
		/*for(var i=0; i<this.boxes.length; i++){
			var b = this.boxes.getChildAt(i);
			
		}*/
	},

	render: function(){
		
		
	},

	show: function(){
		this.boxes.exists = true;
		this.boxes.visible = true;
	},

	hide: function(){
		this.boxes.exists = false;
        this.boxes.visible = false;
	},

	getBoxes: function(){
		return this.boxes;
	},

	removeAll: function(){
		while(this.boxes.length > 0){
			var member = this.boxes.getChildAt(0);
			member.logic.text.destroy();
			member.destroy();
		}
		this.emitter.on = false;
		this.bonusManager.removeAll();
	},


},{
	SPRITE_IMAGE: "res/images/box.png",
	SMALL_SPRITE_IMAGE: "res/images/small_box.png",
	HIT_SOUND: "res/sounds/hit_box.ogg",
	VELOCITY: 2000,
	MAX_IN_ROW: 7
});