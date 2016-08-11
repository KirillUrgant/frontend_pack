'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var version = '1.0.0';

var dst = {
    js: 'dist/js',
    css: 'dist/css',
    images: 'dist/images',
    fonts: 'dist/fonts'
};

var paths = {
    js: [
        'bower_components/jquery/dist/jquery.min.js',
        'js/app.js'
    ],
    images: [
        'images/**/*'
    ],
    fonts: [
        'fonts/lato/fonts/*'
    ],
    sass: 'scss/**/*.scss',
    css: [
        'fonts/lato/css/lato.css'
    ]
};

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(concat(version + '.all.js'))
        .pipe(gulp.dest(dst.js));
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(dst.images));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dst.fonts));
});

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass(({
            includePaths: ['bower_components/mindy-sass/mindy']
        })).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/compiled-sass'));
});

gulp.task('css', ['sass'], function () {
    var temp = paths.css;
    temp.push('./dist/css/compiled-sass/*.css');

    return gulp.src(temp)
        .pipe(concat(version+'.all.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.sass, ['css']);
    gulp.watch(paths.fonts, ['fonts']);
});

gulp.task('clean', function() {
    return gulp.src(['dist'])
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('js', 'css', 'images', 'fonts');
});