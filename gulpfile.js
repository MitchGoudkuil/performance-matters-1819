const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const cleanCSS = require('gulp-clean-css');
const revReplace = require('gulp-rev-replace');
const pipeline = require('readable-stream').pipeline;
const rename = require("gulp-rename");
const baseDir = 'dist/optimised/';

gulp.task('min-js', function () {
     return gulp.src('./server/public/js/gsap.js')
       .pipe(uglify())
       .pipe(rename(function (path) {
          path.basename += "-min";
          path.extname = ".js";
        }))
       .pipe( gulp.dest(baseDir))
})

gulp.task('min-css', function () {
     return gulp.src('./server/public/css/style.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(cssnano({ discardComments: { removeAll:
        true }}))
      .pipe(rename(function (path) {
         path.basename += "-min";
         path.extname = ".css";
       }))
      .pipe(gulp.dest(baseDir));
})

gulp.task('revision', function(){
  const manifestFilename = "manifest.json";

  gulp.src(baseDir + '**/*.html')
  .pipe(revReplace({
    manifest: gulp.src(baseDir + manifestFilename)
  }))
  .pipe(gulp.dest(baseDir));
})
