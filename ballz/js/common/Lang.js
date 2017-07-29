var Lang = Base.extend({

	locale: null,
	wordsEN: null,
	wordsRU: null,
	
	constructor: function(){
		Lang.i = this;

		this.wordsEN = {};
		this.wordsRU = {};

		this.defineLang();
		this.pushWordsEN();
		this.pushWordsRU();
	},

	defineLang: function(){
		var lang = navigator.language || navigator.userLanguage;
		/*switch(lang){
			case Lang.EN_LANG:
				this.locale = Lang.EN_LANG;
				break;
			case Lang.RU_LANG:
				this.locale = Lang.RU_LANG;
				break;
			default:
				this.locale = Lang.EN_LANG;
				break;
		}*/
		this.locale = Lang.EN_LANG;
	},
	
	setLocale: function(locale){
		this.locale = locale;
	},

	getLocale: function(){
		return this.locale;
	},

	getWord: function(word){
		switch(this.locale){
			case Lang.EN_LANG:
				return this.wordsEN["" + word];
			case Lang.RU_LANG:
				return this.wordsRU["" + word];
			default:
				return this.wordsEN["" + word];
		}
	},

	pushWordsEN: function(){
		this.wordsEN.mainTitle1 = "ROYAL";
		this.wordsEN.mainTitle2 = "BALLZ";
		this.wordsEN.mainStart = "PLAY";
		this.wordsEN.mainRate = "RATE";
		this.wordsEN.mainTotal = "Total";

		this.wordsEN.gameBest = "Best";

		this.wordsEN.pauseTitle = "PAUSE";
		this.wordsEN.pauseResume = "RESUME";
		this.wordsEN.pauseRestart = "RESTART";
		this.wordsEN.pauseMenu = "MAIN MENU";
		this.wordsEN.pauseRate = "RATE";

		this.wordsEN.gameOverTitle = "GAME OVER";
		this.wordsEN.gameOverBest = "Best";
		this.wordsEN.gameOverTotal = "Total";
		this.wordsEN.gameOverRestart = "RESTART";
		this.wordsEN.gameOverMenu = "MAIN MENU";
		this.wordsEN.gameOverRate = "RATE";

		this.wordsEN.skinsTitle = "SKINS";
		this.wordsEN.skinsSelect = "SELECT";
		this.wordsEN.skinsTotal = "Total";
		this.wordsEN.skinsNeedTotal = "Need total";

		this.wordsEN.tutorialSlide1 = "Slide up";
		this.wordsEN.tutorialSlide2 = "to shoot";
		this.wordsEN.tutorialDeadLine = "Dead line";
	},

	pushWordsRU: function(){
		this.wordsRU.mainTitle1 = "ROYAL";
		this.wordsRU.mainTitle2 = "BALLZ";
		this.wordsRU.mainStart = "НАЧАТЬ";
		this.wordsRU.mainRate = "ОЦЕНИТЬ";
		this.wordsRU.mainTotal = "Всего";

		this.wordsRU.gameBest = "Лучший";

		this.wordsRU.pauseTitle = "ПАУЗА";
		this.wordsRU.pauseResume = "ПРОДОЛЖИТЬ";
		this.wordsRU.pauseRestart = "ЗАНОВО";
		this.wordsRU.pauseMenu = "ГЛАВНОЕ МЕНЮ";
		this.wordsRU.pauseRate = "ОЦЕНИТЬ";

		this.wordsRU.gameOverTitle = "КОНЕЦ ИГРЫ";
		this.wordsRU.gameOverBest = "Лучший";
		this.wordsRU.gameOverTotal = "Всего";
		this.wordsRU.gameOverRestart = "ЗАНОВО";
		this.wordsRU.gameOverMenu = "ГЛАВНОЕ МЕНЮ";
		this.wordsRU.gameOverRate = "ОЦЕНИТЬ";

		this.wordsRU.skinsTitle = "СКИНЫ";
		this.wordsRU.skinsSelect = "ВЫБРАТЬ";
		this.wordsRU.skinsTotal = "Всего";
		this.wordsRU.skinsNeedTotal = "Требуется всего";

		this.wordsRU.tutorialSlide1 = "Проведите вверх";
		this.wordsRU.tutorialSlide2 = "чтобы начать";
		this.wordsRU.tutorialDeadLine = "Линия конца";
	}
},{
	i: null,
	EN_LANG: "en",
	RU_LANG: "ru"
});