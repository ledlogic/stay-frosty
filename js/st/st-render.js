/* st-render.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("render skills");
		st.render.renderReset();
		st.render.renderAttributes();
		st.render.renderFrosty();
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		$(".st-page-ft").html("");
	},
	renderAttributes: function() {
		st.log("render attributes");
		var that = st.char;

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
		var that = st.char;

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
				benArray.push("<td>" + benefit.inventory + "</td>");
			}
			if (benefit.when) {
				benArray.push("<td>" + benefit.when + "</td>");
			}
			benArray.push("</tr>");
		});
		benArray.push("</table>");				
		var benTable = benArray.join("");
		return benTable;
	}
};