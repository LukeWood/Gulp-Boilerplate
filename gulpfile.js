// Add our dependencies
var gulp = require('gulp'), // Main Gulp module
    concat = require('gulp-concat'), // Gulp File concatenation plugin
    open = require('gulp-open'), // Gulp browser opening plugin
    connect = require('gulp-connect'), // Gulp Web server runner plugin
    gulpPostcss = require('gulp-postcss'),
    sorting = require('postcss-sorting');

const eslint = require('gulp-eslint');

// Configuration
var configuration = {
    paths: {
        src: {
            html: './src/*.html',
            css: [
                './src/css/*.css'
            ],
            js: './src/js/*.js',
            img: './src/img/*'
        },
        cssdir: './src/css/',
        dist: './dist'
    },
    localServer: {
        port: 8001,
        url: 'http://localhost:8001/'
    }
};

// Gulp task to copy HTML files to output directory
gulp.task('img', function() {
    gulp.src(configuration.paths.src.img)
        .pipe(gulp.dest(configuration.paths.dist+'/img'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src(configuration.paths.src.js)
        .pipe(gulp.dest(configuration.paths.dist+'/js/'))
        .pipe(connect.reload());
});

gulp.task('jslint', function() {
    gulp.src(configuration.paths.src.js)
      .pipe(eslint({fix: true}))
      .pipe(eslint.format())
      .pipe(gulp.dest('./src/js/'))
});

// Gulp task to copy HTML files to output directory
gulp.task('html', function() {
    gulp.src(configuration.paths.src.html)
        .pipe(gulp.dest(configuration.paths.dist))
        .pipe(connect.reload());
});

// Gulp task to concatenate our css files
gulp.task('css', function () {
   gulp.src(configuration.paths.src.css)
       .pipe(concat('homepage.css'))
       .pipe(gulp.dest(configuration.paths.dist + '/css'))
       .pipe(connect.reload());
});

gulp.task('csslint', function () {
  return gulp.src(configuration.paths.src.css)
    .pipe(gulpPostcss([]))
    .pipe(gulp.dest(configuration.paths.cssdir));
});

// Gulp task to create a web server
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: configuration.localServer.port,
        livereload: true
    });
});

// Gulp task to open the default web browser
gulp.task('open', function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: configuration.localServer.url}));
});

// Watch the file system and reload the website automatically
gulp.task('watch', function () {
    gulp.watch(configuration.paths.src.html, ['html']);
    gulp.watch(configuration.paths.src.css, ['css']);
    gulp.watch(configuration.paths.src.css, ['csslint']);
    gulp.watch(configuration.paths.src.img, ['img']);
    gulp.watch(configuration.paths.src.js, ['js']);
    gulp.watch(configuration.paths.src.js, ['jslint']);
});

// Gulp default task
gulp.task('default', ['html', 'img', 'css', 'csslint', 'jslint', 'connect', 'open', 'watch']);
