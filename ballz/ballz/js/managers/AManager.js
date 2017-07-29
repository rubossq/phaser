var AdManager = Base.extend({

	interstitial:null,
	loaded: false,

	constructor: function(){

		if (window.Cocoon && Cocoon.Ad && Cocoon.Ad.MoPub) {
			Cocoon.Ad.AdMob.configure({
			    android: {
			         interstitial: Constant.AD
			    }
			});

			this.create();
		}
		AdManager.i = this;
	},

	create: function(){
		console.log("Interstitial create");
		this.interstitial = Cocoon.Ad.AdMob.createInterstitial();

		this.interstitial.on("load", this.loadListener);
		this.interstitial.on("fail", this.failListener);
		this.interstitial.on("show", this.showListener);
		this.interstitial.on("dismiss", this.dismissListener);
		this.interstitial.load();
	},

	loadListener: function(){
		 console.log("Interstitial loaded");
		 AdManager.i.loaded = true;
	},

	failListener: function(){
		console.log("Interstitial failed");
		AdManager.i.loaded = false;
		AdManager.i.create();
	},

	showListener: function(){
		console.log("Interstitial shown");
	},

	dismissListener: function(){
		console.log("Interstitial dismissed");
		AdManager.i.loaded = false;
		AdManager.i.create();
	},
	
	show: function(){
		console.log("Interstitial show try");
		if(AdManager.i.loaded){
			console.log("showwww");
		
			AdManager.i.interstitial.show();	
		}
	}
				
},{
	i: null
});

