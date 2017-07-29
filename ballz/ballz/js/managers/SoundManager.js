var SoundManager = Base.extend({

	sound: true,
	music: true,
	elements: null,

	constructor: function(){
		this.sound = this.loadStorage("sound");
		console.log("sound " + this.sound);
		this.music = this.loadStorage("music");
		SoundManager.i = this;
		this.elements = new Array();
	},

	quietSoundLoad: function(id, path, simple){
		if(window.plugins && window.plugins.NativeAudio && false){
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
		}else{
			var loader = Manager.i.game.load.audio(id, path);
			//console.log("path = " + path);
			loader.onLoadComplete.addOnce(function(){
				this.elements[id] = Manager.i.game.add.audio(id);
			}, this);
		}
	},

	play: function(id){
		if(window.plugins && window.plugins.NativeAudio && false){
			if(this.sound){
				window.plugins.NativeAudio.play(id);
			}
		}else{
			//console.log("play = " + id);
			//console.log(this.elements[id]);
			if(this.sound){
				this.elements[id].play();
			}
		}
	},

	loop: function(id){
		if(window.plugins && window.plugins.NativeAudio && false){
			if(this.music){
				window.plugins.NativeAudio.loop(id);
			}
		}else{
			if(this.music){
				this.elements[id].play('', 0, 1, true);
			}
		}
	},

	stop: function(id){
		if(window.plugins && window.plugins.NativeAudio && false){
			window.plugins.NativeAudio.stop(id);
		}else{
			this.elements[id].stop();
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
		//if(typeof(Storage) !== "undefined"){
			try{
				var val = localStorage.getItem(item);
				if(val === null){
					return true;
				}
				return val == "true";
			}catch(e){

			}
		//}
		return true;
	},

	writeStorage: function(item, val){
		//if (typeof(Storage) !== "undefined"){
			try{
				var res = localStorage.setItem(item, val);
			}catch(e){

			}
		//}
	}
},{
	i: null
});

new SoundManager();