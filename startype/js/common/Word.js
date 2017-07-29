var Word = Base.extend({

	entity: null,
	isTarget: null,
	hitCount: null,
	hitTarget: null,
	enemy: null,
	style: null,
	
	constructor: function(enemy){
		this.enemy = enemy;
	},

	create: function(){
		var fontSize = Manager.i.sizeManager.getEnemyWordsSize();
		this.style = {font:"Arial", fontSize: fontSize, fill: Word.COLOR_DEFAULT, backgroundColor: Word.BG_COLOR_DEFAULT};
		this.entity = Manager.i.game.add.text(this.enemy.entity.x, this.enemy.entity.y + this.enemy.entity.height / 2, "word", this.style);
		this.entity.anchor.set(0.5, 0);
		
		this.hide();
	},

	release: function(){
		this.entity.reset(this.enemy.entity.x, this.enemy.entity.y + this.entity.height / 2);
		this.isTarget = false;
		this.hitCount = 0;
		this.entity.backgroundColor = Word.BG_COLOR_DEFAULT;
		this.entity.fill = Word.COLOR_DEFAULT;
		//this.entity.alpha = 0.5;
		//this.entity.sendToBack();
	},

	setText: function(text){
		this.entity.text = text;
		this.hitTarget = text.length;
	},

	firstLetter: function(){
		var txt = this.entity.text;
		if(txt.length > 0){
			return txt[0].toLowerCase();
		}
		return false;
	},

	update: function(){
		this.entity.x = this.enemy.entity.x + this.enemy.entity.width/2;
		this.entity.y = this.enemy.entity.y + this.enemy.entity.height / 2;
		if(this.isTarget){
			this.entity.bringToTop();
		}
	},

	kill: function(){
		this.entity.kill();
		this.isTarget = false;
	},

	hide:function(){
		this.entity.exists = false;
       	this.entity.visible = false;
	},

	hit: function(){
		var txt = this.entity.text;
		if(txt.length > 0){
			this.entity.text = txt.substr(1, txt.length-1);
		}

		return this.getHealth();
	},

	realHit: function(){
		this.hitCount++;
		return this.getRealHealth();
	},

	getRealHealth: function(){
		return this.hitTarget - this.hitCount;
	},

	getHealth: function(){
		return this.entity.text.length;
	},

	setEntity: function(entity){
		this.entity = entity;
	},

	getEntity: function(){
		return this.entity;
	},

	setIsTarget: function(isTarget){
		this.isTarget = isTarget;
		this.entity.fill = Word.COLOR_TARGET;
	},

	getIsTarget: function(){
		return this.isTarget;
	},

	setHitCount: function(hitCount){
		this.hitCount = hitCount;
	},

	getHitCount: function(){
		return this.hitCount;
	}
},{
	COLOR_DEFAULT: '#ffffff',
	COLOR_TARGET: '#00f6f0',
	BG_COLOR_DEFAULT: 'rgba(0,0,0,0.7)',
	BG_COLOR_TARGET: 'rgba(0,0,0,0.7)',
	BG_COLOR_DEATH: 'rgba(0,0,0,0)',
});