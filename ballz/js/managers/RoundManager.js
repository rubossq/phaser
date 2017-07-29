var RoundManager = Base.extend({

	
	gamePage: null,
	currentRound: null,
	summ: null,
	steps: null,
	currentHealth: null,
	currentBalls: null,

	constructor: function(){
		RoundManager.i = this;
		this.start();
	},

	start: function(){
		this.currentRound = 1;
		this.currentHealth = 1;
		this.currentBalls = 1;
		this.steps = new Array();
	},

	getCountHealth: function(){
		
		var balance = this.calculateBalance();
		var min = 2;
		var max = Helper.i.randomInteger(0, 100) <= balance.maxPercent ? BoxesManager.MAX_IN_ROW - 2 : min + 2;
		var maxWay = (max == BoxesManager.MAX_IN_ROW - 2);

		var hasDouble = Helper.i.randomInteger(0, 100) <= balance.doublePercent ? true : false;
		var count = Helper.i.randomInteger(min, max);
		var hasDoubleDouble = Helper.i.randomInteger(0, 100) <= balance.doubleDoublePercent ? true : false;
		if(hasDouble){
			if(count - 2 > min && hasDoubleDouble){
				count--;
			}else{
				hasDoubleDouble = false;
			}
			count--;
		}

		var health = new Array();
		this.feelHealth(health, count, hasDouble, hasDoubleDouble);

		var bonus = Helper.i.randomInteger(0, 100) <= balance.bonusPercent ? Helper.i.randomInteger(1, balance.maxBonus) : 0;
		this.steps.push({count: count, health: health, bonus: bonus, hasDouble: hasDouble, hasDoubleDouble: hasDoubleDouble, maxWay: maxWay, maxBonus: balance.maxBonus});
		return {count: count, health: health, bonus: bonus};
	},

	calculateBalance: function(){
		var maxPercent = 80;

		var doubleDoublePercent = 20;
		var bonusPercent = 70;
		var maxBonus = 2;
		var doublePercent = 30;

		if(this.currentRound < 15){
			maxPercent = 60;
		}else if(this.currentRound < 50){
			maxPercent = 75;
		}

		if(this.steps.length > 2){
			var before = this.steps[this.steps.length-1];

			if(this.currentBalls < this.currentRound){
				bonusPercent = 100;
			}else{
				bonusPercent = 0;
			}

			if(before.hasDoubleDouble){
				doubleDoublePercent = 10;
			}

			if(before.maxWay){
				maxPercent = 40;
			}

			
		}
		console.log("bonusPercent = " + bonusPercent);
		return {maxPercent: maxPercent, doubleDoublePercent: doubleDoublePercent, bonusPercent: bonusPercent, maxBonus: maxBonus, doublePercent: doublePercent};
	},

	feelHealth: function(health, count, hasDouble, hasDoubleDouble){
		for(var i=0; i<count; i++){
			health.push(this.currentHealth);
		}

		if(hasDouble){
			var index = Helper.i.randomInteger(0, health.length-1);
			health[index] += this.currentHealth;

			if(hasDoubleDouble){
				var index2 = Helper.i.randomInteger(0, health.length-1);
				var cnt = 0;
				while(index2 == index){
					index2 = Helper.i.randomInteger(0, health.length-1);
					cnt++;
					if(cnt > 1000){
						console.log("stopor " + count);
						break;
					}
				}
				health[index2] += this.currentHealth;
			}
		}
	},

	roundUp: function(balls, bonusWait){
		this.currentRound++;
		//this.currentHealth++;
		//console.log(" balls = " + balls + " " + bonusWait);
		this.currentBalls = balls + bonusWait;
		if(this.currentRound < 10){
			this.currentHealth++;
		}else if(this.currentRound < 40){
			this.currentHealth += Helper.i.randomInteger(0, 100) <= 40 ? 2 : 1;
		}else if(this.currentRound < 100){
			this.currentHealth += Helper.i.randomInteger(0, 100) <= 60 ? 2 : 1;
		}else{
			this.currentHealth += 2;
		}
		
	}

},{
	i: null,
	ROUND_STEP_LOW: [2, 4],
	ROUND_STEP_MIDDLE: [6, 10],
	ROUND_STEP_BIG: [11, 20],

	ROUND_LOW_ABROAD: 10,
	ROUND_MIDDLE_ABROAD: 50,

	MIN_LOW: 2,
	MIN_MIDDLE: 3,
	MIN_BIG: 4
});

new RoundManager();