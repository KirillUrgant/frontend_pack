'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

var dst = {
    js: 'dist/js',
    css: 'dist/css',
    images: 'dist/images',
    fonts: 'dist/fonts'
};

var paths = {
    js: [
        'bower_components/jquery/dist/jquery.min.js',
        'src/js/app.js'
    ],
    images: [
        'src/images/**/*'
    ],
    fonts: [
        'src/fonts/lato/fonts/*'
    ],
    sass: 'src/scss/**/*.scss',
    css: [
        'src/fonts/lato/css/lato.css'
    ],
    view: '../index.html'
};

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(dst.js))
        .pipe(livereload());
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(dst.images))
        .pipe(livereload());
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dst.fonts));
});

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass(({
            includePaths: ['bower_components/foundation/scss']
        })).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/compiled-sass'));
});

gulp.task('css', ['sass'], function () {
    var temp = paths.css;
    temp.push('./dist/css/compiled-sass/*.css');

    return gulp.src(temp)
        .pipe(autoprefixer())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

gulp.task('view', function () {
    return gulp.src(paths.view)
        .pipe(livereload());
});

gulp.task('watch', ['default'], function() {
    livereload.listen();
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.sass, ['css']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.view, ['view']);
});

gulp.task('clean', function() {
    return gulp.src(['dist'])
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('js', 'css', 'images', 'fonts');
});