var Action = Base.extend({

	type: null,
	enemyEntity: null,
	timer: null, 

	constructor: function(type){
		this.type = type;
	},

	create: function(enemyEntity){
		this.enemyEntity = enemyEntity;
	},

	release: function(){
		if(this.type == EnemyManager.ENEMY_MIDDLE_TYPE){
			this.timer = Manager.i.game.time.events.loop(Action.ACTION_TIME_MIDDLE, this.middleAction, this);
		}else if(this.type == EnemyManager.ENEMY_BIG_TYPE){
			this.timer = Manager.i.game.time.events.loop(Action.ACTION_TIME_BIG, this.bigAction, this);
		}
	},

	kill: function(){
		if(this.timer){
			this.timer.timer.remove(this.timer);
		}
		
	},

	middleAction: function(){
		Manager.i.enemyManager.releaseEnemiesFrom(EnemyManager.ENEMY_SMALL_TYPE, 1, 0, this.enemyEntity.x, this.enemyEntity.y + this.enemyEntity.height/2);
	},

	bigAction: function(){
		//number of micros must be odd
		Manager.i.enemyManager.releaseEnemiesFrom(EnemyManager.ENEMY_MICRO_TYPE, 7, 0, this.enemyEntity.x, this.enemyEntity.y + this.enemyEntity.height/2);
	}

	
},{
	ACTION_TIME_MIDDLE: 5000,
	ACTION_TIME_BIG: 7000
});