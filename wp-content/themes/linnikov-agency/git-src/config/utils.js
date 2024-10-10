import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import struct from "./structure.js";

const aliasToTitle = (alias) => {
	return alias.split("-").map(word => word.replace(/^./, (match) => match.toUpperCase())).join(" ");
}
export const htmlPluginFactory = (pagesMeta) => {
	return pagesMeta.map(({ alias, hasCommonChunk }) =>
		new HtmlWebpackPlugin({
      title: aliasToTitle(alias),
			chunks: [hasCommonChunk && "common", alias],
			publicPath: "./",
      filename: `${alias}.html`,
			template: `${struct.src.dirName}/pages/${alias}/index.hbs`,
			cache: false,
			minify: { collapseWhitespace: false }
    })
	);
}

export const entryPointsFactory = (pagesMeta) => {
	return pagesMeta.reduce((result, { alias, hasStyles }) => {
		result[alias] = [path.join(struct.src.pages.path, `${alias}/scripts`, "index.js")];
		if (hasStyles) result[alias].push(path.join(struct.src.pages.path, `${alias}/styles`, "index.scss"));
		if (alias == "competencies-mob") result[alias].push(path.join(struct.src.pages.path, `competencies/styles`, "index.scss"));
		return result;
	}, {
		common: [
			path.join(struct.src.common.path, "scripts", "index.js"),
			path.join(struct.src.common.path, "styles", "index.scss")
		],
	});
}
export const getPagesMeta = () => {
	return [
		{ alias: "index", hasStyles: false, hasCommonChunk: false },
		{ alias: "home", hasStyles: true, hasCommonChunk: true },
		{ alias: "home-v2", hasStyles: true, hasCommonChunk: true },
		{ alias: "brand-archetypes", hasStyles: true, hasCommonChunk: true },
		{ alias: "works", hasStyles: true, hasCommonChunk: true },
		{ alias: "single-work", hasStyles: true, hasCommonChunk: true },
		{ alias: "news", hasStyles: true, hasCommonChunk: true },
		{ alias: "single-post", hasStyles: true, hasCommonChunk: true },
		{ alias: "ideas", hasStyles: true, hasCommonChunk: true },
		{ alias: "contact", hasStyles: true, hasCommonChunk: true },
		{ alias: "competencies", hasStyles: true, hasCommonChunk: true },
		{ alias: "competencies-mob", hasStyles: true, hasCommonChunk: true },
		{ alias: "about-us", hasStyles: true, hasCommonChunk: true },
		{ alias: "cookies", hasStyles: true, hasCommonChunk: true },
		{ alias: "brief", hasStyles: true, hasCommonChunk: true },
		{ alias: "request", hasStyles: false, hasCommonChunk: true },
		{ alias: "team", hasStyles: true, hasCommonChunk: true },
		{ alias: "careers", hasStyles: true, hasCommonChunk: true },
		{ alias: "designer-application", hasStyles: true, hasCommonChunk: true },
		{ alias: "feedback", hasStyles: true, hasCommonChunk: true },
		{ alias: "privacy-policy", hasStyles: true, hasCommonChunk: true },
		{ alias: "version-select", hasStyles: true, hasCommonChunk: true },
		{ alias: "minpack-exclusive-complimentary", hasStyles: true, hasCommonChunk: true },
	]
}