var GameOverPage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {gameoverView: null, viewWindow: null, titleText: null,
							scoreNum: null, scoreText: null, roundNum: null, roundText: null,
							menuText: null, againText: null};
	},

	preload: function(){
		Manager.i.game.load.image('window_red', GameOverPage.WINDOW_RED);
	},

	create: function(){
		var comps = this.components;

		// set Game Over view
		comps.gameoverView = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Game Over window
		comps.viewWindow = Manager.i.game.add.sprite(0, 0, 'window_red');
		this.setWindowParams(comps);

		// set Game Over title
		comps.titleText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("gameOverTitle"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set final score
		comps.scoreNum = Manager.i.game.add.bitmapText(0, 0, "Neuropol", "", Manager.i.sizeManager.getResultText());
		// set round
		comps.roundNum = Manager.i.game.add.bitmapText(0, 0, "Neuropol", "", Manager.i.sizeManager.getResultText());

		// set final score text
		comps.scoreText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("gameOverScore"), Manager.i.sizeManager.getPointText());
		this.setScoreTextParams(comps);

		// set round text
		comps.roundText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("gameOverRound"), Manager.i.sizeManager.getPointText());
		this.setRoundTextParams(comps);

		// set Game Over menu
		comps.menuText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("gameOverMenu"), Manager.i.sizeManager.getPointText());
		this.setMenuParams(comps);

		// set Game Over again
		comps.againText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("gameOverAgain"), Manager.i.sizeManager.getPointText());
		this.setAgainParams(comps);

		// handle click on game over page
		comps.gameoverView.events.onInputUp.add(this.viewGameOverTouch, this);

		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.gameoverView.beginFill(0x000000, 0);
		comps.gameoverView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.gameoverView.endFill();
		comps.gameoverView.inputEnabled = true;
	},

	setWindowParams: function(comps){
		// set window sizes
		comps.viewWindow.width = Manager.i.game.width * 0.8;
		comps.viewWindow.height = Manager.i.game.height * 0.68;
		// set window coordinates
		comps.viewWindow.x = (Manager.i.game.width - comps.viewWindow.width) / 2;
		comps.viewWindow.y = ((Manager.i.game.height - comps.viewWindow.height) / 2) + 
								(20 * Manager.i.sizeManager.scaleY);
	},

	setTitleParams: function(comps){
		// set title coordinates
		comps.titleText.x = comps.viewWindow.x;
		comps.titleText.y = comps.viewWindow.y - Manager.i.sizeManager.getTitleText() - (20 * Manager.i.sizeManager.scaleY);
	},

	setScore: function(score){
		// set recruited score
		this.components.scoreNum.setText(score);
		// set result score coordinates
		this.components.scoreNum.x = this.components.viewWindow.x + ((this.components.viewWindow.width - this.components.scoreNum.width) / 2);
		this.components.scoreNum.y = this.components.viewWindow.y + (110 * Manager.i.sizeManager.scaleY);
	},

	setRound: function(round){
		// set passed rounds
		if(round.toString().length > 3){
			this.components.roundNum.setText(Lang.i.getWord("gameOverWave") + round);
		}else{
			var result = "";
			var rest = 3 - round.toString().length;
			for(var i = 0; i < rest; i++){
				result += "0";
			}
			result += round;
			this.components.roundNum.setText(Lang.i.getWord("gameOverWave") + result);
		}
		
		// set result round coordinates
		this.components.roundNum.x = this.components.viewWindow.x + ((this.components.viewWindow.width - this.components.roundNum.width) / 2);
		this.components.roundNum.y = this.components.viewWindow.y + (Manager.i.sizeManager.getPointText() + 
							Manager.i.sizeManager.getResultText()) + (195 * Manager.i.sizeManager.scaleY);
	},

	setScoreTextParams: function(comps){
		// set result score text coordinates
		comps.scoreText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.scoreText.width) / 2);
		comps.scoreText.y = comps.viewWindow.y + Manager.i.sizeManager.getPointText() + (120 * Manager.i.sizeManager.scaleY);
		comps.scoreText.tint = 0x767676;
	},

	setRoundTextParams: function(comps){
		// set result round text coordinates
		comps.roundText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.roundText.width) / 2);
		comps.roundText.y = comps.viewWindow.y + ((Manager.i.sizeManager.getPointText() * 2) + 
							Manager.i.sizeManager.getResultText()) + (205 * Manager.i.sizeManager.scaleY);
		comps.roundText.tint = 0x767676;
	},

	setMenuParams: function(comps){
		// set menu coordinates
		comps.menuText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.menuText.width) / 2);
		comps.menuText.y = (comps.viewWindow.height + comps.viewWindow.y) - Manager.i.sizeManager.getPointText() - (80 * Manager.i.sizeManager.scaleY);
	},

	setAgainParams: function(comps){
		// set again coordinates
		comps.againText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.againText.width) / 2);
		comps.againText.y = (comps.viewWindow.height + comps.viewWindow.y) - (Manager.i.sizeManager.getPointText() * 2) - (140 * Manager.i.sizeManager.scaleY);
	},

	viewGameOverTouch: function(view, event){
		var clickedPoint = Manager.i.isClicked(event, [{name: "menu", entity: this.components.menuText},
												  	   {name: "again", entity: this.components.againText}]);

		switch(clickedPoint){
			case "menu":
				// hide game over and game pages and show main page
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME_OVER);
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_MAIN);
				break;
			case "again":
				// hide game over and restart game
				Manager.i.restartGame();
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME_OVER);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_GAME);
				break;
			default:
				break;
		}
	},

	show: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = true;
				this.components[prop].visible = true;
			}
		}
	},

	hide: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = false;
				this.components[prop].visible = false;
			}
		}
	},

	setComponents: function(components){
		this.components = components;
	},

	getComponents: function(){
		return this.components;
	}
},{
	WINDOW_RED: "res/images/window_red.png"
});