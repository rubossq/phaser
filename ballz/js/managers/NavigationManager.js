var NavigationManager = Base.extend({

	constructor: function(){
		NavigationManager.i = this;
	},

	preload: function(){
		SoundManager.i.quietSoundLoad("good_sound", NavigationManager.GOOD_SOUND, true);
		SoundManager.i.quietSoundLoad("click_sound", NavigationManager.CLICK_SOUND, true);
	},

	click: function(){
		SoundManager.i.play("click_sound");
	},

	good: function(){
		SoundManager.i.play("good_sound");
	}

},{
	i: null,
	GOOD_SOUND: "res/sounds/good.ogg",
	CLICK_SOUND: "res/sounds/click.ogg",
});

new NavigationManager();