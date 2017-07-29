var Score = Base.extend({

	components: null,

	curScore: null,
	totalScore: null,
	bestScore: null,
	
	constructor: function(){
		Score.i = this;
		this.totalScore = this.readTotalScore();
		this.bestScore = this.readBestScore();
		this.curScore = 0;

		this.components = {entityScore: null, entityBestText: null, entityBestNum: null};
	},

	preload: function(){
		
	},

	create: function(){
		var comps = this.components;

		comps.entityScore = Manager.i.game.add.bitmapText(0, 0, "Roboto", "0", Manager.i.sizeManager.getPointText());

		comps.entityBestText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("gameBest"), Manager.i.sizeManager.getMiniText());
		comps.entityBestNum = Manager.i.game.add.bitmapText(0, 0, "Roboto", this.bestScore, Manager.i.sizeManager.getPointText());
		
		this.hide();
	},

	update: function(){
		
	},

	setCurScore: function(comps){
		comps.entityScore.setText(this.curScore);
		comps.entityScore.x = (Manager.i.game.width - comps.entityScore.width) / 2;
		comps.entityScore.y = (TopBar.BAR_HEIGHT / 2) - (Manager.i.sizeManager.getPointText() / 2);
	},

	setBestScore: function(comps){
		// set best score sizes and coordinates
		comps.entityBestNum.setText(this.bestScore);
		comps.entityBestNum.x = Manager.i.game.width - comps.entityBestNum.width - (25 * Manager.i.sizeManager.scaleX);
		comps.entityBestNum.y = (TopBar.BAR_HEIGHT / 2) - (10 * Manager.i.sizeManager.scaleX);

		comps.entityBestText.x = Manager.i.game.width - comps.entityBestText.width - (25 * Manager.i.sizeManager.scaleX);
		comps.entityBestText.y = (TopBar.BAR_HEIGHT / 2) - Manager.i.sizeManager.getMiniText() - (10 * Manager.i.sizeManager.scaleX);
	},

	readTotalScore: function(){
		var res = 0;
		//if (typeof(Storage) !== "undefined"){
			try{
				var score = localStorage.getItem("totalScore");
				if(score){
					res = parseInt(score, 10);
				}
			}catch(e){

			}
		//}

		return res;
	},

	writeTotalScore: function(){
		//if (typeof(Storage) !== "undefined"){
			try{
				localStorage.setItem("totalScore", this.totalScore);
			}catch(e){

			}
		//}
	},

	readBestScore: function(){
		var res = 0;
		//if (typeof(Storage) !== "undefined"){
			try{
				var score = localStorage.getItem("bestScore");
				if(score){
					res = parseInt(score, 10);
				}
			}catch(e){

			}
		//}

		return res;
	},

	writeBestScore: function(){
		//if (typeof(Storage) !== "undefined"){
			try{
				localStorage.setItem("bestScore", this.bestScore);
			}catch(e){

			}
		//}
	},

	restart: function(){
		this.curScore = 0;
	},

	show: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = true;
				this.components[prop].visible = true;
				Manager.i.game.world.bringToTop(this.components[prop]);
			}
		}
		// set current best score on Game page
		this.setBestScore(this.components);
		// set current score on Game page
		this.setCurScore(this.components);
	},

	hide: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = false;
				this.components[prop].visible = false;
			}
		}
	},

	up: function(){
		this.curScore++;
		if(this.curScore > this.bestScore){
			this.bestScore = this.curScore;
			this.writeBestScore(this.bestScore);
		}
		// set current score on Game page
		this.setCurScore(this.components);
	},

	upTotal: function(val){
		this.totalScore += val;
		this.writeTotalScore();
	}
},{
	i: null
});

new Score();