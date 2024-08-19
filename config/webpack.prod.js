import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ImageminWebpWebpackPlugin from "imagemin-webp-webpack-plugin";
import { entryPointsFactory, htmlPluginFactory, getPagesMeta } from "./utils.js";
import { copyPluginConfig } from "./webpack.dev.js";
import struct from "./structure.js";
import jsLoaderConfig from "./jsLoaderConfig.js";

const pagesMeta = getPagesMeta();

// const hbsPluginConfig = {
// 	entry: path.join(struct.cwd, struct.src.dirName, "pages", "**", "index.hbs"),
// 	output: path.join(struct.cwd, struct.build.dirName, "[name].html"),
// 	partials: struct.hbs.parts,
// };
// 	console.log("hbsPluginConfig: ", hbsPluginConfig);
const config = {
	target: "web",
	mode: "production",
	entry: entryPointsFactory(pagesMeta),
	output: {
		// Should be absolute path
		path: struct.build.path,
		// Should be relative path
		filename: `${struct.build.js.dirName}/[name].min.js`,
		// Should be relative path
		publicPath: `/`,
	},
	optimization: { minimize: true },
	module: {
		rules: [
			jsLoaderConfig,
      {
        test: /\.hbs$/,
				use: [
					{
						loader: 'handlebars-loader',
						options: {
							//rootRelative: `${struct.cwd}/${struct.src.dirName}/shared/partials/`,
							helperDirs: `${struct.cwd}/${struct.src.dirName}/hbs-helpers/`,
						},
					},
					{
						loader: 'string-replace-loader',
						options: {
							search: '@img',
							replace: './img',
							flags: 'g'
						}
					},
				]
      },
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'string-replace-loader',
						options: {
							search: '@img',
							replace: '../img',
							flags: 'g'
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: false,
							url: {
								filter: (url, resourcePath) => {
									if (url.includes("img/") || url.includes("fonts/") || url.includes("cursors/")) {
										return false;
									}
									return true;
								},
							},
						},
					},
					// "group-css-media-queries-loader",
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				],
			},
    ]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css',
		}),
		new CopyPlugin(copyPluginConfig),
		...htmlPluginFactory(pagesMeta),
		new ImageminWebpWebpackPlugin()
	],
	// resolve: {
	// 	alias: {
	// 		"@img": struct.build.img.path
	// 	},
	// }
};

export default config;