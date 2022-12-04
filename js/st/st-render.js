/* st-render.js */

st.render = {
	init: function() {
		st.log("render.init");
	},
	render: function() {
		st.log("render skills");
		st.render.renderReset();
		st.render.renderAttributes();
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
			r2.push("<td>" + val + "</td>");				
		});
		r1.push("</tr>");
		r2.push("</tr>");
		t.push(r1.join("") + r2.join(""));
		t.push("</tbody></table>");

		$(".st-page-ft").html(t.join(""));
	}
};