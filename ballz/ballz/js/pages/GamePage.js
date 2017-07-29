var GamePage = Base.extend({

	components: null,

	score: null,
	ballsManager: null,
	boxesManager: null,
	isGame: false,
	pause: null,
	isPreparing: false,
	canMove: true,
	deadLine: null,
	pointer: null,
	topBar: null,
	bottomBar: null,
	isFirst: true,
	tutorial: null,

	constructor: function(){
		this.score = Score.i;
		this.pause = new Pause();
		this.ballsManager = new BallsManager(this);
		this.boxesManager = new BoxesManager(this);
		this.deadLine = new DeadLine(this);
		this.pointer = new Pointer(this);
		this.topBar = new TopBar(this);
		this.tutorial = new Tutorial(this);
		this.bottomBar = new BottomBar(this);
	},

	preload: function(){
		SoundManager.i.quietSoundLoad('new_round', GamePage.ROUND_SOUND, true);
		SoundManager.i.quietSoundLoad('lose', GamePage.LOSE_SOUND, true);

		this.topBar.preload();
		this.tutorial.preload();
		this.bottomBar.preload();
		this.pause.preload();
		this.score.preload();
		this.pointer.preload();
		this.ballsManager.preload();
		this.boxesManager.preload();
	},

	create: function(){
		Manager.i.game.physics.startSystem(Phaser.Physics.P2JS);
		Manager.i.game.physics.p2.restitution = 1.0;
		Manager.i.game.physics.p2.friction = 0;
		Manager.i.game.physics.p2.applyGravity = false;
		Manager.i.game.physics.p2.applyDamping = false;
		//Manager.i.game.physics.p2.gravity.y = 1000;
		Manager.i.game.physics.p2.updateBoundsCollisionGroup();
		Manager.i.game.physics.p2.setImpactEvents(true);
		
		//TO DO - can be chanched via onBeginContact
		Manager.i.game.physics.p2.setPostBroadphaseCallback(this.checkCollide, this);
		
		var material1 = Manager.i.game.physics.p2.createMaterial();
        var material2 = Manager.i.game.physics.p2.createMaterial();
        Manager.i.game.physics.p2.createContactMaterial(material1, material2, { friction: 0 , restitution: 1.0 });

		this.ballsManager.add(material1);
		this.boxesManager.add(material2);
		this.topBar.add();
		this.bottomBar.add();

		this.topBar.create();
		this.bottomBar.create();
		this.pointer.create();
		this.pause.create();
		this.score.create();
		this.ballsManager.create();
		this.boxesManager.create();
		
		this.deadLine.create();
		this.tutorial.create();
	},

	checkCollide: function(body1, body2){
		if(body1.sprite && body2.sprite){
			//console.log("---------------");
			//console.log(body1.sprite.name);
			//console.log(body2.sprite.name);
		    
		    var b = body1;
		    if (b.sprite.name != "bonus" ){
		    	b = body2;
		    }

		    if (b.sprite.name == "bonus" ){
		    	b.sprite.logic.hit(b, b.sprite.logic.self);
				return false;
			}
		    
		    return true;
		}
		return false;
	},

	nextRound: function(){
		if(!this.isPreparing){
			this.isPreparing = true;

			//monster kill
			if(this.boxesManager.getAllAlive().length == 0){
				NavigationManager.i.good();
			}

			RoundManager.i.roundUp(this.ballsManager.curCount, this.boxesManager.bonusManager.curCount);
			var b = this.ballsManager.getLastBallPos();

			this.score.upTotal(this.boxesManager.getHitCount());		//order 1 important
			this.boxesManager.addRow(RoundManager.i.getCountHealth());	//order 2
			this.boxesManager.bonusManager.goAllTo(b.x, b.y);
			this.ballsManager.resetBalls();

			var timer = Manager.i.game.time.events.add(333, function(){
				this.isPreparing = false;
				this.canMove = true;
				var b = this.boxesManager.getLowest();
				this.boxesManager.bonusManager.clearLower(this.deadLine.getDeadPosY());
				if(this.deadLine.isDead(b.y)){
					SoundManager.i.play("lose");
					this.lose();
				}else{
					SoundManager.i.play("new_round");
					this.score.up();
				}
			}, this);
		}
	},

	up: function(event){
		if(this.isGame){
			if(this.canMove && this.pointer.entity){
				this.canMove = false;
				this.ballsManager.move(event.x, event.y);
			}

			this.pointer.destroy();
		}
	},

	down: function(event){
		if(this.isGame){
			this.tutorial.stopSlide();
			this.tutorial.hide();
			if(this.canMove && event.y > TopBar.BAR_HEIGHT && !Manager.i.game.paused){
				var b = this.ballsManager.fakeBall.entity;
				
				this.pointer.draw(event.x, event.y, b.x, b.y);
			}
		}
	},

	swipe: function(event){
		//console.log("move");
		if(this.isGame){
			//console.log("move in game");
			if(this.canMove && event.y > TopBar.BAR_HEIGHT && Manager.i.game.input.activePointer.withinGame){
				//console.log("move in game can");
				var b = this.ballsManager.fakeBall.entity;
				if(this.availableAngle(event.x, event.y, b.x, b.y)){
					this.pointer.draw(event.x, event.y, b.x, b.y);
				}else{
					this.pointer.destroy();
				}
			}else{
				this.pointer.destroy();
			}
		}
	},

	availableAngle: function(x1, y1, x2, y2){

		var directionX = x1 - x2;
		var directionY = y1 - y2;

		var rotation = this.getAngle(directionX, directionY);

		if(rotation < -175 || rotation > -5){
			return false;
		}
		return true;
	},

	getAngle: function(directionX, directionY){
		return Math.atan2(directionY, directionX) / Math.PI * 180
	},

	showGameView: function(){
		this.isGame = true;
		this.isPreparing = false;
		this.canMove = true;
		RoundManager.i.start();
		this.setColor();
		this.score.restart();
		this.tutorial.show();

		this.boxesManager.recreate();
		this.ballsManager.recreate();
		this.deadLine.show();
		this.ballsManager.fakeBall.showTo(Manager.i.game.width/2,
										  Manager.i.game.height - (this.ballsManager.fakeBall.entity.height/2 + this.bottomBar.entity.height));
		this.topBar.show();
		this.bottomBar.show();
		this.pause.show();
		this.score.show();

		Manager.i.game.input.onUp.add(this.up, this);
		Manager.i.game.input.onDown.add(this.down, this);
		if(this.isFirst){
			Manager.i.game.input.addMoveCallback(this.swipe, this);
			this.isFirst = false;
		}
	},

	setColor: function(){
		var skin = SkinsManager.i.getChoice();
		//console.log(skin);
		this.pointer.setColor(skin.getColor());
		this.ballsManager.fakeBall.setColor(skin.getColor());
		this.deadLine.setColor(skin.getColor());
	},

	hideGameView: function(){
		this.isGame = false;
		this.pause.hide();
		this.topBar.hide();
		this.bottomBar.hide();
		this.score.hide();
		this.deadLine.hide();
		this.tutorial.hide();
		this.ballsManager.fakeBall.hide();
		this.ballsManager.removeAll();
		this.boxesManager.removeAll();
		
		Manager.i.game.time.removeAll();
		Manager.i.game.tweens.removeAll();
		Manager.i.game.input.onUp.removeAll();
		Manager.i.game.input.onDown.removeAll();
		//Manager.i.game.input.removeMoveCallback(this.swipe, this);
		//Manager.i.game.input.moveCallback = null;
		//Manager.i.game.input.moveCallbackContext = null;
	},

	showMainView: function(){
		
	},

	hideMainView: function(){

	},

	render: function(){
		//this.ballsManager.render();
		this.boxesManager.render();
	},

	lose: function(){
		ScreenManager.i.hideScreen(ScreenManager.SCREEN_GAME);
		ScreenManager.i.showScreen(ScreenManager.SCREEN_GAME_OVER);
	},

	collide: function(){

	},

	update: function(){
		//if(this.isGame){
			
			this.score.update();
			this.ballsManager.update();
			this.boxesManager.update();

			//Manager.i.game.input.activePointer

			//this.line = new Phaser.Line(event.x, event.y, b.body.x, b.body.y);
		//}
	}

},{
	ROUND_SOUND: "res/sounds/new_round.ogg",
	LOSE_SOUND: "res/sounds/lose.ogg",
});