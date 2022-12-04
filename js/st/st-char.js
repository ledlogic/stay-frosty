/* st-char.js */

st.char = {
	spec: {
		attributes: {
			"brains": 0,
			"brawn": 0,
			"dexterity": 0,
			"willpower": 0
		}
	},

	init: function() {
		st.log("char.init");
	},
	
	random: function() {
		st.log("char.random");
		st.char.randomAttributes();
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
		st.char.spec.attributes[highest.key] = st.char.randomStat();
		st.log(st.char.spec.attributes);
	}
};
