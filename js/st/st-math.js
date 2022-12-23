/* st-math.js */

st.math = {
	init: function() {
		st.log("math.init");
	},
	die : function(qty, die, mod, display) {
		var ret = mod;
		if (display) {
			st.log("rolling qty[" + qty + "], die[" + die + "], mod[" + mod + "]");
		}
		for (var i = 0; i < qty; i++) {
			ret += st.math.dieN(die, display);
		}
		if (display) {
			st.log("rolled qty[" + qty + "], die[" + die + "], mod[" + mod + "], ret[" + ret + "]");
		}
		return ret;
	},
	dieN : function(die, display) {
		var ret = st.math.dieN0(die) + 1;
		if (display) {
			st.log("rolling die[" + die + "], ret[" + ret + "]");
		}
		return ret;
	},
	dieN0 : function(die) {
		return Math.floor(Math.random() * die);
	},
	dieArray : function(array) {
		return Math.floor(Math.random() * array.length);
	}
};