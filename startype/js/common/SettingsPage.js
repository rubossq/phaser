var SettingsPage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {settingsView: null, viewWindow: null, titleText: null, backText: null,
							soundText: null, soundStatusText: null, rateText: null, contactsText: null};
	},

	preload: function(){
		
	},

	create: function(){
		var comps = this.components;

		// set Settings view
		comps.settingsView = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Settings window
		comps.viewWindow = Manager.i.game.add.sprite(0, 0, 'window_blue');
		this.setWindowParams(comps);

		// set Settings title
		comps.titleText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("settingsTitle"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set Settings back
		comps.backText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("settingsBack"), Manager.i.sizeManager.getPointText());
		this.setBackParams(comps);

		// set Settings contacts
		comps.contactsText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("settingsContacts"), Manager.i.sizeManager.getPointText());
		this.setContactsParams(comps);

		// set Settings rate app
		comps.rateText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("settingsRate"), Manager.i.sizeManager.getPointText());
		this.setRateParams(comps);

		// set Settings sound
		comps.soundText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("settingsSound"), Manager.i.sizeManager.getPointText());
		comps.soundStatusText = Manager.i.game.add.bitmapText(0, 0, "Neuropol", 
														Lang.i.getWord("settingsSoundOn"), Manager.i.sizeManager.getPointText());
		this.setSoundParams(comps);

		// handle click on settings page
		comps.settingsView.events.onInputUp.add(this.viewSettingsTouch, this);

		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.settingsView.beginFill(0x000000, 0);
		comps.settingsView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.settingsView.endFill();
		comps.settingsView.inputEnabled = true;
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

	setBackParams: function(comps){
		// set back coordinates
		comps.backText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.backText.width) / 2);
		comps.backText.y = (comps.viewWindow.height + comps.viewWindow.y) - (comps.viewWindow.height / 4) + (50 * Manager.i.sizeManager.scaleY);
	},

	setContactsParams: function(comps){
		// set contacts coordinates
		comps.contactsText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.contactsText.width) / 2);
		comps.contactsText.y = comps.viewWindow.y + (comps.viewWindow.height / 2) - Manager.i.sizeManager.getPointText();
	},

	setRateParams: function(comps){
		// set rate coordinates
		comps.rateText.x = comps.viewWindow.x + ((comps.viewWindow.width - comps.rateText.width) / 2);
		comps.rateText.y = comps.viewWindow.y + (comps.viewWindow.height / 2) - (Manager.i.sizeManager.getPointText() * 2) - (80 * Manager.i.sizeManager.scaleY);
	},

	setSoundParams: function(comps){
		// set sound coordinates
		comps.soundText.x = (Manager.i.game.width / 2) - ((comps.soundText.width + comps.soundStatusText.width + (30 * Manager.i.sizeManager.scaleX)) / 2);
		comps.soundText.y = comps.viewWindow.y + (comps.viewWindow.height / 2) - (Manager.i.sizeManager.getPointText() * 3) - (160 * Manager.i.sizeManager.scaleY);

		comps.soundStatusText.x = comps.soundText.x + comps.soundText.width + (30 * Manager.i.sizeManager.scaleX);
		comps.soundStatusText.y = comps.viewWindow.y + (comps.viewWindow.height / 2) - (Manager.i.sizeManager.getPointText() * 3) - (160 * Manager.i.sizeManager.scaleY);
		comps.soundStatusText.tint = 0x1495F5;
	},

	viewSettingsTouch: function(view, event){
		var clickedPoint = Manager.i.isClicked(event, [{name: "back", entity: this.components.backText},
												  	   {name: "contacts", entity: this.components.contactsText},
												  	   {name: "rate", entity: this.components.rateText},
												  	   {name: "sound", entity: this.components.soundText},
												  	   {name: "soundStatus", entity: this.components.soundStatusText}]);

		switch(clickedPoint){
			case "back":
				// hide settings page and show main page
				Manager.i.screenManager.hideScreen(ScreenManager.SCREEN_SETTINGS);
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_MAIN);
				break;
			case "contacts":
				// show contacts
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl('mailto:' + Constant.MAIL, {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						//window.open("https://itunes.apple.com/app/" + Constant.APP_STRING_IOS_NAME + "/" + Constant.APP_STRING_IOS_ID, '_service', 'location=yes');
						break;
				}
				break;
			case "rate":
				// show rate
				switch(Constant.CUR_DEVICE){
					case Constant.ANDROID_DEVICE:
						navigator.app.loadUrl("https://play.google.com/store/apps/details?id=" + Constant.APP_PACKAGE, {openExternal : true});
						break;
					case Constant.IOS_DEVICE:
						window.open("https://itunes.apple.com/app/" + Constant.APP_STRING_IOS_NAME + "/" + Constant.APP_STRING_IOS_ID, '_service', 'location=yes');
						break;
				}
				break;
			case "sound":
				// turn on or turn off sound
				if(Manager.i.sound){
					this.components.soundStatusText.setText(Lang.i.getWord("settingsSoundOff"));
				}else{
					this.components.soundStatusText.setText(Lang.i.getWord("settingsSoundOn"));
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
});