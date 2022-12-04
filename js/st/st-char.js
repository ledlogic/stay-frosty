/* st-char.js */

st.char = {
	spec: {
		attributes: {
			"brains": 0,
			"brawn": 0,
			"dexterity": 0,
			"willpower": 0
		},
		frosty: {
			"hit points": 0,
			"armor": 0,
			"tension/frostiness": 1,
			"mos": null,
			"rank": null
		},
		
	},

	init: function() {
		st.log("char.init");
	},
	
	random: function() {
		st.log("char.random");
		st.char.randomAttributes();
		st.char.randomMOS();
		st.char.randomRank();
		st.char.randomHitpoints();
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
		st.log(st.char.spec.attributes);
		
		// re-roll highest
		st.log("rerolling " + highest.key);
		st.char.spec.attributes[highest.key] = st.char.randomStat();
		st.log(st.char.spec.attributes);
	},
	
	randomHitpoints: function() {
		st.log("char.randomHitpoints");
		var hp = st.math.die(1, 6, 4);
		st.char.spec.frosty["hit points"] = hp;
	},
		
	randomMOS: function() {
		st.log("char.randomMOS");
		
		var foundMOS = null;
		while (foundMOS == null) {
			var mos = st.mos[st.math.dieArray(st.mos)];
			st.log(mos);
			var matches = 0;
			var matchesExpected = mos.attributeMax.length;
			if (matchesExpected > 0) {
				for (var i=0;i<matchesExpected;i++) {
					var am = mos.attributeMax[i];
					_.map(am, function(max, attribute) {
						var val = st.char.spec.attributes[attribute];
						var match = (val <= max) ? 1 : 0;
						matches += match;
					});
				}
			}
			st.log(matches + "/" + matchesExpected);
			foundMOS = matches === matchesExpected ? mos : null;
		}
		st.char.spec.frosty.mos = foundMOS;
	},
		
	randomRank: function() {
		st.log("char.randomRank");
		var rank = {name: "private"};		
		st.char.spec.frosty.rank = rank;
	}
};
