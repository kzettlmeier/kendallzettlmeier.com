var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cssmin = require('gulp-cssmin');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');

gulp.task('clean', function() {
    return gulp.src('dist', {read:false})
        .pipe(clean());
});

gulp.task('minify-html', function() {
  return gulp.src(['src/**/*.html', '!src/node_modules/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true}))
    .pipe(htmlReplace({
      'css': 'css/bundle.css',
      'js': 'js/bundle.js'
    }))
    .pipe(gulp.dest('dist'));
});
 
gulp.task('minify-js', function (cb) {
  pump([
        gulp.src(['src/js/jquery.min.js', 'src/js/jquery.chocolat.js', 'src/js/jquery.magnific-popup.js', 'src/js/easing.js', 'src/js/modernizr.custom.min.js', 'src/js/move-top.js',
          'src/js/github.js']),
        uglify(),
        concat('bundle.js'),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('minify-css', function() {
  return gulp.src(['src/**/*.css', '!src/node_modules/**/*.css'])
    .pipe(cssmin())
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-images', function() {
  return gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.jpeg', '!src/node_modules/**/*'], {base: 'src'})
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean'], function() {
    runSequence(['minify-html', 'minify-css', 'minify-js', 'copy-images']);
});

gulp.task('default', ['build']);