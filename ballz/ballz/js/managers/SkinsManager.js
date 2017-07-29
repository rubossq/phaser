var SkinsManager = Base.extend({

	skins: null,
	current: 0,
	choice: null,

	constructor: function(){
		SkinsManager.i = this;
		this.skins = new Array();
		for(var i=0; i<SkinsManager.SKINS_NUM; i++){
			var tint = this.getTint(i);
			this.skins.push(new Skin(this, {num: (i+1), tint: tint, score: SkinsManager.SKINS_SCORE[i]}));
		}

		this.choice = this.loadStorage("skin");
	},

	getTint: function(num){
		var color = 0xFFFFFF;
		switch(num){
			case 1:
				color = 0xDC3A00;
				break;
			case 2:
				color = 0xEA2BCD;
				break;
			case 3:
				color = 0xE81457;
				break
			case 4:
				color = 0x000000;
				break;
			case 5:
				color = 0x5C2EB1;
				break;
			case 6:
				color = 0x8A0031;
				break;
			case 7:
				color = 0x7FBC39;
				break;
			case 8:
				color = 0x00B4CF;
				break;
			case 9:
				color = 0x009EF5;
				break
			case 10:
				color = 0xE8FA54;
				break;
		}

		return color;
	},

	loadStorage: function(item){
		if (typeof(Storage) !== "undefined") {
		    var val = localStorage.getItem(item);
		    if(val){
		    	return parseInt(val, 10);
		    }else{
		    	return 0;
		    }
		}
		return 0;
	},

	writeStorage: function(item, val){
		if (typeof(Storage) !== "undefined") {
		   localStorage.setItem(item, val);
		}
	},

	preload: function(){
		for(var i = 0; i < this.skins.length; i++){
			this.skins[i].preload();
		}
	},

	create: function(){
		for(var i = 0; i < this.skins.length; i++){
			this.skins[i].create();
		}
	},

	prepare: function(){
		this.current = -1;
		for(var i = 0; i < this.skins.length; i++){
			this.skins[i].resetAvailable(ScreenManager.i.gamePage.score.totalScore);
		}
	},

	next: function(){
		return this.skins[++this.current];
	},

	hasNext: function(){
		var hasNext = true;
		if(this.current >= this.skins.length-1){
			hasNext = false;
		}

		return hasNext;
	},

	hasPrev: function(){
		var hasPrev = true;
		if(this.current < 1){
			hasPrev = false;
		}

		return hasPrev;
	},

	previous: function(){
		return this.skins[--this.current];
	},

	select: function(){
		this.writeStorage("skin", this.current);
		this.choice = this.current;
	},

	getSkin: function(num){
		return this.skins[num];
	},

	getChoice: function(){
		console.log("choice = " + this.choice);
		return this.skins[this.choice];
	},

	getCurrent: function(){
		return this.skins[this.current];
	}
},{
	i: null,
	SKINS_NUM: 11,
	SKINS_SCORE: [0, 5000, 20000, 100000, 150000, 200000, 300000, 400000, 500000, 1000000, 2000000]
});

new SkinsManager();