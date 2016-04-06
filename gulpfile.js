var gulp = require('gulp');
var exorcist = require('exorcist');
var jade = require('gulp-jade');
var jadens = require('gulp-jade-namespace');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var tsify = require('tsify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var typescript = require('typescript');

var jsdepends = [
]

var cssdepends = [
    'static/css/main.css'
]

var DEPEND_LOCALS = {
    jsdepends: jsdepends,
    cssdepends: cssdepends
}

var tsconfig = {
    target : "es6",
    typescript: typescript
}

var babelconfig = {
    presets : ["es2015"],
    extensions : [".js", ".ts", ".tsx"]
}

gulp.task('typescript', function () {
    return browserify({
            debug : true,
            paths : ['./node_modules']
        })
        .add('client/ts/main.ts')
        .plugin('tsify', tsconfig)
        .transform(babelify, babelconfig)
        .bundle()
        .on('error', swallowError)
        .pipe(exorcist('server/static/scripts/bundle/main.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest('server/static/scripts/bundle'));
});

gulp.task('spec', function() {
    return browserify({
            paths : ['./client/']
        })
        .add('spec/js/specmain.js')
        .transform(babelify, babelconfig)
        .bundle()
        .pipe(source('spec.js'))
        .pipe(gulp.dest('server/static/spec/'));
});

gulp.task('index', function() {
    return gulp.src('client/index.jade')
        .pipe(jade({
            locals : DEPEND_LOCALS,
            pretty : true
        }))
        .pipe(gulp.dest('server/static'));
});

gulp.task('specrunner', function() {
    return gulp.src('spec/SpecRunner.jade')
        .pipe(jade({
            locals : DEPEND_LOCALS,
            pretty : true
        }))
        .pipe(gulp.dest('server/static/spec'));
});

gulp.task('css', function() {
    return gulp.src('client/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('server/static/css'));
});

gulp.task('babel-helpers', function () {
    return gulp.src('client/')
        .pipe(babel({externalHelpers: true}))
        .pipe(babelhelpers('babeleHelpers.js'))
        .pipe(gulp.dest('server/static/scripts'));
})

gulp.task('watch', function () {
    watch('client/**/*', function() {
        gulp.run('default');
    });
    watch('spec/**/*', function() {
        gulp.run('tests');
    });
});


function moveTask(taskName,fileGlob,dest) {
    gulp.task(taskName, function() {
        return gulp.src(fileGlob).pipe(gulp.dest(dest));
    });
}

function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}


moveTask('resources', 'resources/**', 'server/static/resources');
moveTask('package', 'package.json', 'server/static/');
moveTask('specpackage', 'spec/package.json', 'server/static/spec');

gulp.task('tests', [
    'spec',
    'specrunner',
    'specpackage'
]);

gulp.task('gameclub', [
    'typescript',
    'css',
    'index',
    'package',
    'resources'
]);

gulp.task('default', [
    'gameclub',
    'tests'
]);
