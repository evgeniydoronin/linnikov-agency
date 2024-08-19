import CopyPlugin from "copy-webpack-plugin";
import { entryPointsFactory, htmlPluginFactory, getPagesMeta } from "./utils.js";
import ImageminWebpWebpackPlugin from "imagemin-webp-webpack-plugin";
import struct from "./structure.js";
import jsLoaderConfig from "./jsLoaderConfig.js";

const pagesMeta = getPagesMeta();

// const hbsPluginConfig = {
// 	entry: path.join(struct.cwd, struct.src.dirName, "pages", "**", "index.hbs"),
// 	output: path.join(struct.cwd, struct.build.dirName, "[name].html"),
// 	partials: struct.hbs.parts,
// };
// 	console.log("hbsPluginConfig: ", hbsPluginConfig);

export const copyPluginConfig = {
	patterns: [
		{
			from: `${struct.src.path}/img`, to: `img`,
			noErrorOnMissing: true,
			force: true
		}, {
			from: `${struct.src.path}/favicon.*`, to: `./`,
			noErrorOnMissing: true
		},
		{
			from: `${struct.src.path}/libs`, to: `libs`,
			noErrorOnMissing: true,
			force: true
		},
		{
			from: `${struct.src.iconFonts.path}/fonts`, to: `fonts`,
			noErrorOnMissing: true,
			force: true
		},
		{
			from: `${struct.src.path}/video`, to: `video`,
			noErrorOnMissing: true,
			force: true
		},
		{
			from: `${struct.src.path}/cursors`, to: `cursors`,
			noErrorOnMissing: true,
			force: true
		}
	],
};

const config = {
	target: "web",
	mode: "development",
	devtool: 'inline-source-map',
	entry: entryPointsFactory(pagesMeta),
	output: {
		// Should be absolute path
		path: struct.build.path,
		// Should be relative path
		filename: `${struct.build.dirName}/${struct.build.js.dirName}/[name].js`,
		// Should be relative path
		publicPath: `/`,
		clean: true,
	},
	optimization: {
		minimize: false
	},
	devServer: {
		// historyApiFallback: true,
		static: {
			directory: struct.build.dirName,
			watch: true,
		},
		open: true,
		// compress: true,
		// port: 'auto',
		hot: true,
		// host: 'local-ip', // localhost
		// devMiddleware: {
		// 	writeToDisk: true,
		// }
		liveReload: true,
		watchFiles: [
			`${struct.src.dirName}/**/*.hbs`,
			`${struct.build.dirName}/**/*.html`,
			`${struct.build.dirName}/img/**/*`,
		],
	},
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
						}
					},
					{
						loader: 'string-replace-loader',
						options: {
							multiple: [
								{
									search: '@img',
									replace: './img',
									flags: 'g'
								},
								{
									search: '@video',
									replace: './video',
									flags: 'g'
								}
							]
						}
					}
				]
      },
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
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
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'string-replace-loader',
						options: {
							search: '@img',
							replace: '../img',
							flags: 'g'
						}
					}
				],
			},
    ]
	},
	plugins: [
		new CopyPlugin(copyPluginConfig),
		...htmlPluginFactory(pagesMeta),
		//new ImageminWebpWebpackPlugin()
	],
	optimization: {
		runtimeChunk: 'single',
	}
	// resolve: {
	// 	alias: {
	// 		"@img": struct.build.img.path
	// 	},
	// }
};

export default config;