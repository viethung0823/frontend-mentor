const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// Sass Task
function scssTask(){
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

// JavaScript Task
function jsTask(){
  return src('app/js/script.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// browserSync Tasks
function browserSyncServe(cb){
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browserSyncReload(cb){
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browserSyncReload);
  watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browserSyncReload));
}

// Default Gulp task
exports.default = series(
  scssTask,
  jsTask,
  browserSyncServe,
  watchTask
);