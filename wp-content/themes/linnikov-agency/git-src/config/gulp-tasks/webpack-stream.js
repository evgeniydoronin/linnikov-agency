import gulp from "gulp";
import webpackStream from "webpack-stream";
import config from "../webpack.prod.js";
import struct from "../structure.js";

export function runWebpackStream(cb) {
	return gulp.src(".", { allowEmpty: true })
		.pipe(webpackStream({ config }))
		.pipe(gulp.dest(struct.build.path));
}