var PausePage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {pauseView: null, viewWindow: null, titleText: null, soundText: null, 
							soundStatusText: null, menuText: null, resumeText: null};
	},

	preload: function(){
		
	},

	create: function(){
		var comps = this.components;

		// set Pause view
		comps.pauseView = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Pause window
		comps.viewWindow = Manager.i.game.add.sprite(0, 0, 'window_blue');
		this.setWindowParams(comps);

		// set Pause title
		comps.titleText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("pauseTitle"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set Pause sound
		comps.soundText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("pauseSound"), Manager.i.sizeManager.getPointText());
		comps.soundStatusText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("settingsSoundOn"), Manager.i.sizeManager.getPointText());
		this.setSoundParams(comps);

		// set Pause menu
		comps.menuText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("pauseMenu"), Manager.i.sizeManager.getPointText());
		this.setMenuParams(comps);

		// set Pause resume
		comps.resumeText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("pauseResume"), Manager.i.sizeManager.getPointText());
		this.setResumeParams(comps);

		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.pauseView.beginFill(0x000000, 0.7);
		comps.pauseView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.pauseView.endFill();
		comps.pauseView.inputEnabled = true;
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

	setSoundParams: function(comps){
		// set sound coordinates
		comps.soundText.x = (Manager.i.game.width / 2) - ((comps.soundText.width + comps.soundStatusText.width + (30 * Manager.i.sizeManager.scaleX)) / 2);
		comps.soundText.y = comps.viewWindow.y + (comps.viewWindow.height / 4) - (Manager.i.sizeManager.getPointText() / 2);

		comps.soundStatusText.x = comps.soundText.x + comps.soundText.width + (30 * Manager.i.sizeManager.scaleX);
		comps.soundStatusText.y = comps.viewWindow.y + (comps.viewWindow.height / 4) - (Manager.i.sizeManager.getPointText() / 2);
		comps.soundStatusText.tint = 0x1495F5;
	},

	setMenuParams: function(comps){
		// set menu coordinates
		comps.menuText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.menuText.width) / 2);
		comps.menuText.y = (comps.viewWindow.y + comps.viewWindow.height) - (comps.viewWindow.height / 4) + 
							(40 * Manager.i.sizeManager.scaleY);
	},

	setResumeParams: function(comps){
		// set resume coordinates
		comps.resumeText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.resumeText.width) / 2);
		comps.resumeText.y = (comps.viewWindow.y + comps.viewWindow.height) - (comps.viewWindow.height / 4) - 
								Manager.i.sizeManager.getPointText() - (40 * Manager.i.sizeManager.scaleY);
	},

	viewPauseTouch: function(event){
		if(Manager.i.game.paused){
			var clickedPoint = Manager.i.isClicked(event, [{name: "sound", entity: this.components.soundText},
														   {name: "soundStatus", entity: this.components.soundStatusText},
													  	   {name: "menu", entity: this.components.menuText},
													  	   {name: "resume", entity: this.components.resumeText}]);

			switch(clickedPoint){
				case "sound":
					// turn on or turn off sound
					if(Manager.i.sound){
						this.components.soundStatusText.setText(Lang.i.getWord("pauseSoundOff"));
					}else{
						this.components.soundStatusText.setText(Lang.i.getWord("pauseSoundOn"));
					}
					Manager.i.soundChange();
					this.setSoundParams(this.components);
					break;
				case "soundStatus":
					// turn on or turn off sound
					if(Manager.i.sound){
						this.components.soundStatusText.setText(Lang.i.getWord("settingsSoundOff"));
					}else{
						this.components.soundStatusText.setText(Lang.i.getWord("settingsSoundOn"));
					}
					Manager.i.soundChange();
					this.setSoundParams(this.components);
					break;
				case "menu":
					// hide pause and game pages and show main page
					Manager.i.game.paused = false;
					Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_PAUSE);
					Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_GAME);
					Manager.i.screenManager.showScreen(ScreenManager.SCREEN_MAIN);
					break;
				case "resume":
					// resume the game
					Manager.i.game.paused = false;
					Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_PAUSE);
					break;
				default:
					break;
			}
		}
	},
	
	show: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = true;
				this.components[prop].visible = true;
				Manager.i.game.world.bringToTop(this.components[prop]);
			}
		}
		// handle click on pause page
		Manager.i.game.input.onDown.add(this.viewPauseTouch, this);
	},

	hide: function(){
		for (var prop in this.components){
			if(this.components.hasOwnProperty(prop)){
				this.components[prop].exists = false;
				this.components[prop].visible = false;
			}
		}
		// unhandle click on pause page
		Manager.i.game.input.onDown.remove(this.viewPauseTouch, this);
	},

	setComponents: function(components){
		this.components = components;
	},

	getComponents: function(){
		return this.components;
	}
});