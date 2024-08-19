import gulp from "gulp";
import fs from 'fs';
import struct from "../structure.js";

export const processFontFaces = (cb) => {
	const facesSrcPath = `${struct.src.iconFonts.path}/${struct.src.iconFonts.facesFileName}`;
	const facesDestPath = `${struct.src.common.styles.path}/icon-fonts.scss`;
		console.log(`facesSrcPath: ${facesSrcPath}; facesDestPath: ${facesDestPath}`);
	if (!fs.existsSync(facesSrcPath)) {
		console.log("Icon font faces styles was not found by the path");
		return cb();
	}
	if (fs.existsSync(facesDestPath)) {
		if (process.argv.includes('--rewrite')) {
			try {
				fs.unlinkSync(facesDestPath);
				console.log("Current icon-fonts.scss has been removed");
			} catch (err) {
				console.error(`Error encountered while icon-fonts.scss removal: ${err}`);
			}
		} else {
			console.log("Файл icon-fonts.scss уже существует. Для обновления файла нужно его удалить или применить флаг --rewrite!");
			return cb();
		}
	}
	let facesSrc, facesDestFile;
	try {
		facesSrc = fs.readFileSync(facesSrcPath, 'utf8');
		facesDestFile = fs.openSync(facesDestPath, "wx");
		const pathedFaces = facesSrc.replace(/fonts\//g, "../fonts/");
		fs.writeSync(facesDestFile, pathedFaces, null);
		fs.closeSync(facesDestFile);
	} catch(ex) {
		fs.closeSync(facesDestFile);
		fs.rmSync(facesDestPath);
		console.error("Error encountered while converting icon font faces", ex);
	}
	cb();
}
export const copyFonts = (cb) => {
	return gulp.src(`${struct.src.iconFonts.fonts.path}/**`)
		.pipe(gulp.dest(struct.build.fonts.path));
}
export const processIconFonts = gulp.series(processFontFaces, copyFonts);