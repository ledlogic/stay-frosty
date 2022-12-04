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
		return Math.floor(Math.random() * die) + 1;
	},
	dieArray : function(array) {
		return Math.floor(Math.random() * array.length);
	},
	dieMap : function(map) {
		var size = _.size(map);
		var i = Math.floor(Math.random() * size);
		var key = _.keys(map)[i];
		return map[key];
	}
};