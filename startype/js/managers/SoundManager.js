var SoundManager = Base.extend({

	sound: true,
	music: true,
	
	constructor: function(){
		this.sound = this.loadStorage("sound");
		this.music = this.loadStorage("music");
		SoundManager.i = this;
	},

	quietSoundLoad: function(id, path, simple){
		if(window.plugins && window.plugins.NativeAudio){
			if(simple){
				window.plugins.NativeAudio.preloadSimple(id, path, function(msg){
			    }, function(msg){
			        console.log( 'error: ' + msg );
			    });
			}else{
				window.plugins.NativeAudio.preloadComplex(id, path, 1.0, 1, 0, function(msg){
			    }, function(msg){
			        console.log( 'error: ' + msg );
			    });
			}
		}
	},

	play: function(id){
		if(window.plugins && window.plugins.NativeAudio){
			window.plugins.NativeAudio.play(id);
		}
	},

	changeSound: function(){
		this.sound = !this.sound;
		this.writeStorage("sound", this.sound);
	},

	changeMusic: function(){
		this.music = !this.music;
		this.writeStorage("music", this.music);
	},

	loadStorage: function(item){
		if (typeof(Storage) !== "undefined") {
		    var val = localStorage.getItem(item);
		    return val == true;
		}
		return true;
	},

	writeStorage: function(item, val){
		if (typeof(Storage) !== "undefined") {
		   localStorage.setItem(item, val);
		}
	}
},{
	i: null
});

new SoundManager();