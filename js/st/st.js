/* st.js */

var st = {
	log: function(s) {
		if (typeof(window.console) != "undefined") {
			console.log(s);
		}
	},

	init: function() {
		st.log("st.init");
		st.math.init();
		st.utils.init();
		st.render.init();
		st.char.init();
		st.char.random();
		st.render.render();
	}
};

$(document).ready(st.init);
