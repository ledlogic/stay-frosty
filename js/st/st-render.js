/* st-render.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("render skills");
		st.render.renderReset();
		st.render.renderName();
		st.render.renderAttributes();
		st.render.renderFrosty();
		st.render.renderWeapons();
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		$(".st-page-ft").html("");
	},
	renderName: function() {
		st.log("render name");

		var t = [];
			
		// skills
		t.push("<table class=\"st-name\"><tbody>");

		var r = [];

		// rank
		var rank = st.char.spec.frosty.rank;
		r.push("<tr>");
		r.push("<th>rank:</th>");
		r.push("<td>" + rank + "</td>");
		r.push("</tr>");
		
		// name
		var name= st.char.spec.name;
		r.push("<tr>");
		r.push("<th>name:</th>");
		r.push("<td>" + name + "</td>");
		r.push("</tr>");
		
		// mos/level
		var mosName= st.char.spec.frosty.mos.name;
		r.push("<tr>");
		r.push("<th>MOS:</th>");
		r.push("<td>" + mosName + "</td>");

		var level = st.char.spec.level;
		r.push("<th>level:</th>");
		r.push("<td>" + level + "</td>");
		r.push("</tr>");		
		
		t.push(r.join(""));
		t.push("</tbody></table>");

		$(".st-page-ft").append(t.join(""));
	},
	renderAttributes: function() {
		st.log("render attributes");
		var t = [];
			
		// skills
		t.push("<table class=\"st-attributes\"><tbody>");
		t.push("<tr><th colspan=\"4\" class=\"st-attributes-desc\">Attributes</th></tr>");
		
		var r1 = [];
		var r2 = [];
		r1.push("<tr>");
		r2.push("<tr>");
		_.map(st.char.spec.attributes, function(val, key) {
			r1.push("<th>" + key + "</th>");
			r2.push("<td>" + val + "+</td>");				
		});
		r1.push("</tr>");
		r2.push("</tr>");
		t.push(r1.join("") + r2.join(""));
		t.push("</tbody></table>");

		$(".st-page-ft").append(t.join(""));
	},
	renderFrosty: function() {
		st.log("render frosty");

		var t = [];
			
		// skills
		t.push("<table class=\"st-frosty\"><tbody>");
		
		var r1 = [];
		var r2 = [];
		r1.push("<tr class=\"st-frosty-desc\">");
		r2.push("<tr>");
		_.map(st.char.spec.frosty, function(val, key) {
			// th
			if (key === "mos") {
				r1.push("<th class=\"mos\">" + key + "</th>");
			} else if (key === "psi") {
			} else {
				r1.push("<th>" + key + "</th>");
			}
			
			// td
			if (key === "frostiness") {
				var str = []
				for (var i=1; i<=6; i++) {
					str.push("___" + i + " " + st.frostiness[i] + "</br>");
				}
				r2.push("<td class=\"frostiness\">" + str.join("") + "</td>");
			} else if (key === "mos") {
				var benefits = val.benefits;
				var benTable = st.render.renderBenefits(benefits);
				r2.push("<td class=\"mos\">" + benTable + "</td>");
			} else if (key === "rank") {
				var rank = st.char.findRank(val);
				var benefits = rank.benefits;
				var benTable = st.render.renderBenefits(benefits);
				r2.push("<td class=\"rank\">" + val + benTable + "</td>");
			} else if (key === "psi") {
			} else {
				var keyClass = (key+"").replace(" ", "-");
				r2.push("<td class=\"" + keyClass + "\">" + val + "</td>");
			}
		});
		r1.push("</tr>");
		r2.push("</tr>");
		t.push(r1.join("") + r2.join(""));
		t.push("</tbody></table>");

		$(".st-page-ft").append(t.join(""));
	},
	renderBenefits: function(benefits) {
		st.log("render benefits");
		var benArray = [];
		benArray.push("<table>");
		_.each(benefits, function(benefit) {
			benArray.push("<tr>");
			if (benefit.type) {
				benArray.push("<th>" + benefit.type + ":</th>");
			}
			if (benefit.roll) {
				var r = st.math.dieN(6);
				var res = benefit.roll[r];
				benArray.push("<td>" + res + "</td>");
			}
			if (benefit.inventory) {
				benArray.push("<td>");
				benArray.push(benefit.inventory);
				if (benefit.type === "ability" && benefit.inventory === "psi-powers") {
					var psi = st.char.spec.frosty.psi;
					for (var i=0; i<(psi ? psi.length : 0); i++) {
						benArray.push("<br/>" + (i+1) + ": " + psi[i]);
					}
				}
				benArray.push("</td>");
			}
			if (benefit.when) {
				benArray.push("<td>" + benefit.when + "</td>");
			}
			benArray.push("</tr>");
		});
		benArray.push("</table>");				
		var benTable = benArray.join("");
		return benTable;
	},
	renderWeapons: function() {
		st.log("render weapons");

		var t = [];
			
		// weapons
		t.push("<table class=\"st-weapons\"><tbody>");
		
		// specs
		var r = [];
		var first = _.first(st.weapon.specs, 1);
		_.each(first, function(spec) {
			r.push("<tr class=\"st-weapons-desc\">");
			_.map(spec, function(val, key) {
				var slugKey = key.replace(" ", "-");
				r.push("<th class=\"" + slugKey + "\">" + key + "</th>");
			});
			r.push("</tr>");
		});
		
		// character weapons
		// weapons are part of equipment but are found in the weapon list
		_.each(st.char.spec.equipment, function(equipment) {
			if (st.weapon.containsName(equipment)) {
				var spec = st.weapon.getName(equipment);
				if (spec) {
					r.push("<tr>");
					r.push("<td class=\"weapon\">" + spec.weapon + "</td>");
					r.push("<td class=\"damage\">" + spec.damage + "</td>");
					r.push("<td class=\"range\">" + spec.range + "</td>");
					r.push("<td class=\"ammo\">" + spec.ammo + "</td>");
					r.push("<td class=\"special\">" + spec.special + "</td>");
					r.push("</tr>");
				}
			}
		});
		r.push("</tr>");
		t.push(r.join(""));
		t.push("</tbody></table>");

		$(".st-page-ft").append(t.join(""));
	}
};