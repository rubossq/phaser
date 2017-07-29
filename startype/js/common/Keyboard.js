var Keyboard = Base.extend({

	manager: null,			// current manager
	style: null,			// style of words
	keyField: null,			// current field
	keyTop: null,			// distance to keyboard
	height: null,			// height of keyboard
	buttons: null,			// array of buttons
	butWidth: null,			// width of single but
	butHeight: null,		// height of single but
	shockWave: null,		// but for destroy wave
	waveText: null,			// count of destroy waves
	barsArr: null,			// array for bars
	textArr: null,			// array for texts

	curWord: null,
	helpBar: null,			// helping but for touched button
	helpText: null,			// helping text for touched button
	isTouch: false,			// is user start touch
	
	constructor: function(manager){
		this.manager = manager;
	},

	preload: function(){
		Manager.i.game.load.image('shockwave', Keyboard.SHOCKWAVE);
	},

	create: function(){
		// set font style
		var fontSize = Manager.i.sizeManager.getKeyboardSize();
		this.style = {font: "Arial", fontSize: fontSize, fill: "#FFFFFF"};
		// create new array for buttons
		this.buttons = new Array();
		// create new array for bars
		this.barsArr = new Array();
		// create new array for texts
		this.textArr = new Array();

		// height of keyboard
		this.height = Math.round(this.manager.game.height / 3);

		// distance from top to keyboard
		this.keyTop = this.manager.game.height - this.height;

		// width of but on keyboard
		this.butWidth = Math.floor(this.manager.game.width / Keyboard.EN_PARTS[0]);

		// height of but on keyboard
		this.butHeight = this.height / 3;

		this.draw();
		this.hide();

		Manager.i.game.input.keyboard.addCallbacks(this, null, this.onUp);
	},

	draw: function(){
		var self = this;
		// set keyboard field
		this.keyField = this.manager.game.add.graphics();
		this.keyField.beginFill(0x000000, 0.3);
		this.keyField.drawRect(0, this.keyTop, this.manager.game.width, this.height);
		this.keyField.endFill();

		// touch move on keyboard
		Manager.i.game.input.addMoveCallback(function(event){
			// check is user touches and move over the keyboard
			if(self.isTouch && event.y > self.keyTop){
				for(var i = 0; i < self.buttons.length; i++){
					if(event.x >= self.buttons[i].left && event.x <= self.buttons[i].right && 
						event.y >= self.buttons[i].top && event.y <= self.buttons[i].bottom && self.curWord != self.buttons[i].word){

						self.curWord = self.buttons[i].word;
						self.clearHelpBut();
						self.setHelpBut(self.buttons[i]);
						break;

					}
				}
			}
		}, this);

		this.setTopPart();		// set top part of keyboard
		this.setMidPart();		// set middle part of keyboard
		this.setBotPart();		// set bottom part of keyboard
		this.setWaveBut();		// set DESTROY WAVE
	},

	setTopPart: function(){
		var left = 0;
		var top = this.keyTop;
		var beginCycle = 0;
		var endCycle = Keyboard.EN_PARTS[0];

		this.setTools(left, top, beginCycle, endCycle);
	},

	setMidPart: function(){
		var left = (this.manager.game.width - (this.butWidth * Keyboard.EN_PARTS[1])) / 2;
		var top = this.keyTop + this.butHeight;
		var beginCycle = Keyboard.EN_PARTS[0];
		var endCycle = Keyboard.EN_PARTS[0] + Keyboard.EN_PARTS[1];

		this.setTools(left, top, beginCycle, endCycle);
	},

	setBotPart: function(){
		var left = (this.manager.game.width - (this.butWidth * Keyboard.EN_PARTS[2])) / 2;
		var top = (this.keyTop + (this.butHeight * 2));
		var beginCycle = Keyboard.EN_PARTS[0] + Keyboard.EN_PARTS[1];
		var endCycle = Keyboard.EN_PARTS[0] + Keyboard.EN_PARTS[1] + Keyboard.EN_PARTS[2];
		
		this.setTools(left, top, beginCycle, endCycle);
	},

	setTools: function(resLeft, resTop, beginCycle, endCycle){
		var left = resLeft;
		var top = resTop;
		// add buttons
		for(var i = beginCycle; i < endCycle; i++){
			var but = {};
			but.width = this.butWidth;				// width
			but.height = this.butHeight;			// height
			but.left = left;						// left
			but.top = top;							// top
			but.right = left + this.butWidth;		// right
			but.bottom = top + this.butHeight;		// bottom
			but.word = Keyboard.EN_WORDS[i];		// word

			var bar = this.manager.game.add.graphics();
			bar.beginFill(0x000000, 0);
			bar.drawRect(but.left, but.top, but.width, but.height);
			bar.endFill();
			this.barsArr.push(bar);

			this.buttons.push(but);
			this.setListeners(bar, but);

			left += this.butWidth;
		}

		// add words
		for(var i = beginCycle; i < endCycle; i++){
			var text = this.manager.game.add.text(0, 0, this.buttons[i].word, this.style);
			var wordLeft = this.buttons[i].left + ((this.butWidth - text.width) / 2);
			var wordTop = this.buttons[i].top + ((this.butHeight - Manager.i.sizeManager.getKeyboardSize()) / 2);
			text.x = wordLeft;
			text.y = wordTop;
			this.textArr.push(text);
		}
	},

	setWaveBut: function(){
		var self = this;
		var sideSize = ((this.manager.game.width - (this.butWidth * Keyboard.EN_PARTS[2])) / 2) / 2;
		var left = this.manager.game.width - sideSize - (sideSize / 2);
		var top = this.manager.game.height - sideSize - ((this.butHeight - sideSize) / 2);
		// set shock wave
		this.shockWave = this.manager.game.add.sprite(left, top, "shockwave");
		this.shockWave.width = sideSize;
		this.shockWave.height = sideSize;
		this.shockWave.inputEnabled = true;
		this.shockWave.events.onInputUp.add(function(){
			Manager.i.wave.blow(function(){
				self.waveText.setText(Manager.i.wave.getWaveCount());
			});
		}, this);

		var fontSize = Manager.i.sizeManager.getShockWaveSize();
		this.waveText = this.manager.game.add.text(0, 0, "", {font: "Arial", fontSize: fontSize, fill: "#FFFFFF"});
		this.waveText.setText("0");
		this.waveText.x = this.shockWave.x + ((this.shockWave.width - this.waveText.width) / 2);
		this.waveText.y = this.shockWave.y + ((this.shockWave.height - this.waveText.height) / 2) + 3;
	},

	onUp: function(event){
		if(Manager.i.roundManager.isGame() && !Manager.i.game.paused){
			//Manager.i.wave.blow();
			Manager.i.enemyManager.tryFire(event.key.toLowerCase());
		}else{
			//console.log("no game");
		}
	},

	setListeners: function(bar, but){
		var self = this;
		bar.inputEnabled = true;

		// touch start
		bar.events.onInputDown.add(function(bar){
			if(self.curWord !== null){
				Manager.i.enemyManager.tryFire(self.curWord.toLowerCase());
			}
			self.clearHelpBut();
			
			self.curWord = but.word;
			self.isTouch = true;
			
			self.setHelpBut(but);
		}, this);

		// touch end
		bar.events.onInputUp.add(function(bar){
			self.clearHelpBut();

			if(self.curWord !== null){
				Manager.i.enemyManager.tryFire(self.curWord.toLowerCase());
				self.curWord = null;
			}
			self.isTouch = false;
		}, this);
	},

	setHelpBut: function(but){
		var left = but.left;
		var top = but.top - ((this.butHeight * 1.5) - this.butHeight);
		var width = but.width;
		var height = but.height + ((this.butHeight * 1.5) - this.butHeight);

		this.helpBar = this.manager.game.add.graphics();
		this.helpBar.beginFill(0x29C9BE, 0.88);
		this.helpBar.drawRoundedRect(left, top, width, height, 5);

		this.helpText = this.manager.game.add.text(0, 0, but.word, this.style);
		var wordLeft = left + ((this.butWidth - this.helpText.width) / 2);
		var wordTop = top + (this.butHeight / 6);
		this.helpText.x = wordLeft;
		this.helpText.y = wordTop;
	},

	clearHelpBut: function(){
		if(this.helpBar !== null && this.helpText !== null){
			this.helpBar.destroy();
			this.helpText.destroy();
		}

		this.helpBar = null;
		this.helpText = null;
	},

	show: function(){
		// show keyboard
		this.keyField.exists = true;
		this.keyField.visible = true;

		// show wave
		this.shockWave.exists = true;
		this.waveText.visible = true;

		// show bars and texts
		for(var i = 0; i < this.buttons.length; i++){
			this.barsArr[i].exists = true;
			this.barsArr[i].visible = true;

			this.textArr[i].exists = true;
			this.textArr[i].visible = true;
		}
	},

	hide: function(){
		// hide bars and texts
		for(var i = 0; i < this.buttons.length; i++){
			this.barsArr[i].exists = false;
			this.barsArr[i].visible = false;

			this.textArr[i].exists = false;
			this.textArr[i].visible = false;
		}
		// hide keyboard
		this.keyField.exists = false;
		this.keyField.visible = false;

		// show wave
		this.shockWave.exists = false;
		this.waveText.visible = false;

	},

	setManager: function(manager){
		this.manager = manager;
	},

	getManager: function(){
		return this.manager;
	},

	getHeight: function(){
		return this.height;
	},

	setButtons: function(buttons){
		this.buttons = buttons;
	},

	getButtons: function(){
		return this.buttons;
	},

	setWaveCount: function(count){
		this.waveText.setText(count);
	}
},
{
	EN_WORDS: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
	EN_PARTS: [10, 9, 7],
	RU_WORDS: ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"],
	RU_PARTS: [12, 11, 9],
	SHOCKWAVE: "res/images/shockwave.png"
});