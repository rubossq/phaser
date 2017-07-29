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
		var langType = lang.split("-")[0];
		switch(langType){
			case Lang.EN_LANG:
				this.locale = Lang.EN_LANG;
				break;
			case Lang.RU_LANG:
				this.locale = Lang.RU_LANG;
				//break;
			default:
				this.locale = Lang.EN_LANG;
				break;
		}
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
		this.wordsEN.mainTitle = "ST   R TYPE GO";
		this.wordsEN.mainSettings = "Settings";
		this.wordsEN.mainStart = "Start game";
		this.wordsEN.mainExit = "Exit";

		this.wordsEN.settingsTitle = "SETTINGS";
		this.wordsEN.settingsBack = "Back to menu";
		this.wordsEN.settingsContacts = "Contacts";
		this.wordsEN.settingsRate = "Rate app";
		this.wordsEN.settingsSound = "Sound";
		this.wordsEN.settingsSoundOn = "ON";
		this.wordsEN.settingsSoundOff = "OFF";

		this.wordsEN.roundNum = "Round number ";

		this.wordsEN.pauseTitle = "PAUSE";
		this.wordsEN.pauseSound = "Sound";
		this.wordsEN.pauseSoundOn = "ON";
		this.wordsEN.pauseSoundOff = "OFF";
		this.wordsEN.pauseMenu = "Main menu";
		this.wordsEN.pauseResume = "Resume";

		this.wordsEN.gameOverTitle = "GAME OVER";
		this.wordsEN.gameOverScore = "Final score";
		this.wordsEN.gameOverWave = "Wave ";
		this.wordsEN.gameOverRound = "You reached";
		this.wordsEN.gameOverMenu = "Main menu";
		this.wordsEN.gameOverAgain = "Try again";
	},

	pushWordsRU: function(){
		this.wordsRU.mainTitle = "ST   R TYPE GO";
		this.wordsRU.mainSettings = "Настройки";
		this.wordsRU.mainStart = "Начать игру";
		this.wordsRU.mainExit = "Выход";

		this.wordsRU.settingsTitle = "НАСТРОЙКИ";
		this.wordsRU.settingsBack = "Вернуться назад";
		this.wordsRU.settingsContacts = "Контакты";
		this.wordsRU.settingsRate = "Оценить приложение";
		this.wordsRU.settingsSound = "Звук";
		this.wordsRU.settingsSoundOn = "ВКЛ";
		this.wordsRU.settingsSoundOff = "ВЫКЛ";

		this.wordsRU.roundNum = "Раунд ";

		this.wordsRU.pauseTitle = "ПАУЗА";
		this.wordsRU.pauseSound = "Звук";
		this.wordsRU.pauseSoundOn = "ВКЛ";
		this.wordsRU.pauseSoundOff = "ВЫКЛ";
		this.wordsRU.pauseMenu = "Главное меню";
		this.wordsRU.pauseResume = "Продолжить";

		this.wordsRU.gameOverTitle = "Конец игры";
		this.wordsRU.gameOverScore = "Набрано очков";
		this.wordsRU.gameOverWave = "Волна ";
		this.wordsRU.gameOverRound = "Пройдено уровней";
		this.wordsRU.gameOverMenu = "Главное меню";
		this.wordsRU.gameOverAgain = "Попробовать снова";
	}
},{
	i: null,
	EN_LANG: "en",
	RU_LANG: "ru"
});