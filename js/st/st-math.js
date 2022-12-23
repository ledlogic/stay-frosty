/* st-math.js */

st.math = {
	init: function() {
		st.log("math.init");
	},
	die: function(qty, die, mod) {
		var ret = mod;
		for (var i = 0; i < qty; i++) {
			ret += st.math.dieN(die);
		}
		return ret;
	},
	dieN: function(die) {
		var ret = st.math.dieN0(die) + 1;
		return ret;
	},
	dieN0: function(die) {
		return Math.floor(Math.random() * die);
	},
	dieArray: function(array) {
		return Math.floor(Math.random() * array.length);
	},
	minDieN: function(die) {
		var d20a = st.math.dieN(die);
		var d20b = st.math.dieN(die);
		var d20 = Math.min(d20a, d20b);
		return d20;
	},
	maxDieN: function(die) {
		var d20a = st.math.dieN(die);
		var d20b = st.math.dieN(die);
		var d20 = Math.max(d20a, d20b);
		return d20;
	}
};