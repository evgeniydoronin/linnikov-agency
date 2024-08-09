const config = {
		"loader": "babel-loader",
		"options": {
			"presets": [
				[
					"@babel/preset-env", {
						"targets": {
							"edge": "17",
							"firefox": "60",
							"chrome": "67",
							"safari": "11.1"
						},
						// "include": [
						// 	"@babel/plugin-transform-class-properties"
						// ]
					}
				]
			],
			"plugins": [
				["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
				[
					"@babel/plugin-proposal-class-properties",
					{
						"loose": true
					}
				],
			]
		}
	};
export default config;