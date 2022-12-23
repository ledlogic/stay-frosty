/* st-char.js */

st.char = {
	spec: {
		name: "",
		level: 1,
		actions: 1,
		attributes: {
			"brains": 0,
			"brawn": 0,
			"dexterity": 0,
			"willpower": 0
		},
		frosty: {
			"hit points": 0,
			"armor": 0,
			"frostiness": 1,
			"mos": null,
			"rank": null
		},
		equipment: []
	},
	
	init: function() {
		st.log("char.init");
		
		var url = $.url();
		var level = url.param("level");
		if (level) {
			st.char.spec.level = parseInt(level,10);
		}
	},
	
	random: function() {
		st.log("char.random");
		st.char.randomName();
		st.char.randomAttributes();
		st.char.randomMOS();
		st.char.randomRank();
		st.char.levelMOSAttributes();
		st.char.levelActions();
		st.char.randomHitpoints();
		st.char.randomEquipment();
	},
	
	randomName: function() {
		var firstIndex = st.math.dieArray(st.names.first);
		var first = st.names.first[firstIndex];
		
		var lastIndex = st.math.dieArray(st.names.last);
		var last = st.names.last[lastIndex];

		st.char.spec.name = first + " " + last;
	},
	
	randomStat: function() {
		return st.math.die(3, 6, 0);
	},
	
	randomAttributes: function() {
		st.log("char.randomAttributes");

		var highest = { key: "", val: -1 };
		_.map(st.char.spec.attributes, function(val, key) {
			val = st.char.randomStat();
			st.char.spec.attributes[key] = val;
			if (val > highest.val) {
				highest.key = key;
				highest.val = val;
			}
		});
		
		// re-roll highest
		st.char.spec.attributes[highest.key] = st.char.randomStat();
	},
	
	levelActions: function() {
		st.log("char.levelActions");

		// leveling up
		var level = st.char.spec.level;
		st.log("level[" + level + "]");
		
		var additionalActions = Math.floor((level-1) / 2);
		st.log("additionalActions[" + additionalActions + "]");
		
		st.char.spec.actions += additionalActions;
	},
	
	levelMOSAttributes: function(i) {
		st.log("char.levelMOSAttributes, i[" + i + "]");
		
		// leveling up
		var level = st.char.spec.level;
		st.log("level[" + level + "]");
		
		var mos = st.char.spec.frosty.mos;
		var rank = st.char.spec.frosty.rank;
		for (var j=2; j<=level;j++) {
			st.char.levelAttributes(j, mos, rank);
		}
	},
	
	levelAttributes: function(i, mos, rank) {
		st.log("char.levelAttributes, i[" + i + "], mos.name[" + mos.name + "], rank[" + rank + "]");
		
		var mods = {};
		_.map(st.char.spec.attributes, function(val, key) {
			if (typeof mods[key] == "undefined") {
				mods[key] = 0;
			}
			if (mods[key] === 0) {
				var d20 = -1;
				if ((d20 == -1) && (rank == "private") && ((key == "brawn") || (key == "dexterity"))) {
					d20 = st.math.minDieN(20);		
				} else if ((d20 == -1) && (rank == "sergeant") && ((key == "brawn") || (key == "willpower"))) {
					d20 = st.math.minDieN(20);		
				} else if ((d20 == -1) && (rank == "lieutenant") && ((key == "brains") || (key == "dexterity"))) {
					d20 = st.math.minDieN(20);		
				}
				if ((d20 == -1) && (mos.name == "psi ops") && (key == "willpower")) {
					d20 = st.math.minDieN(20);		
				}
				if (d20 == -1) {
					d20 = st.math.dieN(20);
				}
				st.log("d20[" + d20 + "]");
				if (d20 < val) {
					mods[key] = -1;
				}
			}
		});
		
		st.log("mods[" + mods + "]");
		_.map(st.char.spec.attributes, function(val, key) {
			st.log("st.char.spec.attributes[" + key + "][" + st.char.spec.attributes[key] + "]");
			st.char.spec.attributes[key] -= mods[key];
		});
	},
	
	randomHitpoints: function() {
		st.log("char.randomHitpoints");
		var level = st.char.spec.level;
		var hp = st.math.die(1, 6, 4, true);
				
		// bonus hp due to leveling
		var levelHp = st.math.die(level - 1, 10, 0, true);
		
		var rank = st.char.spec.frosty.rank;
		var rankObj = st.char.findRank(rank);
		var rankHp = 0;
		_.each(rankObj.benefits, function(benefit) {
			if (benefit.type === "equipment") {
				// nothing here - handled in randomRank
			} else if (benefit.type === "hitpoint") {
				rankHp = level;
			}
		});
		
		st.log("hp[" + hp + "], levelHp[" + levelHp + "], rankHp[" + rankHp + "]");
		st.char.spec.frosty["hit points"] = (hp + levelHp + rankHp);
	},
		
	randomMOS: function() {
		st.log("char.randomMOS");
		var foundMOS = null;
		while (foundMOS == null) {
			var mos = st.mos[st.math.dieArray(st.mos)];
			var matches = 0;
			var matchesExpected = mos.attributeMax.length;
			if (matchesExpected > 0) {
				for (var i=0; i<matchesExpected; i++) {
					var am = mos.attributeMax[i];
					_.map(am, function(max, attribute) {
						var val = st.char.spec.attributes[attribute];
						var match = (val <= max) ? 1 : 0;
						matches += match;
					});
				}
			}
			foundMOS = matches === matchesExpected ? mos : null;
		}
		st.char.spec.frosty.mos = foundMOS;
		st.char.processMOS();
	},
	
	processMOS: function() {
		st.log("char.processMOS");
		var mos = st.char.spec.frosty.mos;
		_.each(mos.benefits, function(benefit) {
			st.log("benefit[" + benefit + "]");
			if (benefit.type === "rank") {
				st.log("benefitrank");
				st.char.spec.frosty.rank = benefit.inventory;
			}			
			if (benefit.type === "equipment") {
				st.log("benefitequipment");
				if (benefit.roll) {
					st.log("rolling for equipment");
					var roll = st.math.dieN(6);
					var result = benefit.roll[roll];
					st.log("result[" + result + "]");
					benefit.inventory = result;
					st.char.spec.equipment.push(result);
				} else if (benefit.inventory) {
					st.char.spec.equipment.push(benefit.inventory);
				}
			}			
			if (benefit.type === "ability" && benefit.inventory === "psi-powers") {
				st.log("benefitability");
				var psi = [];
				var size = _.size(st.psi);
				while (psi.length < 3) {
					var i = st.math.dieN0(size);
					var psiI = st.psi[i];
					if (psi.indexOf(psiI.name) === -1) {
						psi.push(psiI.name);
					}
				}
				psi = psi.sort();
				st.char.spec.frosty.psi = psi;
			}			
		});
	},
		
	randomRank: function() {
		st.log("char.randomRank");
		if (st.char.spec.frosty.rank == null) {
			var roll = st.math.dieN(6);
			var rank = "";
			if (roll <= 3) {
				rank = "private";
			} else if (roll <=5) {
				rank = "sergeant";
			} else {
				rank = "lieutenant";
			}
			st.char.spec.frosty.rank = rank;

			var rankObj = st.char.findRank(rank);
			_.each(rankObj.benefits, function(benefit) {
				if (benefit.type === "equipment") {
					if (benefit.inventory) {
						st.char.spec.equipment.push(benefit.inventory);
					}
				} else if (benefit.type === "hitpoint") {
					// nothing here - handled in randomHitPoints
				}
			});				
		}
	},
	
	findRank: function(name) {
		var rank = null;
		_.map(st.ranks, function(val, key) {
			if (rank == null && val.name === name) {
				rank = val;
			}
		});
		return rank;
	},
	
	hasEquipment: function(equipment) {
		var ret = st.char.spec.equipment.indexOf(equipment) > -1;
		return ret;
	},
	
	randomEquipment: function() {
		var baseEquipment = st.equipment.base;
		_.each(baseEquipment, function(base) {
			// do not add infantry rifle if better gun already available
			if (base.equipment == "infantry rifle" && (st.char.hasEquipment("LAW") || st.char.hasEquipment("SAW") || st.char.hasEquipment("sniper rifle"))) {
				return;
			}
			st.char.spec.equipment.push(base.equipment);
		});
	}
};
