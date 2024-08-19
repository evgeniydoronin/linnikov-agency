import path from "path";

const struct = {
	cwd: process.cwd(),
	src: {
		dirName: "src",
		pages: {
			dirName: "pages",
		},
		common: {
			dirName: "common",
			styles: {
				dirName: "styles",
			}
		},
		fonts: {
			dirName: "fonts",
			facesFileName: "fonts.scss",
		},
		iconFonts: {
			dirName: "icon-fonts",
			fonts: {
				dirName: "fonts",
			},
			facesFileName: "style.css",
		}
	},
	hbs: {},
	repo: {
		dirName: "repo",
	},
	build: {
		dirName: "build",
		js: {
			dirName: "js",
		},
		img: {
			dirName: "img",
		},
		fonts: {
			dirName: "fonts"
		},
	}
}
struct.src.path = path.join(struct.cwd, struct.src.dirName);
struct.src.pages.path = path.join(struct.src.path, struct.src.pages.dirName);
struct.src.common.path = path.join(struct.src.path, struct.src.common.dirName);
struct.src.common.styles.path = path.join(struct.src.common.path, struct.src.common.styles.dirName);
struct.src.fonts.path = path.join(struct.src.path, struct.src.fonts.dirName);
struct.src.iconFonts.path = path.join(struct.src.path, struct.src.iconFonts.dirName);
struct.src.iconFonts.fonts.path = path.join(struct.src.iconFonts.path, struct.src.iconFonts.fonts.dirName);

struct.build.path = path.join(struct.cwd, struct.build.dirName);
struct.build.js.path = path.join(struct.build.path, struct.build.js.dirName);
struct.build.img.path = path.join(struct.build.path, struct.build.img.dirName);

struct.build.fonts.path = path.join(struct.build.path, struct.src.fonts.dirName);
struct.hbs.parts = [
	path.join(struct.cwd, struct.repo.dirName, "components", "**", "*.hbs"), // Repo components
	path.join(struct.cwd, struct.src.dirName, "components", "**", "*.hbs"), // Project components
	path.join(struct.cwd, struct.src.dirName, "pages", "**", "html", "*.hbs"), // Page components
];
// Пути по которым могут находится кусочки handlebars


export default struct;