const gulp       = require('gulp')
const sass       = require('gulp-sass')
const babel      = require('gulp-babel')
const concat     = require('gulp-concat')
const sync       = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps')

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
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(structure.distribution + '/assets/css'))
        .pipe(sync.stream())
})

// Responsible for auto refresh browser in dev
gulp.task('sync', ['babel', 'sass'], () => {

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
    gulp.watch('src/sass/*.js', ['sass'])
})

// Default task
gulp.task('default', ['babel', 'sass'])

// Sync task
gulp.task('watch', ['sync'])

// Production task
gulp.task('production', ['default'])
