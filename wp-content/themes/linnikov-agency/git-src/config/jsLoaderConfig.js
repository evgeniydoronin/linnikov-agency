import babelLoaderConfig from "./babel.config.js";

export default {
	"test": /\.m?js$/,
	//"exclude": /node_modules/,
	"use": [
		babelLoaderConfig,
		{
			loader: 'string-replace-loader',
			options: {
				
				multiple: [
					{ search: '@img',
						replace: '../img',
						flags: 'g' },
					{ search: '@#img',
						replace: './img',
						flags: 'g' },
			 ]
			}
		}
	]
}