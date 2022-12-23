/* st-mos.js */

/* mos = military occupational specialty code */

st.mos = [
	{
		"name": "armor", 
		"attributeMax": [],
		"benefits": [
			{
				"type": "advantage",
				"when": "operate or repair an armored vehicle"
			},
			{
				"type": "equipment",
				"roll": {
					1: "light tank",
					2: "light tank",
					3: "light tank",
					4: "APC",
					5: "APC",
					6: "APC"
				}
			},
			{
				"type": "equipment",
				"inventory": "toolkit"
			}			
		]
	},
	{
		"name": "cyber", 
		"attributeMax": [
			{"brains": 11}
		],
		"benefits": [
			{
				"type": "advantage",
				"when": "hack computers/electronics"
			},
			{
				"type": "equipment",
				"inventory": "wrist-comp"
			}
		]
	},
	{
		"name": "engineer", 
		"attributeMax": [
			{"brains": 11}
		],
		"benefits": [
			{
				"type": "advantage",
				"when": "damage rolls for explosives"
			},
			{
				"type": "equipment",
				"inventory": "satchel charge"
			},
			{
				"type": "equipment",
				"inventory": "toolkit"
			}
		]
	},
	{
		"name": "infantry", 
		"attributeMax": [],
		"benefits": [
			{
				"type": "ability",
				"when": "reroll 1's on damage rolls for personal weapons"
			},
			{
				"type": "equipment",
				"roll": {
					1: "grenades",
					2: "grenades",
					3: "SAW",
					4: "sniper rifle",
					5: "LAW",
					6: "flamer"
				} 
			} 
		]
	},
	{
		"name": "intelligence",
		"attributeMax": [
			{"brains": 10}
		],
		"benefits": [
			{
				"type": "advantage",
				"when": "gathering information"
			},
			{
				"type": "advantage",
				"when": "initiative rolls for planned attacks"
			},
			{	"type": "equipment",
				"inventory": "wrist-comp"
			}
		]
	},
	{
		name: "medical", 
		"attributeMax": [
			{"brains": 9}
		],
		"benefits": [
			{
				"type": "advantage",
				"when": "healing rolls"
			},
			{ 
				"type": "equipment",
				"inventory": "medpack"
			}
		] 
	},
	{
		"name": "psi ops", 
		"attributeMax": [
			{"willpower": 8}
		],
		"benefits": [
			{
				"type": "ability",
				"inventory": "psi-powers" 
			},
			{ 
				"type": "equipment",
				"inventory": "no helmet"
			},
			{
				"type": "rank",
				"inventory": "lieutenant"
			}
		]
	},
	{
		"name": "spec ops", 
		"attributeMax": [
			{"brains": 10},
			{"brawn": 10},
			{"dexterity": 10},
			{"willpower": 10}
		],
		"benefits": [
			{
				"type": "advantage",
				"when": "damage roll once per fight"
			},
			{
				"type": "ability",
				"when": "ignore one Tension Explodes result per day"
			},
			{
				"type": "equipment",
				"roll": {
					1: "SAW",
					2: "SAW",
					3: "grenades",
					4: "grenades",
					5: "LAW",
					6: "sniper rifle"
				} 
			}, 
			{ 
				"type": "equipment",
				"inventory": "badass beret"
			}
		]
	}
];