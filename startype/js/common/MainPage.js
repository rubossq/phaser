var MainPage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {mainView: null, viewWindow: null, titleText: null, settingsText: null, 
							startText: null, exitText: null};
	},

	preload: function(){
		Manager.i.game.load.image('window_blue', MainPage.WINDOW_BLUE);
		Manager.i.game.load.bitmapFont('Neuropol', MainPage.FONT_IMAGE, MainPage.FONT_MAP);
	},

	create: function(){
		var comps = this.components;

		// set Main view
		comps.mainView = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Main window
		comps.viewWindow = Manager.i.game.add.sprite(0, 0, 'window_blue');
		this.setWindowParams(comps);

		// set Main title
		comps.titleText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("mainTitle"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set Main settings
		comps.settingsText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("mainSettings"), Manager.i.sizeManager.getPointText());
		this.setSettingsParams(comps);

		// set Main contacts
		comps.startText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("mainStart"), Manager.i.sizeManager.getPointText());
		this.setStartParams(comps);

		// set Main exit
		comps.exitText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("mainExit"), Manager.i.sizeManager.getPointText());
		this.setExitParams(comps);

		// handle click on main page
		comps.mainView.events.onInputUp.add(this.viewMainTouch, this);
		
		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.mainView.beginFill(0x000000, 0);
		comps.mainView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.mainView.endFill();
		comps.mainView.inputEnabled = true;
	},

	setWindowParams: function(comps){
		// set window sizes
		comps.viewWindow.width = Manager.i.game.width * 0.8;
		comps.viewWindow.height = Manager.i.game.height * 0.4;
		// set window coordinates
		comps.viewWindow.x = (Manager.i.game.width - comps.viewWindow.width) / 2;
		comps.viewWindow.y = Manager.i.game.height - comps.viewWindow.height - (50 * Manager.i.sizeManager.scaleY);
	},

	setTitleParams: function(comps){
		// set title coordinates
		comps.titleText.x = (Manager.i.game.width - comps.titleText.width) / 2;
		comps.titleText.y = (Manager.i.game.height / 8) - (Manager.i.sizeManager.getTitleText() / 2);
	},

	setSettingsParams: function(comps){
		// set settings coordinates
		comps.settingsText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.settingsText.width) / 2);
		comps.settingsText.y = comps.viewWindow.y + (comps.viewWindow.height / 2) - (Manager.i.sizeManager.getPointText() / 2);
	},

	setStartParams: function(comps){
		// set start coordinates
		comps.startText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.startText.width) / 2);
		comps.startText.y = comps.viewWindow.y + (comps.viewWindow.height / 2) - Manager.i.sizeManager.getPointText() - 
							(Manager.i.sizeManager.getPointText() / 2) - (80 * Manager.i.sizeManager.scaleY);
	},

	setExitParams: function(comps){
		// set exit coordinates
		comps.exitText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.exitText.width) / 2);
		comps.exitText.y = comps.viewWindow.y + (comps.viewWindow.height / 2) + (Manager.i.sizeManager.getPointText() / 2) + 
							(80 * Manager.i.sizeManager.scaleY);
	},

	viewMainTouch: function(view, event){
		var clickedPoint = Manager.i.isClicked(event, [{name: "settings", entity: this.components.settingsText},
													   {name: "start", entity: this.components.startText},
													   {name: "exit", entity: this.components.exitText}]);

		switch(clickedPoint){
			case "settings":
				// hide main page and show settings page
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_MAIN);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_SETTINGS);
				break;
			case "start":
				// hide main page and begin game
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_MAIN);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_GAME);
				break;
			case "exit":
				// exit game
				if(navigator.device){
					navigator.device.exitApp();
				}else if(navigator.app){
					navigator.app.exitApp();
				}else{
					window.close();
				}
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
	},

	getTitle: function(){
		return this.components.titleText;
	}
},{
	WINDOW_BLUE: 'res/images/window_blue.png',
	FONT_IMAGE: "res/fonts/Neuropol.png",
	FONT_MAP: "res/fonts/Neuropol.fnt"
});