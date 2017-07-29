var RoundManager = Base.extend({

	round: null,
	limits: null,
	xp: null,
	manager: null,

	lowLimit: null,
	middleLimit: null,
	bigLimit: null,

	lowKilled: null,
	middleKilled: null,
	bigKilled: null,

	lowTime: null,
	middleTime: null,
	bigTime: null,
	score: null,
	interstitial: null,

	constructor: function(manager){
		this.manager = manager;
		this.round = new Round(this);
		this.score = new Score(this);
	},

	preload: function(){
	},

	fillLimits: function(){
		
	},

	nextRound: function(){
		this.round.up();
		
		this.lowKilled = 0;
		this.middleKilled = 0;
		this.bigKilled = 0;

		switch(this.round.getNum()){
			case 1:
				this.lowLimit = 4;
				this.middleLimit = 0;
				this.bigLimit = 0;

				this.lowTime = 1200;
				this.middleTime = 1000;
				this.bigTime = 1000;
				break;
			case 2:
				this.lowLimit = 5;
				this.middleLimit = 0;
				this.bigLimit = 0;

				this.lowTime = 1200;
				this.middleTime = 0;
				this.bigTime = 0;
				break;
			case 3:
				this.lowLimit = 6;
				this.middleLimit = 0;
				this.bigLimit = 0;

				this.lowTime = 1100;
				this.middleTime = 0;
				this.bigTime = 0;
				break;
			case 4:
				this.lowLimit = 8;
				this.middleLimit = 1;
				this.bigLimit = 0;

				this.lowTime = 1100;
				this.middleTime = 2200;
				this.bigTime = 0;
				break;
			case 5:
				this.lowLimit = 9;
				this.middleLimit = 1;
				this.bigLimit = 0;

				this.lowTime = 1100;
				this.middleTime = 2200;
				this.bigTime = 0;
				break;
			case 6:
				this.lowLimit = 11;
				this.middleLimit = 1;
				this.bigLimit = 0;

				this.lowTime = 1100;
				this.middleTime = 3000;
				this.bigTime = 0;
				break;
			case 7:
				this.lowLimit = 7;
				this.middleLimit = 2;
				this.bigLimit = 1;

				this.lowTime = 1000;
				this.middleTime = 2500;
				this.bigTime = 3000;
				break;
			case 8:
				this.lowLimit = 9;
				this.middleLimit = 2;
				this.bigLimit = 1;

				this.lowTime = 1000;
				this.middleTime = 2500;
				this.bigTime = 3000;
				break;
			case 9:
				this.lowLimit = 10;
				this.middleLimit = 2;
				this.bigLimit = 1;

				this.lowTime = 900;
				this.middleTime = 2500;
				this.bigTime = 3000;
				break;
			case 10:
				this.lowLimit = 8;
				this.middleLimit = 3;
				this.bigLimit = 1;

				this.lowTime = 1000;
				this.middleTime = 3000;
				this.bigTime = 3500;
				break;
			case 10:
				this.lowLimit = 9;
				this.middleLimit = 3;
				this.bigLimit = 2;

				this.lowTime = 1100;
				this.middleTime = 3000;
				this.bigTime = 4000;
				break;
			case 11:
				this.lowLimit = 10;
				this.middleLimit = 3;
				this.bigLimit = 2;

				this.lowTime = 1000;
				this.middleTime = 3000;
				this.bigTime = 4000;
				break;
			case 12:
				this.lowLimit = 12;
				this.middleLimit = 3;
				this.bigLimit = 2;

				this.lowTime = 1000;
				this.middleTime = 3000;
				this.bigTime = 4000;
				break;
			default:
				this.lowLimit = this.randomInteger(12, 15);
				this.middleLimit = this.randomInteger(2, 4);
				this.bigLimit = this.randomInteger(1, 3);

				this.lowTime = 1000;
				this.middleTime = 2800;
				this.bigTime = 3700;
				break;
		}
		//console.log("nextRound");
		Manager.i.game.time.events.add(1500, this.roundGo, this);
		
	},

	restart: function(){
		////console.log("restart");

		this.score.resetCurScore();
		this.round.restart();
		Manager.i.ship.release();
		Manager.i.ship.setForward();
	},

	roundGo: function(){
		//console.log("roundGo");
		this.manager.enemyManager.attack(this.lowLimit, this.middleLimit, this.bigLimit, this.lowTime, this.middleTime, this.bigTime);
	},

	isGame: function(){
		return this.round.getNum() > 0;
	},

	getRandWord: function(type){
		
		var limit = 5;
		var i = 0;
		var word = "";
		var enemies = this.manager.enemyManager.getAllLive();
		////console.log(enemies);
		while(i<limit){
			word = this.getRandWordSimple(type);
			if(!this.duplicateFL(word, enemies)){
				break;
			}else{
				//console.log("we have one");
			}
			i++;
		}
		
		return word;
	},

	getRandWordSimple: function(type){
		var word = "";
		switch(type){
			case EnemyManager.ENEMY_MICRO_TYPE:
				word = RoundManager.MICRO_WORDS[this.randomInteger(0, RoundManager.MICRO_WORDS.length - 1)];
				break;
			case EnemyManager.ENEMY_SMALL_TYPE:
				word = RoundManager.SMALL_WORDS[this.randomInteger(0, RoundManager.SMALL_WORDS.length - 1)];
				break;
			case EnemyManager.ENEMY_MIDDLE_TYPE:
				word = RoundManager.MIDDLE_WORDS[this.randomInteger(0, RoundManager.MIDDLE_WORDS.length - 1)];
				break;
			case EnemyManager.ENEMY_BIG_TYPE:
				word = RoundManager.BIG_WORDS[this.randomInteger(0, RoundManager.BIG_WORDS.length - 1)];
				break;
		}
		return word;
	},

	duplicateFL: function(word, enemies){
		var l = word[0];
		for(var i=0; i<enemies.length; i++){
			//console.log("check " + l.toLowerCase() + " = " + enemies[i].firstLetter());
			if(l.toLowerCase() == enemies[i].firstLetter()){
				return true;
			}
		}

		return false;
	},

	randomInteger: function(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	},

	lose: function(){
		Manager.i.ship.blow();
		//Manager.i.ship.hide();
		Manager.i.game.time.events.add(1000, function(){
				AdManager.i.show();
				//Manager.i.ship.release();
				//Manager.i.ship.setForward();
				// set current score and round on game over page
				Manager.i.gameOverPage.setScore(this.score.getCurScore());
				Manager.i.gameOverPage.setRound(this.round.getNum());
				// show game over page
				Manager.i.screenManager.showScreen(ScreenManager.SCREEN_GAME_OVER);

				Manager.i.game.time.removeAll();
				Manager.i.game.tweens.removeAll();
		}, this);
		Manager.i.wave.hide();
		//console.log("game over");
		this.manager.enemyManager.killAll(true);
	
		// hide game params
		this.score.hide();
		Manager.i.pause.hide();
		
		Manager.i.keyboard.clearHelpBut();
		Manager.i.keyboard.isTouch = false;
		Manager.i.keyboard.hide();
	},

	win: function(){
		//console.log("win");
		Manager.i.ship.setForward();
		this.nextRound();
	},

	killedCount: function(type){
		//console.log("killed");
		var xp = 0;
		switch(type){
			case EnemyManager.ENEMY_MICRO_TYPE:
				return;
				break;
			case EnemyManager.ENEMY_SMALL_TYPE:
				this.lowKilled++;
				xp = EnemyManager.XP_SMALL;
				break;
			case EnemyManager.ENEMY_MIDDLE_TYPE:
				this.middleKilled++;
				xp = EnemyManager.XP_MIDDLE;
				break;
			case EnemyManager.ENEMY_BIG_TYPE:
				this.bigKilled++;
				xp = EnemyManager.XP_BIG;
				break;
		}
		this.score.up(xp);
		//console.log("low " + this.lowKilled + " >= " + this.lowLimit);
		//console.log("mid " + this.middleKilled + " >= " + this.middleLimit);
		//console.log("big " + this.bigKilled + " >= " + this.bigLimit);
		//console.log(this.manager.enemyManager.noAlive());

		if(this.lowKilled >= this.lowLimit && this.middleKilled >= this.middleLimit && this.bigKilled >= this.bigLimit && this.manager.enemyManager.noAlive()){
			this.win();
		}
	},

	reset: function(){
		
	},

	update: function(){
		
	},

	create: function(){
		this.round.create();
		this.score.create();
		//this.nextRound();
	},
	
	setRound: function(round){
		this.round = round;
	},

	getRound: function(){
		return this.round;
	},

	setLimits: function(limits){
		this.limits = limits;
	},

	getLimits: function(){
		return this.limits;
	},

	setXp: function(xp){
		this.xp = xp;
	},

	getXp: function(){
		return this.xp;
	},

	setScore: function(score){
		this.score = score;
	},

	getScore: function(){
		return this.score;
	}
},{
	MICRO_WORDS: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s",
				  "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"],
	SMALL_WORDS: ['ship', 'tea', 'area', 'text', 'eyes', 'has', 'army', 'on', 'ever', 'but', 'it', 'sees', 'am', 'card', 'told', 'wide', 'pack', 'shop', 'acts', 'said', 'low', 'life', 'cure', 'owe', 'to', 'hair', 'one', 'name', 'jobs', 'zero', 'fun', 'hits', 'five', 'bed', 'err', 'disc', 'full', 'red', 'bet', 'edge', 'feet', 'age', 'fail', 'bits', 'lend', 'mere', 'us', 'role', 'peak', 'bank', 'warn', 'even', 'kind', 'fell', 'bar', 'tune', 'all', 'upon', 'trip', 'bit', 'scan', 'oil', 'mile', 'hall', 'kill', 'won', 'per', 'thin', 'goes', 'boat', 'get', 'bids', 'harm', 'let', 'some', 'room', 'info', 'is', 'were', 'pass', 'will', 'box', 'log', 'uses', 'what', 'fit', 'hard', 'pick', 'wine', 'poem', 'kid', 'test', 'step', 'ate', 'says', 'gets', 'tend', 'huge', 'dead', 'late', 'loop', 'nine', 'file', 'runs', 'meet', 'may', 'land', 'lay', 'care', 'quit', 'cut', 'dark', 'fly', 'site', 'ride', 'leaf', 'ran', 'hide', 'ask', 'me', 'days', 'row', 'new', 'way', 'news', 'part', 'cent', 'very', 'girl', 'mix', 'race', 'four', 'bear', 'can', 'puts', 'for', 'out', 'core', 'that', 'term', 'ice', 'fits', 'less', 'van', 'arm', 'as', 'help', 'poor', 'disk', 'mark', 'miss', 'read', 'know', 'ugly', 'hope', 'luck', 'road', 'shut', 'omit', 'vast', 'drop', 'host', 'bus', 'see', 'seem', 'got', 'stop', 'bug', 'here', 'bad', 'sign', 'fund', 'loan', 'pen', 'both', 'bury', 'cat', 'drew', 'down', 'hear', 'sad', 'work', 'copy', 'lots', 'send', 'feed', 'via', 'flew', 'ease', 'went', 'off', 'so', 'and', 'seen', 'held', 'fine', 'use', 'door', 'gain', 'lazy', 'dry', 'wall', 'fill', 'bite', 'thus', 'an', 'need', 'ends', 'flag', 'put', 'who', 'free', 'once', 'slow', 'few', 'try', 'gap', 'lead', 'able', 'hack', 'item', 'seek', 'home', 'near', 'rest', 'hat', 'play', 'chip', 'turn', 'plus', 'pays', 'ten', 'bid', 'ages', 'fry', 'team', 'code', 'owed', 'guy', 'past', 'the', 'rule', 'ring', 'map', 'die', 'run', 'mess', 'act', 'raw', 'this', 'town', 'more', 'mad', 'mod', 'deal', 'due', 'blue', 'how', 'such', 'unit', 'sum', 'edit', 'be', 'move', 'logs', 'fish', 'lost', 'pure', 'hunt', 'yes', 'him', 'wish', 'mean', 'rush', 'lain', 'pile', 'self', 'port', 'buys', 'been', 'obey', 'old', 'busy', 'bill', 'any', 'men', 're', 'your', 'too', 'law', 'day', 'she', 'nice', 'rid', 'bind', 'kept', 'hill', 'give', 'doe', 'pain', 'west', 'deem', 'lied', 'big', 'face', 'grow', 'pint', 'bets', 'tax', 'flow', 'ones', 'wait', 'our', 'mode', 'want', 'plot', 'boy', 'mail', 'sit', 'line', 'job', 'tie', 'same', 'win', 'tree', 'aims', 'legs', 'link', 'must', 'at', 'ties', 'glad', 'inch', 'with', 'load', 'farm', 'net', 'mass', 'mind', 'dear', 'hang', 'join', 'wear', 'page', 'food', 'putt', 'he', 'dies', 'base', 'back', 'oh', 'list', 'hint', 'hold', 'my', 'onto', 'why', 'feel', 'next', 'art', 'many', 'hand', 'tin', 'vote', 'spot', 'dump', 'draw', 'sold', 'root', 'felt', 'plug', 'rare', 'two', 'boot', 'half', 'trap', 'none', 'cs', 'up', 'eat', 'junk', 'plan', 'slip', 'time', 'joke', 'asks', 'adds', 'make', 'best', 'top', 'fan', 'open', 'push', 'have', 'type', 'rate', 'sets', 'eye', 'fix', 'when', 'man', 'war', 'sure', 'char', 'live', 'band', 'rain', 'desk', 'away', 'size', 'neck', 'hole', 'sake', 'idea', 'else', 'lie', 'his', 'roll', 'odd', 'pi', 'no', 'by', 'lets', 'case', 'gone', 'into', 'fair', 'ball', 'lot', 'dumb', 'stay', 'hit', 'fate', 'ill', 'tank', 'was', 'over', 'clue', 'bore', 'nor', 'son', 'just', 'numb', 'eats', 'come', 'east', 'also', 'its', 'walk', 'bugs', 'died', 'dare', 'poet', 'pipe', 'sent', 'wins', 'sort', 'rise', 'in', 'call', 'hid', 'good', 'lady', 'till', 'aim', 'talk', 'data', 'lies', 'not', 'each', 'game', 'take', 'ban', 'last', 'joy', 'cope', 'end', 'deep', 'key', 'high', 'came', 'hour', 'ours', 'grew', 'rids', 'wise', 'sell', 'say', 'keys', 'do', 'king', 'soon', 'club', 'look', 'wore', 'safe', 'duty', 'cry', 'sale', 'hung', 'hell', 'like', 'led', 'go', 'dog', 'bars', 'tell', 'wild', 'pay', 'gave', 'book', 'heat', 'keep', 'soft', 'owes', 'wife', 'hate', 'or', 'sat', 'film', 'date', 'city', 'set', 'path', 'main', 'add', 'wire', 'find', 'saw', 'gun', 'rely', 'aid', 'now', 'year', 'lift', 'worn', 'fear', 'vice', 'lack', 'cuts', 'much', 'ago', 'side', 'cold', 'yet', 'form', 'view', 'pop', 'pool', 'fire', 'true', 'show', 'odds', 'fast', 'lose', 'fact', 'plea', 'task', 'body', 'word', 'jump', 'firm', 'hot', 'used', 'six', 'sun', 'then', 'tape', 'they', 'most', 'ways', 'of', 'if', 'we', 'mine', 'lock', 'only', 'flat', 'real', 'fall', 'laws', 'are', 'own', 'keen', 'left', 'fed', 'head', 'wind', 'took', 'week', 'vary', 'well', 'easy', 'had', 'her', 'park', 'whom', 'met', 'love', 'far', 'folk', 'cell', 'pull', 'sits', 'leg', 'than', 'poll', 'knew', 'tied', 'save', 'pair', 'gas', 'car', 'did', 'byte', 'made', 'cup', 'blow', 'suit', 'them', 'air', 'post', 'risk', 'paid', 'bulk', 'does', 'user', 'foot', 'note', 'cost', 'done', 'buy', 'long', 'from', 'loss', 'wash', 'warm', 'you'],
	MIDDLE_WORDS: ['making', 'methods', 'option', 'problems', 'phrases', 'heart', 'friends', 'traffic', 'fraction', 'elements', 'knowing', 'accords', 'exact', 'based', 'transfer', 'becoming', 'capable', 'secret', 'grant', 'losing', 'input', 'notify', 'counts', 'ground', 'careful', 'split', 'breach', 'products', 'which', 'emphasis', 'reply', 'rapidly', 'answer', 'contact', 'locking', 'guesses', 'drove', 'state', 'terribly', 'submit', 'imagine', 'assembly', 'known', 'occurred', 'deals', 'visible', 'awkward', 'distinct', 'raising', 'feels', 'harmful', 'breaking', 'frame', 'alter', 'exchange', 'exists', 'magnetic', 'afraid', 'south', 'trash', 'council', 'moving', 'randomly', 'logged', 'motion', 'replaced', 'comes', 'mistook', 'often', 'discover', 'suitable', 'school', 'novel', 'meant', 'overall', 'stages', 'several', 'students', 'biology', 'ensuring', 'shorter', 'adopting', 'becomes', 'along', 'amongst', 'talked', 'present', 'these', 'corrects', 'declared', 'useful', 'header', 'decision', 'survives', 'rights', 'uniform', 'press', 'crashing', 'having', 'director', 'subset', 'least', 'keeping', 'matter', 'satisfy', 'suddenly', 'property', 'culture', 'minutes', 'mother', 'facts', 'identity', 'sides', 'share', 'spare', 'define', 'arrives', 'relation', 'drive', 'equal', 'counter', 'float', 'reserved', 'forth', 'pieces', 'permit', 'little', 'fresh', 'restart', 'anyplace', 'attempts', 'examined', 'image', 'wonders', 'holiday', 'recall', 'avoiding', 'abuse', 'badly', 'should', 'expanded', 'central', 'found', 'others', 'fixed', 'movie', 'affected', 'shared', 'loading', 'twelve', 'coming', 'simply', 'copying', 'above', 'walks', 'packet', 'creature', 'clarify', 'angry', 'right', 'spreads', 'worded', 'books', 'confirm', 'invite', 'examples', 'fingers', 'operated', 'target', 'shuts', 'lectures', 'section', 'economic', 'lesser', 'binds', 'devices', 'bears', 'promise', 'insert', 'limiting', 'misleads', 'broke', 'degrees', 'somebody', 'teaching', 'basing', 'opens', 'flied', 'confuses', 'tried', 'tapes', 'selected', 'fiscal', 'validity', 'choice', 'resource', 'names', 'battery', 'pointed', 'close', 'types', 'telling', 'stand', 'updating', 'caught', 'maintain', 'popular', 'stayed', 'welcome', 'record', 'whether', 'drink', 'talking', 'arrived', 'gross', 'complain', 'handle', 'notice', 'horrible', 'vacation', 'remark', 'ladies', 'wooden', 'belongs', 'falling', 'total', 'nervous', 'noisy', 'covers', 'shelf', 'missed', 'months', 'title', 'update', 'usage', 'style', 'spells', 'scrap', 'regret', 'brings', 'closer', 'planning', 'issuing', 'playing', 'learn', 'grinding', 'consist', 'forcing', 'memory', 'looking', 'quits', 'agreed', 'element', 'heading', 'alive', 'remotely', 'action', 'suffice', 'codes', 'large', 'wants', 'marry', 'seeks', 'multiple', 'family', 'those', 'greatest', 'manager', 'admit', 'improve', 'copies', 'receive', 'internal', 'varies', 'needing', 'shortest', 'groups', 'thinks', 'typical', 'works', 'borrowed', 'jumps', 'exclude', 'growing', 'received', 'farthest', 'mouth', 'history', 'detailed', 'attends', 'clock', 'advise', 'paper', 'include', 'publicly', 'opposes', 'primary', 'precise', 'ticket', 'factors', 'member', 'costs', 'reduce', 'chapter', 'every', 'again', 'dollar', 'surprise', 'whereby', 'omits', 'serial', 'entire', 'argue', 'doing', 'courses', 'default', 'managed', 'damaging', 'taken', 'enough', 'avoids', 'hospital', 'detected', 'helping', 'shift', 'votes', 'wheels', 'purpose', 'problem', 'notes', 'social', 'moved', 'biggest', 'plans', 'mislead', 'suiting', 'annoys', 'appeared', 'apart', 'expected', 'marked', 'accident', 'rough', 'manuals', 'dozens', 'learns', 'takes', 'reliable', 'wondered', 'bigger', 'timing', 'enjoy', 'gather', 'degree', 'prospect', 'secure', 'started', 'affects', 'forget', 'rejected', 'freedom', 'insisted', 'reported', 'integer', 'pleases', 'eating', 'missing', 'sizes', 'power', 'cover', 'years', 'saves', 'meets', 'minded', 'varying', 'unusual', 'games', 'feasible', 'bizarre', 'field', 'tying', 'brand', 'valuable', 'measured', 'soonest', 'opposing', 'button', 'lands', 'quitting', 'stays', 'protect', 'starting', 'deliver', 'lacking', 'match', 'incident', 'remained', 'train', 'edited', 'admits', 'arranges', 'chose', 'learning', 'spread', 'phrase', 'operates', 'through', 'autumn', 'serve', 'settles', 'ready', 'bytes', 'result', 'afford', 'boards', 'defined', 'regular', 'taking', 'asking', 'lunch', 'falls', 'grateful', 'captain', 'dating', 'chain', 'aiming', 'mediums', 'devote', 'enables', 'attended', 'removal', 'flies', 'fight', 'virtue', 'rapid', 'wording', 'unwanted', 'specific', 'detect', 'basic', 'majority', 'skill', 'prevents', 'quick', 'places', 'devotes', 'likes', 'unique', 'clearest', 'governor', 'acquire', 'desire', 'dream', 'sites', 'subject', 'while', 'decide', 'stupid', 'rooms', 'almost', 'neither', 'walking', 'attend', 'graduate', 'versions', 'promised', 'search', 'build', 'faults', 'depend', 'states', 'readers', 'listing', 'loose', 'nearest', 'physical', 'opinion', 'grows', 'respect', 'driver', 'fitting', 'derive', 'global', 'without', 'trust', 'acquires', 'store', 'about', 'amusing', 'happened', 'measure', 'studying', 'equally', 'wherever', 'keyboard', 'wanted', 'quarter', 'defining', 'weeks', 'believe', 'announce', 'dinner', 'cassette', 'deletes', 'corners', 'vaguely', 'habits', 'putts', 'offices', 'react', 'doubtful', 'referred', 'doors', 'saying', 'fishes', 'noticed', 'harmless', 'figures', 'restores', 'pulling', 'ideal', 'occupies', 'angle', 'numbers', 'resulted', 'isolates', 'liable', 'backing', 'honest', 'major', 'topics', 'change', 'users', 'judge', 'street', 'computes', 'carries', 'become', 'straight', 'filed', 'touches', 'units', 'annoyed', 'widely', 'young', 'interact', 'three', 'relevant', 'coffee', 'single', 'extends', 'merely', 'clearly', 'merits', 'finger', 'score', 'dates', 'evens', 'feeling', 'firmly', 'modifies', 'wills', 'chosen', 'frequent', 'signal', 'shoot', 'apology', 'picked', 'locks', 'powerful', 'joined', 'length', 'wearing', 'edits', 'heavily', 'topic', 'numbest', 'selects', 'giving', 'circuit', 'ordering', 'outer', 'local', 'higher', 'planet', 'features', 'analysis', 'safely', 'obtain', 'finding', 'question', 'behave', 'their', 'lowest', 'fallen', 'cease', 'prefer', 'results', 'handed', 'broken', 'arrange', 'absence', 'builds', 'splits', 'caused', 'mainly', 'genuine', 'delivers', 'proper', 'walked', 'replaces', 'court', 'misses', 'hands', 'label', 'publish', 'protest', 'routine', 'earth', 'write', 'shopping', 'worst', 'behind', 'arrive', 'removed', 'always', 'music', 'models', 'although', 'folks', 'changes', 'bothered', 'identify', 'teacher', 'destroys', 'derives', 'shutting', 'variety', 'server', 'whenever', 'imply', 'analogue', 'manage', 'brought', 'terms', 'patterns', 'class', 'installs', 'accepts', 'implied', 'offered', 'today', 'range', 'accounts', 'listed', 'flashed', 'friend', 'minority', 'company', 'obvious', 'promptly', 'funny', 'starts', 'appear', 'ordered', 'solved', 'extra', 'decade', 'discs', 'offer', 'apply', 'evidence', 'marriage', 'generate', 'device', 'eraser', 'bitten', 'century', 'seeking', 'leading', 'stuck', 'people', 'faster', 'correct', 'smooth', 'personal', 'brief', 'finds', 'occasion', 'private', 'yourself', 'follows', 'owner', 'slowest', 'staff', 'combine', 'removing', 'sooner', 'horses', 'pulls', 'powers', 'bound', 'shows', 'printed', 'travel', 'hoped', 'monitor', 'colleges', 'heard', 'notices', 'attract', 'desired', 'retain', 'seminar', 'white', 'counted', 'market', 'valid', 'checked', 'southern', 'meanings', 'lights', 'thoughts', 'floor', 'whose', 'pressure', 'model', 'chaos', 'simple', 'recorded', 'fewest', 'awful', 'sections', 'enters', 'begins', 'reader', 'process', 'printout', 'citizen', 'between', 'suitably', 'contrast', 'survived', 'assuming', 'restrict', 'tested', 'records', 'token', 'touched', 'sorting', 'course', 'isolated', 'moves', 'nonsense', 'progress', 'inches', 'damage', 'suffers', 'fixing', 'response', 'sharp', 'world', 'solve', 'reflect', 'nearby', 'general', 'weight', 'consists', 'hurry', 'concept', 'examines', 'returns', 'lessons', 'prove', 'safer', 'whoever', 'reflects', 'demands', 'affair', 'bridge', 'night', 'credit', 'metal', 'welcomes', 'linear', 'approves', 'tendency', 'deriving', 'chemical', 'switches', 'subjects', 'presume', 'appears', 'bothers', 'addition', 'policy', 'brother', 'widest', 'altering', 'accorded', 'channels', 'complex', 'refer', 'inputted', 'thing', 'touching', 'truck', 'strike', 'avoided', 'elevator', 'turning', 'reject', 'anywhere', 'demand', 'omitting', 'spirit', 'authors', 'guessing', 'keeps', 'properly', 'raised', 'teach', 'scores', 'prevent', 'highly', 'searched', 'level', 'couple', 'million', 'closes', 'applying', 'request', 'occur', 'message', 'remove', 'searches', 'pushes', 'there', 'collect', 'pointing', 'artist', 'compares', 'measures', 'painful', 'amuse', 'truly', 'executed', 'utterly', 'compute', 'dated', 'placing', 'stops', 'killing', 'sorted', 'accurate', 'speed', 'struck', 'inclines', 'backs', 'lists', 'joint', 'served', 'thrown', 'points', 'sounding', 'propose', 'fortune', 'strikes', 'register', 'contract', 'vague', 'compared', 'picking', 'reminds', 'letting', 'recover', 'bother', 'vital', 'suggest', 'occupied', 'walls', 'syntax', 'fastest', 'minor', 'merit', 'defines', 'loudly', 'experts', 'upwards', 'tells', 'senior', 'locked', 'produces', 'current', 'ordinary', 'sudden', 'accord', 'setting', 'phase', 'former', 'creation', 'filing', 'switch', 'usually', 'warns', 'counting', 'inserts', 'suspect', 'presence', 'approve', 'ideas', 'coding', 'listen', 'surely', 'however', 'ignored', 'event', 'format', 'depth', 'disaster', 'implying', 'floats', 'natural', 'settling', 'assuring', 'possibly', 'glass', 'light', 'creates', 'mistaken', 'aside', 'informed', 'concerns', 'spots', 'error', 'imposed', 'stage', 'integral', 'prior', 'elects', 'could', 'treats', 'intend', 'values', 'naive', 'biting', 'throws', 'disturbs', 'severe', 'money', 'offers', 'sitting', 'method', 'thereby', 'derived', 'clears', 'accept', 'damages', 'marking', 'quite', 'utility', 'largely', 'superior', 'under', 'awake', 'latest', 'invited', 'treated', 'spend', 'reverse', 'destroy', 'adjust', 'impact', 'minimum', 'farther', 'fixes', 'earlier', 'causing', 'repeated', 'facility', 'ending', 'entitle', 'partial', 'object', 'spent', 'spell', 'trick', 'warned', 'lacked', 'seeing', 'leaded', 'separate', 'greatly', 'likewise', 'objects', 'cause', 'would', 'shame', 'trapped', 'usual', 'acted', 'payed', 'turned', 'spelling', 'grounds', 'district', 'evenings', 'blame', 'grind', 'tasks', 'feature', 'wears', 'normal', 'mixing', 'willed', 'among', 'weapon', 'disturb', 'being', 'slowly', 'twice', 'break', 'areas', 'misled', 'sound', 'convert', 'feeds', 'nearly', 'changing', 'industry', 'throw', 'fatal', 'dealing', 'digital', 'flexible', 'entered', 'proposes', 'spaces', 'status', 'volume', 'stores', 'readily', 'unhappy', 'unless', 'proving', 'college', 'green', 'empty', 'officer', 'sorts', 'existing', 'excess', 'joins', 'third', 'growth', 'ensure', 'refused', 'aspects', 'electing', 'obscure', 'fourth', 'hidden', 'concrete', 'election', 'either', 'basis', 'middle', 'media', 'movement', 'makes', 'ignore', 'picture', 'obtains', 'trains', 'wonder', 'unaware', 'kills', 'drops', 'indicate', 'whereas', 'forever', 'rubbish', 'argument', 'external', 'special', 'printers', 'excluded', 'sequence', 'system', 'enable', 'fancy', 'quotes', 'promises', 'varied', 'pressing', 'lacks', 'layout', 'women', 'sensibly', 'bearing', 'elected', 'efforts', 'petrol', 'spoken', 'editors', 'weather', 'shall', 'effect', 'habit', 'provide', 'contents', 'library', 'reveal', 'changed', 'maximum', 'original', 'group', 'fashion', 'corrupt', 'articles', 'absolute', 'managing', 'writing', 'classes', 'threat', 'wishes', 'composed', 'crashes', 'ensures', 'flying', 'silly', 'gaining', 'messages', 'causes', 'wrote', 'failing', 'friendly', 'saving', 'bucket', 'campaign', 'wanting', 'composes', 'guessed', 'shortage', 'summary', 'danger', 'strength', 'forces', 'simplest', 'stone', 'extreme', 'divide', 'database', 'slightly', 'forming', 'posts', 'damaged', 'digit', 'rates', 'really', 'hitting', 'bases', 'began', 'included', 'solving', 'controls', 'symbol', 'cheaper', 'order', 'confirms', 'doubt', 'granting', 'author', 'miles', 'wider', 'became', 'screen', 'driving', 'likely', 'charge', 'dropped', 'document', 'national', 'enter', 'military', 'false', 'knows', 'cards', 'secondly', 'typing', 'resort', 'inform', 'patch', 'implies', 'research', 'levels', 'clear', 'linked', 'examine', 'science', 'reveals', 'exist', 'integers', 'wheel', 'parallel', 'delete', 'project', 'sight', 'confused', 'station', 'adopted', 'initials', 'amounts', 'nearer', 'minds', 'figure', 'annoying', 'example', 'trusting', 'expect', 'minute', 'edition', 'ditto', 'sounded', 'services', 'cycles', 'assured', 'talks', 'closely', 'pounds', 'occurs', 'decent', 'flash', 'depends', 'readable', 'husband', 'wastes', 'reserve', 'digits', 'placed', 'extend', 'altered', 'desiring', 'yellow', 'older', 'saint', 'evening', 'alters', 'sciences', 'marks', 'deduce', 'hereby', 'items', 'despite', 'grinds', 'operator', 'mostly', 'dedicate', 'initial', 'invents', 'involve', 'expert', 'itself', 'replied', 'filled', 'cares', 'entries', 'protects', 'buying', 'block', 'employee', 'death', 'ability', 'performs', 'liking', 'matches', 'observes', 'weird', 'child', 'engineer', 'other', 'hardest', 'attaches', 'stones', 'sentence', 'moral', 'faith', 'reserves', 'release', 'source', 'mechanic', 'binding', 'compare', 'until', 'sensible', 'forgot', 'stable', 'formed', 'putting', 'strong', 'actual', 'assumed', 'roughly', 'entrance', 'dubious', 'sales', 'handing', 'signed', 'stations', 'place', 'millions', 'issues', 'serving', 'related', 'gains', 'medical', 'severely', 'allow', 'eight', 'weekend', 'choose', 'think', 'pleasing', 'timed', 'exercise', 'holding', 'floated', 'somewhat', 'worth', 'helped', 'nature', 'period', 'entirely', 'content', 'solves', 'suited', 'commonly', 'budget', 'knock', 'matters', 'gasoline', 'function', 'allows', 'garbage', 'succeed', 'please', 'collapse', 'bright', 'wasting', 'handles', 'cases', 'holidays', 'flown', 'office', 'handling', 'advanced', 'posted', 'fully', 'ultimate', 'followed', 'innocent', 'longest', 'added', 'possible', 'anything', 'instead', 'rarely', 'lasts', 'applied', 'western', 'sleep', 'variable', 'society', 'claimed', 'parties', 'execute', 'highest', 'myself', 'radio', 'fails', 'nothing', 'intends', 'winning', 'across', 'buries', 'clean', 'landed', 'easiest', 'route', 'capacity', 'supposes', 'drastic', 'directed', 'belong', 'division', 'acting', 'arise', 'affairs', 'arguing', 'various', 'killed', 'trusted', 'building', 'recently', 'compose', 'scene', 'believed', 'prices', 'modify', 'inclined', 'qualify', 'seems', 'inserted', 'number', 'presses', 'forgets', 'another', 'involved', 'hearing', 'opinions', 'guard', 'amused', 'pictures', 'worrying', 'hoping', 'cheapest', 'ridding', 'wasted', 'grown', 'grave', 'explicit', 'raises', 'approval', 'returned', 'cumming', 'phone', 'filling', 'pleased', 'mention', 'deeply', 'pressed', 'finite', 'first', 'switched', 'draws', 'benefit', 'contain', 'requests', 'repair', 'decrease', 'water', 'offering', 'shown', 'expense', 'further', 'kinds', 'upsets', 'plenty', 'guess', 'formal', 'closest', 'nowadays', 'normally', 'start', 'direct', 'reports', 'refuse', 'things', 'firstly', 'watched', 'waiting', 'suspends', 'inferior', 'leads', 'return', 'systems', 'install', 'projects', 'bites', 'success', 'chars', 'quoting', 'fills', 'ahead', 'bottom', 'hello', 'woman', 'knocks', 'cheap', 'pleasant', 'explain', 'looked', 'annoy', 'combines', 'noted', 'attached', 'plastic', 'raise', 'common', 'anyway', 'using', 'supply', 'opened', 'taught', 'clearer', 'grands', 'reduces', 'clearing', 'attack', 'divides', 'queue', 'worker', 'grosses', 'hanging', 'quote', 'lucky', 'closing', 'series', 'upper', 'inside', 'lived', 'aware', 'remains', 'stuff', 'strange', 'opposed', 'easily', 'space', 'planned', 'prime', 'dealt', 'previous', 'audience', 'files', 'waits', 'compiler', 'interval', 'carried', 'midnight', 'drives', 'releases', 'horse', 'worked', 'stated', 'prepare', 'handled', 'vector', 'crashed', 'meeting', 'regards', 'graphics', 'errors', 'trying', 'explains', 'editor', 'words', 'reason', 'obtained', 'pause', 'nowhere', 'agreeing', 'calling', 'kindly', 'informs', 'called', 'observe', 'studies', 'achieve', 'herself', 'circle', 'trial', 'branches', 'sample', 'greater', 'solely', 'signing', 'trace', 'bracket', 'because', 'average', 'delay', 'develop', 'combined', 'views', 'river', 'amuses', 'worried', 'board', 'strictly', 'below', 'supplied', 'detects', 'landing', 'party', 'improves', 'nasty', 'floating', 'options', 'minding', 'expand', 'scale', 'advice', 'copied', 'respond', 'manages', 'presents', 'repeat', 'knocking', 'inputs', 'package', 'isolate', 'control', 'reality', 'removes', 'hours', 'master', 'labels', 'furthest', 'achieves', 'unite', 'within', 'suffered', 'critical', 'restore', 'region', 'theory', 'betting', 'details', 'stored', 'vision', 'sharing', 'design', 'express', 'gained', 'curious', 'plain', 'bringing', 'logic', 'admitted', 'finishes', 'written', 'piece', 'intended', 'decided', 'allowing', 'convince', 'tends', 'remember', 'anybody', 'mornings', 'contrary', 'claims', 'borne', 'shares', 'chips', 'nation', 'mentions', 'leach', 'ended', 'worry', 'pushed', 'designed', 'unlike', 'recovers', 'loads', 'prepares', 'loses', 'distance', 'effort', 'dirty', 'wrong', 'approach', 'inviting', 'carry', 'brackets', 'serious', 'devoting', 'coded', 'short', 'evened', 'letters', 'closed', 'category', 'black', 'trusts', 'student', 'attach', 'aimed', 'prompt', 'supports', 'session', 'after', 'chair', 'indeed', 'boxes', 'sells', 'stick', 'vastly', 'sticks', 'lines', 'lesson', 'pages', 'business', 'feeding', 'rubber', 'headed', 'worries', 'manner', 'corner', 'naming', 'terminal', 'house', 'brown', 'safest', 'final', 'suggests', 'legal', 'selling', 'seven', 'noticing', 'buffer', 'instant', 'imposing', 'continue', 'heads', 'price', 'increase', 'value', 'briefly', 'affect', 'discount', 'strategy', 'inner', 'bottle', 'apparent', 'signs', 'scratch', 'requires', 'flight', 'bulletin', 'religion', 'context', 'machine', 'provides', 'quiet', 'largest', 'county', 'daily', 'invites', 'subtle', 'fries', 'serves', 'catches', 'language', 'fewer', 'storage', 'album', 'extract', 'paying', 'detail', 'report', 'skills', 'probably', 'gotten', 'hence', 'great', 'directs', 'attempt', 'round', 'whatever', 'omitted', 'replace', 'mixed', 'insists', 'insist', 'owners', 'flashes', 'hints', 'acquired', 'adopts', 'lorry', 'guide', 'finished', 'quickest', 'justify', 'hundreds', 'smaller', 'contains', 'agrees', 'allowed', 'restored', 'plant', 'advised', 'already', 'solid', 'entitles', 'square', 'prone', 'track', 'optional', 'stating', 'remind', 'creating', 'consider', 'french', 'aspect', 'displays', 'service', 'advises', 'assumes', 'messy', 'oppose', 'purchase', 'outside', 'better', 'resident', 'given', 'appeal', 'pushing', 'domain', 'links', 'quality', 'named', 'father', 'medium', 'fields', 'running', 'watching', 'speech', 'small', 'alias', 'believes', 'enemy', 'papers', 'ignores', 'avoid', 'needs', 'behalf', 'pattern', 'testing', 'persuade', 'incline', 'upset', 'hotel', 'earliest', 'logical', 'modern', 'remain', 'yours', 'hundred', 'lifetime', 'police', 'hanged', 'seeming', 'except', 'garden', 'linking', 'toward', 'symbols', 'advising', 'warning', 'quantity', 'built', 'living', 'agree', 'means', 'agency', 'branch', 'deleting', 'backed', 'speak', 'perfect', 'somehow', 'negative', 'though', 'bodies', 'withdraw', 'produced', 'pound', 'entering', 'visit', 'argued', 'hides', 'window', 'purely', 'excuse', 'display', 'foreign', 'assure', 'dropping', 'trees', 'month', 'effects', 'breaks', 'accuracy', 'submits', 'issued', 'nicer', 'leaved', 'rewrite', 'reduced', 'solution', 'alone', 'receives', 'reaction', 'gives', 'nicest', 'regarded', 'version', 'hardware', 'asked', 'study', 'turns', 'anyone', 'count', 'treating', 'material', 'remarks', 'relating', 'assures', 'editing', 'tickets', 'supposed', 'wishing', 'never', 'printing', 'expands', 'purposes', 'waited', 'position', 'activity', 'hopes', 'table', 'economy', 'carrying', 'advances', 'sources', 'force', 'tests', 'balance', 'borrows', 'passes', 'deeming', 'spotting', 'infinite', 'knocked', 'relative', 'arriving', 'designs', 'driven', 'maybe', 'capital', 'legally', 'lecture', 'grants', 'reads', 'alarm', 'replies', 'chooses', 'excludes', 'comment', 'involves', 'screens', 'played', 'cannot', 'review', 'truth', 'towards', 'reducing', 'spotted', 'forms', 'opening', 'spring', 'computed', 'plays', 'second', 'limits', 'holes', 'preserve', 'welcomed', 'computer', 'smallest', 'strings', 'select', 'longer', 'forced', 'stock', 'trivial', 'mistake', 'tight', 'writes', 'cleared', 'shortly', 'print', 'leave', 'summer', 'crisp', 'complete', 'instance', 'throwing', 'leader', 'images', 'waste', 'string', 'suspects', 'thousand', 'worthy', 'mixes', 'updates', 'granted', 'invalid', 'reminded', 'worse', 'pairs', 'spoke', 'proved', 'sheet', 'bidding', 'graphic', 'refers', 'happens', 'settled', 'product', 'stopping', 'cursor', 'charging', 'column', 'sticking', 'respects', 'forward', 'mistakes', 'apple', 'health', 'owing', 'treat', 'lives', 'around', 'parts', 'trapping', 'revealed', 'animal', 'sessions', 'reaches', 'surface', 'hardly', 'rather', 'award', 'claiming', 'required', 'front', 'illegal', 'tonight', 'address', 'meetings', 'perform', 'partly', 'develops', 'discuss', 'assume', 'everyone', 'access', 'stream', 'simpler', 'together', 'divided', 'quietly', 'spends', 'stopped', 'declares', 'desires', 'repeats', 'ignoring', 'begun', 'letter', 'tomorrow', 'elect', 'eaten', 'proposed', 'entitled', 'healthy', 'thought', 'himself', 'machines', 'suppose', 'claim', 'saved', 'printer', 'delivery', 'failure', 'opposite', 'imposes', 'showed', 'holds', 'sought', 'covering', 'dozen', 'answers', 'noting', 'bring', 'leaving', 'pulled', 'borrow', 'standard', 'buried', 'certain', 'watch', 'chances', 'official', 'follow', 'massive', 'early', 'latter', 'sounds', 'connect', 'federal', 'perhaps', 'parent', 'minimal', 'reading', 'approved', 'tries', 'stands', 'chairman', 'tedious', 'irritate', 'sorry', 'easier', 'invented', 'picks', 'puncture', 'burying', 'ought', 'survive', 'accepted', 'account', 'regard', 'oldest', 'answered', 'ancient', 'cross', 'issue', 'spending', 'checking', 'naughty', 'customer', 'bought', 'prints', 'point', 'reached', 'whilst', 'relates', 'updated', 'plots', 'unclear', 'extended', 'permits', 'freely', 'arises', 'unknown', 'larger', 'putted', 'speakers', 'definite', 'teeth', 'arranged', 'strict', 'origin', 'connects', 'windows', 'thank', 'datum', 'teaches', 'north', 'strongly', 'comments', 'benefits', 'covered', 'pocket', 'watches', 'amount', 'dislike', 'plane', 'charged', 'misuse', 'supplies', 'funds', 'choosing', 'touch', 'binary', 'trunk', 'random', 'collects', 'deleted', 'relate', 'modified', 'unable', 'someone', 'specify', 'workers', 'adopt', 'thanks', 'speaking', 'declare', 'march', 'useless', 'smile', 'since', 'goods', 'flashing', 'steal', 'heavy', 'pretty', 'refusing', 'human', 'depended', 'nobody', 'commands', 'storing', 'rules', 'crisis', 'security', 'suffer', 'thinking', 'enormous', 'traps', 'charges', 'totally', 'working', 'hears', 'twenty', 'attitude', 'whole', 'hiding', 'speaks', 'factor', 'actually', 'helpful', 'create', 'quickly', 'besides', 'before', 'clever', 'entry', 'catch', 'prepared', 'escape', 'persons', 'finally', 'church', 'debate', 'video', 'getting', 'shape', 'where', 'occupy', 'famous', 'children', 'scheme', 'remote', 'tables', 'proves', 'posting', 'winter', 'season', 'academic', 'morning', 'entity', 'corrupts', 'against', 'actions', 'seemed', 'quicker', 'created', 'shops', 'moment', 'provided', 'magic', 'passing', 'networks', 'taste', 'lower', 'index', 'safety', 'tracks', 'prefers', 'confuse', 'seconds', 'command', 'person', 'drawn', 'helps', 'released', 'require', 'finish', 'public', 'noise', 'crash', 'expects', 'cycle', 'sadly', 'blank', 'support', 'spite', 'signals', 'sends', 'sometime', 'chance', 'showing', 'feedback', 'extent', 'hangs', 'threw', 'adequate', 'members', 'familiar', 'improved', 'grand', 'objected', 'quoted', 'striking', 'passed', 'trained', 'future', 'rejects', 'invent', 'output', 'training', 'produce', 'sugar', 'events', 'speaker', 'achieved', 'loaded', 'happy', 'impose', 'disagree', 'namely', 'dividing', 'meaning', 'proof', 'constant', 'electric', 'replying', 'recent', 'standing', 'distant', 'voice', 'packages', 'script', 'graph', 'reasons', 'manual', 'wished', 'income', 'peace', 'fairly', 'settle', 'reach', 'deciding', 'patient', 'survey', 'directly', 'similar', 'interest', 'devoted', 'exactly', 'suspend', 'limited', 'proposal', 'stood', 'deemed', 'deems', 'suits', 'later', 'policies', 'shopped', 'cutting', 'willing', 'schools', 'joining', 'software', 'tanks', 'writer', 'slower', 'applies', 'channel', 'liked', 'leaves', 'times', 'concern', 'calls', 'fitted', 'drawing', 'tooth', 'sense', 'unlikely', 'location', 'active', 'existed', 'needed', 'refuses', 'begin', 'article', 'catching', 'harder', 'fault', 'estimate', 'double', 'describe', 'annual', 'studied', 'trouble', 'ensured', 'typed', 'costing', 'crazy', 'limit', 'logging', 'reaching', 'orders', 'looks', 'still', 'peculiar', 'executes', 'crisps', 'titles', 'country', 'dying', 'drivers', 'advance', 'handy', 'decides', 'differ', 'might', 'staying', 'observed', 'sending', 'slight', 'network', 'asleep', 'includes', 'going', 'beyond', 'numerous', 'operate', 'argues', 'happen', 'during', 'lying', 'positive', 'failed', 'adding', 'happily', 'shell'],
	BIG_WORDS: ['connection', 'pointless', 'treatment', 'prevented', 'believing', 'introduce', 'characters', 'potentially', 'encouraged', 'distinctly', 'following', 'sufficient', 'requested', 'paragraph', 'conclusion', 'recognition', 'appreciate', 'particular', 'background', 'inclining', 'worthwhile', 'publishing', 'advantages', 'occasionally', 'associating', 'programmers', 'replacement', 'considerably', 'regulation', 'terminals', 'quantities', 'significance', 'associated', 'mysterious', 'discouraging', 'represents', 'vacations', 'restoring', 'procedure', 'difficulties', 'continuous', 'consequences', 'electronics', 'conference', 'discovers', 'necessarily', 'completes', 'accidental', 'complexity', 'inserting', 'represent', 'generation', 'performance', 'operations', 'describes', 'accepting', 'convention', 'mechanics', 'performing', 'suspected', 'technical', 'associates', 'afternoon', 'interpreting', 'carefully', 'questions', 'recommended', 'mathematics', 'proportion', 'personally', 'necessity', 'appearance', 'consumption', 'restricting', 'suggestion', 'thoroughly', 'secretary', 'introduced', 'suspended', 'irritating', 'fundamental', 'relatively', 'determining', 'primitive', 'expensive', 'arguments', 'sensitive', 'embarrass', 'environment', 'accordingly', 'confusing', 'establishes', 'confident', 'discussed', 'restricts', 'discovering', 'association', 'everybody', 'requirements', 'referring', 'processor', 'publication', 'providing', 'consistent', 'establish', 'unacceptable', 'anonymous', 'guarantees', 'presented', 'reminding', 'occupying', 'commented', 'processed', 'importance', 'description', 'compromise', 'institution', 'published', 'somewhere', 'interpret', 'disappear', 'engineers', 'unreasonable', 'embarrasses', 'telephone', 'expecting', 'supposedly', 'corrupted', 'compatible', 'instantly', 'presumably', 'statement', 'technology', 'incomplete', 'naturally', 'forgotten', 'receiving', 'complaint', 'disappears', 'meaningful', 'observing', 'appreciates', 'algorithms', 'electronic', 'commitment', 'discourages', 'algorithm', 'modifying', 'different', 'guaranteeing', 'inputting', 'forgetting', 'discussions', 'direction', 'materials', 'operators', 'constraints', 'structure', 'components', 'continuously', 'agreement', 'inventing', 'qualifies', 'concerning', 'existence', 'intervention', 'maintained', 'directions', 'supposing', 'phenomenon', 'disturbing', 'experiences', 'buildings', 'reflected', 'affecting', 'institutions', 'irritated', 'continuing', 'dedicated', 'acceptable', 'transport', 'complicating', 'continued', 'concerned', 'otherwise', 'sufficiently', 'delivered', 'backwards', 'preferring', 'perfectly', 'successfully', 'standards', 'returning', 'unnecessary', 'engineered', 'ultimately', 'installed', 'composing', 'connecting', 'inconsistent', 'subsequent', 'collecting', 'traditional', 'explanation', 'precisely', 'investigate', 'seriously', 'remembered', 'equipment', 'solutions', 'increased', 'splitting', 'processing', 'completing', 'unpleasant', 'qualified', 'positions', 'translating', 'achieving', 'desperate', 'protecting', 'preventing', 'education', 'reflection', 'correction', 'observation', 'opportunity', 'collected', 'beforehand', 'experienced', 'democratic', 'documented', 'educational', 'political', 'qualifying', 'persuades', 'structures', 'reasonably', 'implemented', 'appreciating', 'excessive', 'conversation', 'operating', 'generating', 'exceptions', 'importantly', 'obtaining', 'artificial', 'suspicion', 'competition', 'spreading', 'president', 'represented', 'arrangements', 'responsible', 'permitting', 'practical', 'interpreted', 'understands', 'complained', 'obviously', 'specifically', 'requirement', 'occasional', 'specified', 'resourced', 'directing', 'authority', 'disappearing', 'dangerous', 'literally', 'processes', 'appreciated', 'accessible', 'applications', 'automobile', 'nevertheless', 'disappeared', 'distinction', 'attractive', 'considering', 'impression', 'decisions', 'surviving', 'preferred', 'extending', 'translate', 'persuading', 'additional', 'potential', 'mathematical', 'encourages', 'guarantee', 'component', 'informing', 'facilities', 'instruction', 'comparing', 'commission', 'extensive', 'discussion', 'themselves', 'invitation', 'complains', 'occurring', 'encouraging', 'apologies', 'instructions', 'suspending', 'fortunately', 'engineering', 'determine', 'upsetting', 'registering', 'financial', 'confusion', 'explained', 'addressing', 'exclusive', 'inadequate', 'remaining', 'cardboard', 'bothering', 'inevitably', 'discusses', 'selection', 'finishing', 'comparable', 'temporarily', 'recommend', 'correcting', 'translated', 'excellent', 'circulation', 'permanently', 'universal', 'reduction', 'expressing', 'widespread', 'detailing', 'essential', 'immediate', 'regardless', 'contribute', 'specifying', 'implement', 'disadvantage', 'advancing', 'insisting', 'increases', 'dedicating', 'repeatedly', 'entitling', 'sometimes', 'requiring', 'influence', 'principles', 'complicates', 'combination', 'embarrassing', 'meaningless', 'conventions', 'whatsoever', 'declaring', 'technique', 'currently', 'interface', 'intervals', 'associate', 'supervisor', 'throughout', 'disturbed', 'temperature', 'something', 'expressed', 'statistic', 'surprises', 'frequently', 'languages', 'substitute', 'discipline', 'protection', 'displaying', 'suffering', 'basically', 'computers', 'respectively', 'television', 'individually', 'information', 'gradually', 'processors', 'initially', 'deliberately', 'essentially', 'containing', 'statements', 'requesting', 'permission', 'interesting', 'producing', 'commenting', 'promising', 'sentences', 'specially', 'magnitude', 'advertising', 'intention', 'confirmed', 'separately', 'postmaster', 'circumstance', 'established', 'improvements', 'implementing', 'ambiguous', 'forthcoming', 'situations', 'occasions', 'destroying', 'desirable', 'population', 'university', 'insurance', 'independent', 'variation', 'someplace', 'describing', 'individual', 'developed', 'justifying', 'identical', 'complicated', 'suggested', 'especially', 'redundant', 'laboratory', 'surprising', 'guaranteed', 'arranging', 'computing', 'attention', 'answering', 'happening', 'techniques', 'dedicates', 'commercial', 'temporary', 'necessary', 'intelligence', 'responses', 'regularly', 'statistical', 'everything', 'submitting', 'definitely', 'candidate', 'efficient', 'theoretical', 'permitted', 'situation', 'wonderful', 'restricted', 'substantial', 'encountering', 'supported', 'discouraged', 'representing', 'experimental', 'revealing', 'assistant', 'definitions', 'experience', 'activities', 'application', 'alternate', 'mistaking', 'demonstrate', 'convinces', 'implements', 'recovered', 'arithmetic', 'distributed', 'references', 'described', 'resources', 'involving', 'approving', 'remembers', 'wondering', 'conditions', 'universities', 'implications', 'differently', 'establishing', 'determines', 'permanent', 'implication', 'recording', 'unsuitable', 'complaints', 'elsewhere', 'advertise', 'broadcasts', 'selecting', 'difficulty', 'appropriate', 'convincing', 'transferred', 'operation', 'controlled', 'objecting', 'everywhere', 'broadcasting', 'religious', 'suspecting', 'convinced', 'improvement', 'generates', 'introduces', 'discussing', 'consequence', 'membership', 'recommending', 'authorities', 'documents', 'supporting', 'objections', 'sophisticate', 'addressed', 'reference', 'significant', 'advantage', 'intelligent', 'proposing', 'broadcast', 'expresses', 'introduction', 'presenting', 'switching', 'encounters', 'expression', 'determined', 'preparing', 'collection', 'correctly', 'committee', 'locations', 'submitted', 'constraint', 'literature', 'secondary', 'remembering', 'incorrect', 'atmosphere', 'contained', 'corrupting', 'scientific', 'comparison', 'numerical', 'publicity', 'completed', 'distribution', 'impossible', 'yesterday', 'dictionary', 'particularly', 'development', 'advertises', 'executing', 'sincerely', 'principle', 'introducing', 'translates', 'contribution', 'documenting', 'experiment', 'surprised', 'acquiring', 'absolutely', 'calculation', 'production', 'irritates', 'definitive', 'justified', 'delivering', 'increasing', 'reluctant', 'communicate', 'intending', 'including', 'distributing', 'misleading', 'conventional', 'sequences', 'alternative', 'categories', 'recovering', 'opposition', 'consistency', 'exception', 'available', 'properties', 'imagination', 'encounter', 'understood', 'beautiful', 'punctuation', 'resourcing', 'resulting', 'persuaded', 'experiencing', 'deliberate', 'calculate', 'historical', 'complicate', 'government', 'calculations', 'underneath', 'continually', 'descriptions', 'difficult', 'resolution', 'registers', 'differences', 'experiments', 'professional', 'effective', 'according', 'developing', 'detecting', 'repeating', 'transfers', 'confirming', 'suggestions', 'hopefully', 'protected', 'designing', 'extension', 'justifies', 'knowledge', 'distinguish', 'inability', 'preferable', 'mechanism', 'consequently', 'alternatives', 'character', 'admitting', 'borrowing', 'definition', 'indication', 'arbitrary', 'performed', 'irrelevant', 'important', 'individuals', 'abilities', 'appearing', 'preparation', 'extremely', 'generally', 'addresses', 'ourselves', 'libraries', 'condition', 'philosophy', 'virtually', 'successful', 'attending', 'composition', 'connections', 'registered', 'variables', 'uncertain', 'immediately', 'displayed', 'expansion', 'beginning', 'arrangement', 'interests', 'objection', 'satisfies', 'publishes', 'ridiculous', 'announcement', 'continuation', 'maintaining', 'attaching', 'replacing', 'programmer', 'rejecting', 'effectively', 'reception', 'controlling', 'continues', 'accidentally', 'understand', 'equivalent', 'admittedly', 'excluding', 'originally', 'examining', 'simultaneous', 'manipulation', 'emergency', 'translation', 'industrial', 'functions', 'mentioning', 'improving', 'previously', 'considers', 'convenient', 'regulations', 'therefore', 'apparently', 'complaining', 'discourage', 'attempted', 'isolating', 'measuring', 'distributes', 'reporting', 'depending', 'considered', 'thousands', 'assumption', 'incompatible', 'explaining', 'relevance', 'maintains', 'destroyed', 'partially', 'recommends', 'regarding', 'unfortunate', 'specifies', 'combining', 'statistics', 'movements', 'supplying', 'indicates', 'terminology', 'combinations', 'corrected', 'generated', 'department', 'practically', 'attempting', 'interested', 'considerable', 'advertised', 'unlimited', 'satisfying', 'encourage', 'relationship', 'completely', 'installing', 'altogether', 'certainly', 'transferring', 'encountered', 'preferably', 'preference', 'incidentally', 'automatic', 'similarly', 'discovered', 'invisible', 'construct', 'embarrassed', 'assembler', 'satisfied', 'searching', 'expanding', 'reserving', 'connected', 'releasing', 'invariably', 'difference', 'eventually', 'welcoming', 'suggesting', 'reasonable', 'reflecting', 'possibility', 'directory', 'criticism', 'compulsory', 'distribute', 'interprets', 'reproduce', 'community', 'mentioned'],
});