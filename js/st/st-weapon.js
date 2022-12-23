/* st-weapon.js */

st.weapon = {
	specs: [],
	init: function() {
		st.log("weapon init");
		st.weapon.request();
	},
	request: function() {
		st.log("weapon request");
		Papa.parse("data/st-weapon.csv", {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				st.weapon.response(d);
			},
			encoding: "UTF-8"
		});
	},
	response: function(d) {
		st.log("weapon response");
		st.weapon.specs = d.data;
		setTimeout(st.init3, 10);
	},
	names: function() {
		var ret = [];
		_.each(st.weapon.specs, function(spec) {
			ret.push(spec.weapon);
		});
		return ret;
	},
	containsName: function(name) {
		st.log("st.weapon.containsName, name[" + name + "]");
		var names = st.weapon.names();
		st.log("names[" + names + "]");
		var ret = (names.indexOf(name) > -1);
		st.log("ret[" + ret + "]");
		return ret;
	},
	getName: function(name) {
		var names = st.weapon.names();
		return st.weapon.specs[names.indexOf(name)];
	}
};
