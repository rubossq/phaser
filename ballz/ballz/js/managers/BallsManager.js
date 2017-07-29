var BallsManager = Base.extend({

	balls: null,
	curCount: 0,
	gamePage: null,
	collisionGroup: null,
	waitCount: 0,
	fakeBall: 0,
	material: null,
	releasedCount: 0,
	lastPos: null,

	constructor: function(gamePage){
		this.gamePage = gamePage;
		this.fakeBall = new FakeBall(true);
	},

	preload: function(){
		Manager.i.game.load.image('ball',  BallsManager.SPRITE_IMAGE);

	},

	add: function(material){
		this.material = material;
		this.collisionGroup = Manager.i.game.physics.p2.createCollisionGroup();
	},

	create: function(){
		this.balls = Manager.i.game.add.group();
		this.setSizes();
		//this.balls.enableBody = true;
   		//this.balls.physicsBodyType = Phaser.Physics.P2JS;


		this.fakeBall.create();
		this.lastPos = {x: this.fakeBall.entity.x};
		this.curCount = 0;

	},

	setSizes: function(){
		BallsManager.VELOCITY *= SizeManager.i.scaleY;
		BallsManager.PARTICLE_GRAVITY *= SizeManager.i.scaleY;
		BallsManager.CIRCLE_PADDING *= SizeManager.i.scaleY;
		if(BallsManager.CIRCLE_PADDING % 2 != 0){
			BallsManager.CIRCLE_PADDING++;
		}
	},

	recreate: function(){
		this.curCount = 1;
		this.releasedCount = 0;
		this.fakeBall.setCount(1);
		//this.createBalls(this.curCount, Manager.i.game.width/2, Manager.i.game.height);
	},

	createBall: function(x, y, speedX, speedY){
		var l =  this.balls.length;
		//for(var i=0; i<count; i++){
			var b = this.balls.create(x, y, 'ball');
			Manager.i.game.physics.p2.enable(b, false);
			b.scale.setTo(this.fakeBall.entity.scale.y);
			b.name = "ball";
	        b.anchor.setTo(0.5);
	       
	        //b.alpha = 0;
	        //b.body.bounce.set(1);
	        //b.body.collideWorldBounds = true;
	        b.body.setCircle(b.width/2 + BallsManager.CIRCLE_PADDING);
	        b.body.damping = 0;
            b.body.angularDamping = 0;
            b.fixedRotation = true;
            
            //b.body.setMaterial(this.material); 
            //b.body.gravity.y = 0;
            //b.body.allowGravity = false;
            b.body.setCollisionGroup(this.collisionGroup);
            b.body.collides(this.gamePage.topBar.collisionGroup);
            b.body.collides(this.gamePage.bottomBar.collisionGroup);
            b.body.collides(this.gamePage.boxesManager.bonusManager.collisionGroup);
			b.body.collides(this.gamePage.boxesManager.collisionGroup);
            //b.body.collides(this.gamePage.boxesManager.bonusManager.collisionGroup);
           	
           	b.body.velocity.x = speedX;
	       	b.body.velocity.y = speedY;
            b.body.static = false;
           
			b.tint = this.fakeBall.getColor();
            
            b.logic = {type:"ball"};
            //console.log(this.gamePage.boxesManager.collisionGroup);

            b.body.onBeginContact.add(this.concat, this);
            //b.body.collides(this.gamePage.boxesManager.collisionGroup, this.hitBox, this);
			//b.body.immovable = true;
			
			b.logic = {alive: false, id: l};
			l++;
		//}
			

		return b;
	},

	touchBottom: function(b){
		this.lastPos = {x: b.x, y: Manager.i.game.height - (this.fakeBall.entity.height/2 + this.gamePage.bottomBar.entity.height)};
		b.destroy();
		if(this.getAllAlive().length == 0 && this.releasedCount == this.curCount){
			this.gamePage.nextRound();
		}
	},

	concat: function(body1, body2, shape1, shape2, arr){
		//console.log("concat");
		if(body1){

		}else{
			for(var i=0; i<this.balls.length; i++){
				var b = this.balls.getChildAt(i);
				
				var posXRight = b.x + (b.width/2 + BallsManager.CIRCLE_PADDING/2);
				var posXLeft = b.x - (b.width/2 + BallsManager.CIRCLE_PADDING/2);
				b.logic.previousDiff = false;
				//console.log("ps1 "+b.logic.id+" = " + b.logic.previousSide);
				//console.log("posYBottom = " + posYBottom + " gh = " + Manager.i.game.height + " id = " + b.logic.id);
				if(posXLeft <= 0 && b.logic.alive){
					//console.log("left "+ " id = " + b.logic.id);
					if(b.logic.previousSide){
						if(b.logic.previousSide == "right" || b.logic.previousSide == "box"){
							b.logic.previousDiff = true;
						}else{
							b.logic.previousDiff = false;
						}
					}
					b.logic.previousSide = "left";
				}else if(posXRight >= Manager.i.game.width && b.logic.alive){
					//console.log("right "+ " id = " + b.logic.id);
					if(b.logic.previousSide){
						if(b.logic.previousSide == "left" || b.logic.previousSide == "box"){
							b.logic.previousDiff = true;
						}else{
							b.logic.previousDiff = false;
						}
					}
					b.logic.previousSide = "right";
				}


				//console.log(b.logic.previousDiff);
				//console.log("ps2 "+b.logic.id+" = " + b.logic.previousSide);
				if(b.logic.previousY && b.logic.alive && b.logic.previousDiff){
					//console.log("diff = " + (Math.abs(b.logic.previousY - b.body.y)));
					if(Math.abs(b.logic.previousY - b.body.y) <= BallsManager.MOVE_Y_NORMAL){
						if(b.body.velocity.y > 0){
							b.body.velocity.y += BallsManager.SPEED_BUGGED;
						}else{
							b.body.velocity.y -= BallsManager.SPEED_BUGGED;
						}
						
						console.log("seems to be bagged");
					}
					
				}
				b.logic.previousY = b.body.y;
				

			}
		}
	},

	removeAll: function(){
		while(this.balls.length > 0){
			var member = this.balls.getChildAt(0);
			//console.log(member);
			member.destroy();
		}
	},

	showFakeBall:function(){
		var b = this.getLastBallPos();
		this.fakeBall.setCount(this.curCount);
		//console.log("show to");
		this.fakeBall.showTo(b.x, Manager.i.game.height - (this.fakeBall.entity.height/2 + this.gamePage.bottomBar.entity.height));
	},

	hideFakeBall:function(){
		this.fakeBall.hide();
	},

	resetBalls: function(){
		
		this.curCount += this.waitCount;
		this.waitCount = 0;
		this.releasedCount = 0;
		//this.groupAll();

		this.showFakeBall();
		
		
	},

	groupAll: function(){
		var b = this.getFirstBall();
		var x = b.x;
		var y = b.y;
		for(var i=0; i<this.balls.length; i++){
			var b = this.balls.getChildAt(i);
			var tween = Manager.i.game.add.tween(b.body).to( {y: y, x:x}, 300, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();

			/*
				tween.onComplete.addOnce(function(body){
					body.removeCollisionGroup(this.gamePage.boxesManager.collisionGroup);
				}, this, 0);
			*/

			var tween = Manager.i.game.add.tween(b).to( {alpha: 0}, 300, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();
		}
	},

	getLastBallPos: function(){
		return this.lastPos;
	},

	getAllAlive: function(){
		return this.balls;
	},

	bonusWaitUp: function(){
		this.waitCount++;
	},

	move: function(x, y){

		//var b = this.getFirstBall();

		var directionX = x - this.fakeBall.entity.x;
		var directionY = y - this.fakeBall.entity.y;

		var rotation = Math.atan2(directionY, directionX) + Manager.i.game.math.degToRad(-90); 
		var angle = rotation + (Math.PI / 2);
		var speedX = BallsManager.VELOCITY *  Math.cos(angle);
		var speedY = BallsManager.VELOCITY * Math.sin(angle);	
		
		var sx = this.fakeBall.entity.x;
		var sy = this.fakeBall.entity.y;
		this.hideFakeBall();
		for(var i=0; i<this.curCount; i++){
			Manager.i.game.time.events.add(BallsManager.BALL_INTERVAL * i, function(){
				var b = this.createBall(sx, sy, speedX, speedY);
				Manager.i.game.time.events.add(100, function(b){
	       			b.logic.alive = true;
	       			this.releasedCount++;
	       		}, this, b);
			}, this);			
       	}
	},

	//sprite.body.blocked.down

	update: function(){

	},

	render: function(){
		
	},

	collide: function(){

	},

	show: function(){
		this.balls.exists = true;
        this.balls.visible = true;
	},

	hide: function(){
		this.balls.exists = false;
        this.balls.visible = false;
	},

	getBalls: function(){
		return this.balls;
	}

},{
	SPRITE_IMAGE: "res/images/ball.png",
	VELOCITY: 1800,
	BALL_INTERVAL: 100,
	SPEED_BUGGED: 50,
	MOVE_Y_NORMAL: 2,
	PARTICLE_GRAVITY: 200,
	CIRCLE_PADDING: 4,
});