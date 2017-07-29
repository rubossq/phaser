var SkinsPage = Base.extend({

	components: null,

	constructor: function(){
		this.components = {skinsView: null, titleText: null, totalText: null, totalScore: null, needText: null, needScore: null, 
						   skinField: null, skinImage: null, leftBut: null, rightBut: null, selectBut: null, selectText: null};
	},

	preload: function(){
		SkinsManager.i.preload();
		Manager.i.game.load.image('left_but', SkinsPage.LEFT_BUT);
		Manager.i.game.load.image('right_but', SkinsPage.RIGHT_BUT);
	},

	create: function(){
		SkinsManager.i.create();

		var comps = this.components;

		// set Skins view
		comps.skinsView = Manager.i.game.add.graphics();
		this.setViewParams(comps);

		// set Skins title
		comps.titleText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("skinsTitle"), Manager.i.sizeManager.getTitleText());
		this.setTitleParams(comps);

		// set Skins total points
		comps.totalText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("skinsTotal"), Manager.i.sizeManager.getPointText());
		comps.totalScore = Manager.i.game.add.bitmapText(0, 0, "Roboto", "", Manager.i.sizeManager.getPointText());

		// set Skins need total points
		comps.needText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("skinsNeedTotal"), Manager.i.sizeManager.getPointText());
		comps.needScore = Manager.i.game.add.bitmapText(0, 0, "Roboto", "", Manager.i.sizeManager.getPointText());

		// set Skins skin field and image
		comps.skinField = Manager.i.game.add.graphics();
		comps.skinImage = SkinsManager.i.getSkin(0).entity;
		this.setSkinShowingParams(comps);

		// set Skins scroll left
		comps.leftBut = Manager.i.game.add.sprite(0, 0, "left_but");
		this.setLeftButParams(comps);

		// set Skins scroll right but
		comps.rightBut = Manager.i.game.add.sprite(0, 0, "right_but");
		this.setRightButParams(comps);

		// set Skins select skin but
		comps.selectBut = Manager.i.game.add.sprite(0, 0, "menu_oval");
		comps.selectText = Manager.i.game.add.bitmapText(0, 0, "Roboto", Lang.i.getWord("skinsSelect"), Manager.i.sizeManager.getPointText());
		this.setSelectButParams(comps);

		// handle click on skins page
		comps.skinsView.events.onInputUp.add(this.viewSkinsTouch, this);

		this.hide();
	},

	setViewParams: function(comps){
		// draw view
		comps.skinsView.beginFill(0x20232D);
		comps.skinsView.drawRect(0, 0, Manager.i.game.width, Manager.i.game.height);
		comps.skinsView.endFill();
		comps.skinsView.inputEnabled = true;
	},

	setTitleParams: function(comps){
		// set title coordinates
		comps.titleText.x = (Manager.i.game.width - comps.titleText.width) / 2;
		comps.titleText.y = Manager.i.game.height / 8 - Manager.i.sizeManager.getTitleText();
	},

	setScores: function(skin){
		var comps = this.components;

		// set total score coordinates and params
		comps.totalScore.setText(Manager.i.getShortScore(Score.i.totalScore));
		comps.totalText.x = (Manager.i.game.width / 2) - ((comps.totalText.width + (35 * Manager.i.sizeManager.scaleX) + comps.totalScore.width) / 2);
		comps.totalText.y = comps.skinField.y - (2 * Manager.i.sizeManager.getPointText()) - (100 * Manager.i.sizeManager.scaleX);
		comps.totalText.tint = 0x3C4150;
		comps.totalScore.x = comps.totalText.x + comps.totalText.width + (35 * Manager.i.sizeManager.scaleX);
		comps.totalScore.y = comps.skinField.y - (2 * Manager.i.sizeManager.getPointText()) - (100 * Manager.i.sizeManager.scaleX);

		if(skin.getInfo().score != 0){
			// set need score for skin coordinates and params
			comps.needText.setText(Lang.i.getWord("skinsNeedTotal"));
			comps.needScore.setText(Manager.i.getShortScore(skin.getInfo().score));
			if(skin.getInfo().available){
				comps.needScore.tint = 0x2EB03A;
			}else{
				comps.needScore.tint = 0xE91574;
			}

			comps.needText.x = (Manager.i.game.width / 2) - ((comps.needText.width + (35 * Manager.i.sizeManager.scaleX) + comps.needScore.width) / 2);
			comps.needText.y = comps.skinField.y - Manager.i.sizeManager.getPointText() - (60 * Manager.i.sizeManager.scaleX);
			comps.needText.tint = 0x3C4150;
			comps.needScore.x = comps.needText.x + comps.needText.width + (35 * Manager.i.sizeManager.scaleX);
			comps.needScore.y = comps.skinField.y - Manager.i.sizeManager.getPointText() - (60 * Manager.i.sizeManager.scaleX);
		}else{
			comps.needText.setText("");
			comps.needScore.setText("");
		}
	},

	setSkinShowingParams: function(comps){
		// set skin showing coordinates and sizes
		comps.skinField.beginFill(0x1D1F26);
		comps.skinField.drawRect(0, 0, 1, 1);
		comps.skinField.endFill();
		comps.skinField.width = (400 * Manager.i.sizeManager.scaleX);
		comps.skinField.height = (400 * Manager.i.sizeManager.scaleX);
		comps.skinField.x = (Manager.i.game.width - comps.skinField.width) / 2;
		comps.skinField.y = (Manager.i.game.height - comps.skinField.height) / 2;
		
		comps.skinImage.x = (Manager.i.game.width - comps.skinImage.width) / 2;
		comps.skinImage.y = (Manager.i.game.height - comps.skinImage.height) / 2;
	},

	setLeftButParams: function(comps){
		// set left but coordinates and sizes
		comps.leftBut.scale.setTo(SizeManager.i.scaleX * 1.80, SizeManager.i.scaleX * 1.80);
		comps.leftBut.x = (comps.skinField.x / 2) - (comps.leftBut.width / 2);
		comps.leftBut.y = comps.skinField.y + (comps.skinField.height / 2) - (comps.leftBut.height / 2);
	},

	setRightButParams: function(comps){
		// set right but coordinates and sizes
		comps.rightBut.scale.setTo(SizeManager.i.scaleX * 1.80, SizeManager.i.scaleX * 1.80);
		comps.rightBut.x = (comps.skinField.x + comps.skinField.width) + (comps.skinField.x / 2) - (comps.rightBut.width - 2);
		comps.rightBut.y = comps.skinField.y + (comps.skinField.height / 2) - (comps.rightBut.height / 2);
	},

	setSelectButParams: function(comps){
		// set select but coordinates and sizes
		comps.selectBut.scale.setTo(SizeManager.i.scaleX * 1.35, SizeManager.i.scaleX * 1.25);
		comps.selectBut.x = ((Manager.i.game.width - comps.selectBut.width) / 2);
		comps.selectBut.y = comps.skinField.y + comps.skinField.height + (110 * Manager.i.sizeManager.scaleX);
		comps.selectBut.tint = 0xE91574;

		comps.selectText.x = ((Manager.i.game.width - comps.selectText.width) / 2) - 2;
		comps.selectText.y = comps.selectBut.y + ((comps.selectBut.height - Manager.i.sizeManager.getPointText()) / 2) - 2;
	},

	viewSkinsTouch: function(view, event){
		var clickedPoint = Manager.i.isClicked(event, [{name: "left", entity: this.components.leftBut, type: Constant.GRAPHICS_TYPE},
													   {name: "right", entity: this.components.rightBut, type: Constant.GRAPHICS_TYPE},
													   {name: "select", entity: this.components.selectBut, type: Constant.GRAPHICS_TYPE}]);

		switch(clickedPoint){
			case "left":
				// set left skin
				NavigationManager.i.click();
				if(SkinsManager.i.hasPrev()){
					SkinsManager.i.getCurrent().hide();

					var skin = SkinsManager.i.previous();
					this.checkSkin(skin);
				}
				break;
			case "select":
				NavigationManager.i.click();
				NavigationManager.i.good();
	
				if(SkinsManager.i.getCurrent().getInfo().available){
					SkinsManager.i.select();
					ScreenManager.i.hideScreen(ScreenManager.SCREEN_SKINS);
					ScreenManager.i.showScreen(ScreenManager.SCREEN_GAME);
				}
				break;
			case "right":
				NavigationManager.i.click();
				// set right skin
				if(SkinsManager.i.hasNext()){
					SkinsManager.i.getCurrent().hide();

					var skin = SkinsManager.i.next();
					this.checkSkin(skin);
				}
				break;
			default:
				break;
		}
	},

	checkSkin: function(skin){
		// set total score and need score for skin on Skins page
		this.setScores(skin);

		if(skin.getInfo().available){
			this.components.selectBut.tint = 0xE91574;
			this.components.selectText.tint = 0xFFFFFF;
		}else{
			this.components.selectBut.tint = 0x313543;
			this.components.selectText.tint = 0x5A5D69;
		}
		this.components.skinImage = skin.entity;
		this.setSkinShowingParams(this.components);
		skin.show();
		Manager.i.game.world.bringToTop(this.components.skinImage);

		this.checkSwitchers();
	},

	checkSwitchers: function(){
		// check is there prev element
		if(SkinsManager.i.hasPrev()){
			this.components.leftBut.exists = true;
			this.components.leftBut.visible = true;
		}else{
			this.components.leftBut.exists = false;
			this.components.leftBut.visible = false;
		}

		// check is there next element
		if(SkinsManager.i.hasNext()){
			this.components.rightBut.exists = true;
			this.components.rightBut.visible = true;
		}else{
			this.components.rightBut.exists = false;
			this.components.rightBut.visible = false;
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
		// set available to skins
		SkinsManager.i.prepare();

		// set Skins params
		var skin = SkinsManager.i.next();
		this.checkSkin(skin);
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
	LEFT_BUT: "res/images/left_but.png",
	RIGHT_BUT: "res/images/right_but.png"
});