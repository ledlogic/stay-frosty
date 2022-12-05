/* st-math.js */

st.math = {
	init: function() {
		st.log("math.init");
	},
	die : function(qty, die, mod) {
		var ret = mod;
		for (var i = 0; i < qty; i++) {
			ret += st.math.dieN(die);
		}
		return ret;
	},
	dieN : function(die) {
		return st.math.dieN0(die) + 1;
	},
	dieN0 : function(die) {
		return Math.floor(Math.random() * die);
	},
	dieArray : function(array) {
		return Math.floor(Math.random() * array.length);
	}
};