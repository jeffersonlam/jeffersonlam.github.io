'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');


gulp.task('scss', function() {
  return gulp.src('scss/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('./css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        open: false
    });
});

gulp.task('js', function() {
  gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('./js'));
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(gulp.dest('./'))
    .pipe(reload({stream:true}));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['browser-sync', 'js', 'scss', 'watch']);
