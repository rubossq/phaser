var Helper = Base.extend({

	constructor: function(){
		Helper.i = this;
	},

	randomInteger: function(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	},

	setSizes: function(){
		Helper.PADDING_TRACE_VAL *= SizeManager.i.scaleX;
	},

	getBoxWidth: function(){
		var s = Manager.i.game.width/(BoxesManager.MAX_IN_ROW+1) + Helper.PADDING_TRACE_VAL;
		return s;
	},

	getPadding: function(){
		var padding = this.getBoxWidth() / (BoxesManager.MAX_IN_ROW + 1) - Helper.PADDING_TRACE_VAL;
		//console.log("padding = " + padding);
		return padding;
	}

},{
	i: null,
	PADDING_TRACE_VAL: 10
});

new Helper();