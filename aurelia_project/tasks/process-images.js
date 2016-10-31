import gulp from 'gulp';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processImages() {
  return gulp.src(project.imageProcessor.source)
    .pipe(gulp.dest('./wwwroot/dist'));
    //.pipe(build.bundle());
}
