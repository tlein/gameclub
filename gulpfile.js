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
    'build/css/main.css'
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
        .add('src/ts/main.ts')
        .plugin('tsify', tsconfig)
        .transform(babelify, babelconfig)
        .bundle()
        .on('error', swallowError)
        .pipe(exorcist('build/scripts/bundle/main.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest('build/scripts/bundle'));
});

gulp.task('spec', function() {
    return browserify({
            paths : ['./src/']
        })
        .add('spec/js/specmain.js')
        .transform(babelify, babelconfig)
        .bundle()
        .pipe(source('spec.js'))
        .pipe(gulp.dest('build/spec/'));
});

gulp.task('index', function() {
    return gulp.src('src/index.jade')
        .pipe(jade({
            locals : DEPEND_LOCALS,
            pretty : true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('specrunner', function() {
    return gulp.src('spec/SpecRunner.jade')
        .pipe(jade({
            locals : DEPEND_LOCALS,
            pretty : true
        }))
        .pipe(gulp.dest('build/spec'));
});

gulp.task('css', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

gulp.task('babel-helpers', function () {
    return gulp.src('src/')
        .pipe(babel({externalHelpers: true}))
        .pipe(babelhelpers('babeleHelpers.js'))
        .pipe(gulp.dest('build/scripts'));
})

gulp.task('watch', function () {
    watch('src/**/*', function() {
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


moveTask('resources', 'resources/**', 'build/resources');
moveTask('package', 'package.json', 'build/');
moveTask('specpackage', 'spec/package.json', 'build/spec');

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
