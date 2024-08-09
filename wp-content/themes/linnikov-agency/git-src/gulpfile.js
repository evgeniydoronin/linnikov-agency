// Импорт основного модуля
import gulp from "gulp";
import { cleanAll } from "./config/gulp-tasks/clean.js";
import { buildFonts } from "./config/gulp-tasks/fonts.js";
import { runWebpackStream } from "./config/gulp-tasks/webpack-stream.js";
import { processIconFonts } from "./config/gulp-tasks/icon-fonts.js";

export const build = gulp.series(cleanAll, buildFonts, processIconFonts, runWebpackStream);

export { processIconFonts };
export { buildFonts };
export { runWebpackStream };

gulp.task('default', build);