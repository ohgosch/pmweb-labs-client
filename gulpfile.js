const gulp       = require('gulp')
const sass       = require('gulp-sass')
const clean      = require('gulp-clean')
const babel      = require('gulp-babel')
const concat     = require('gulp-concat')
const sync       = require('browser-sync').create()
const include    = require('gulp-include')
const image      = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const bulk       = require('gulp-sass-bulk-import')

// It's the structure of files
const structure = {
    source      : './src',
    distribution: './'
}

// Responsible for ES6
gulp.task('babel', () => {

    gulp.src(structure.source + '/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(structure.distribution + '/assets/js/'))
        .pipe(sync.stream())
})

// Compile sass files
gulp.task('sass', () => {

    gulp.src(structure.source + '/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(bulk())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(structure.distribution + '/assets/css'))
        .pipe(sync.stream())
})

// Responsible for auto refresh browser in dev
gulp.task('sync', ['babel', 'sass', 'image'], () => {

    sync.init({
        server: {
            baseDir: structure.distribution
        }
    })

    /**
     * If change in distribution
     */
    // HTML
    gulp.watch(structure.distribution + '/*.html').on('change', sync.reload)

    // JavaScript
    gulp.watch(structure.distribution + '/assets/**/*.js').on('change', sync.reload)

    /**
     * If change in source
     */
    // JavaScript
    gulp.watch('src/js/**/*.js', ['babel'])

    // CSS
    gulp.watch('src/sass/**/*', ['sass'])

    // Image
    gulp.watch(structure.source + '/img/**/*', ['image']).on('change', sync.reload)
})

// Clean assets folder
gulp.task('clean', () => {

    return gulp.src(structure.distribution + '/assets/')
        .pipe(clean())
        .pipe(sync.stream())
})

gulp.task('image', () => {

    gulp.src(structure.source + '/img/**/*')
        .pipe(image())
        .pipe(gulp.dest(structure.distribution + '/assets/img/'))
})

// Default task
gulp.task('default', ['babel', 'sass', 'image'])

// Sync task
gulp.task('watch', ['sync'])

// Production task
gulp.task('production', ['default'])
