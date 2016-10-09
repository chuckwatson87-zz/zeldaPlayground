import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import path from 'path';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(sourcemaps.init())
    .pipe(sass({
            includePaths: [
                    path.dirname(require.resolve('support-for'))
            ]})
    .on('error', sass.logError))
    .pipe(build.bundle());
}
