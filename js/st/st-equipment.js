/* st-equipment.js */

st.equipment = {
	base: [],
	init: function() {
		st.log("equipment init");
		st.equipment.requestBase();
	},
	requestBase: function() {
		st.log("equipment base request");
		Papa.parse("data/st-base-equipment.csv", {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				st.equipment.responseBase(d);
			},
			encoding: "UTF-8"
		});
	},
	responseBase: function(d) {
		st.log("equipment base response");
		st.equipment.base = d.data;
		setTimeout(st.init2, 10);
	}
};
