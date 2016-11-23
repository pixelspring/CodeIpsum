'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var filesize = require('gulp-size');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

// ------------------------------------------------
// Sass:
// ------------------------------------------------
// (1)  Compile Sass
// (2)  Add vendor prefixes w/autoprefixer
// (3)  Display filesize
// (4)  Minify with css-nano
// (5)  Display Minified filesize
// ------------------------------------------------
gulp.task('sass', function () {

    gulp.src('./src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(filesize({
            showFiles: true,
            title: 'Pre Min: '
        }))
        .pipe(cssnano({
            autoprefixer: false,
            zindex: false
        }))

        .pipe(filesize({
            showFiles: true,
            title: 'CssNano: '
        }))

    .pipe(gulp.dest('./dist/css/'))

});

// ------------------------------------------------
// JavaScript:
// ------------------------------------------------
// (1)  Compress with Uglify
// ------------------------------------------------
gulp.task('javascript', function() {

    gulp.src('./src/js/**.js')
        .pipe(filesize({
            showFiles: true,
            title: 'Pre Ugly: '
        }))
        .pipe(uglify({
            mangle: {
                toplevel: false
            }
        }))
        .pipe(concat('app.min.js'))
        .pipe(filesize({
            showFiles: true,
            title: 'Uglified: '
        }))
        .pipe(gulp.dest('./dist/js/'));

});

// ------------------------------------------------
// HTML:
// ------------------------------------------------
// (1)  Compress with HTML-Min
// ------------------------------------------------
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: false,
            html5: true,
            }))
        .pipe(gulp.dest('./dist'));
});

// ------------------------------------------------
// BrowserSync:
// ------------------------------------------------
// (1)  
// ------------------------------------------------
gulp.task('browser-sync', function() {
    console.log("browser-sync");
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


// ------------------------------------------------
// Watchers:
// ------------------------------------------------
gulp.task('default', ['browser-sync'], function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', ['javascript']).on('change', browserSync.reload);
    gulp.watch('./src/*.html', ['html']).on('change', browserSync.reload);
});
