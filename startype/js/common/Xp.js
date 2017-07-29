var Xp = Base.extend({

	entity: null,
	count: null,
	font: null,
	
	constructor: function(obj){
		this.entity = obj.entity;
		this.count = obj.count;
		this.font = obj.font;
	},

	update: function(){
		
	},

	preload: function(){
		
	},

	up: function(){
		
	},
	
	setEntity: function(entity){
		this.entity = entity;
	},

	getEntity: function(){
		return this.entity;
	},

	setCount: function(count){
		this.count = count;
	},

	getCount: function(){
		return this.count;
	},

	setFont: function(font){
		this.font = font;
	},

	getFont: function(){
		return this.font;
	}
});