var Sizer = Base.extend({

	constructor: function(){
		Sizer.i = this;
	},

	prepareSizes: function(scaleX, scaleY){
		Sizer.BULLET_SPEED = Sizer.BULLET_SPEED * scaleY;
		Sizer.ENEMY_SPEED_SMALL = Sizer.ENEMY_SPEED_SMALL * scaleY;
		Sizer.ENEMY_SPEED_MIDDLE = Sizer.ENEMY_SPEED_MIDDLE * scaleY;
		Sizer.ENEMY_SPEED_BIG = Sizer.ENEMY_SPEED_BIG * scaleY;
		
	}

}, {
	i: null,
	TARGET_GAME_WIDTH: 981,
	TARGET_GAME_HEIGHT: 1572,
	BULLET_SPEED: null,
	ENEMY_SPEED_SMALL: null,
	ENEMY_SPEED_MIDDLE: null,
	ENEMY_SPEED_BIG: null
});

new Sizer();