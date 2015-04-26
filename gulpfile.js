'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var plumber = require('gulp-plumber');
var deploy = require('gulp-gh-pages');
var notify = require('gulp-notify');


gulp.task('scss', function() {
    var onError = function(err) {
      notify.onError({
          title:    'Gulp',
          subtitle: 'SCSS Compile Error!',
          message:  '<%= error.message %>',
          sound:    'Tink'
      })(err);
      this.emit('end');
  };

  return gulp.src('scss/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('deploy', function () {
    return gulp.src('dist/**/*')
        .pipe(deploy());
});

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scss-lint', function() {
  gulp.src('scss/**/*.scss')
    .pipe(scsslint());
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('js/*.js', ['jshint', 'js']);
  gulp.watch('./*.html', ['html']);
  gulp.watch('img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['scss-lint', 'browser-sync', 'js', 'imgmin', 'html', 'scss', 'watch']);
