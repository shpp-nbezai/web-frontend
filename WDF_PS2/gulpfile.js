let gulp        = require( 'gulp' ),
    browserSync = require( 'browser-sync' ),
    less        = require( 'gulp-less'),
    concat      = require( 'gulp-concat'),
    uglify      = require( 'gulp-uglifyjs'),
    cssnano     = require( 'gulp-cssnano' ),
    rename      = require( 'gulp-rename'),
    importCSS   = require( 'gulp-import-css'),
    inject      = require( 'gulp-inject'),
    jslint      = require( 'gulp-jslint');

gulp.task( 'less', function () {
    return gulp.src( ['resources/less/*.less'] )
        .pipe(less())
        .pipe(gulp.dest( 'public/css' ))
        .pipe( browserSync.reload({
            stream: true
        }));
});

gulp.task('glypicons', function () {
    return gulp.src('node_modules/bootstrap-less/fonts/*')
        .pipe(gulp.dest('public/fonts'))
        .pipe( browserSync.reload({
            stream: true
        }));
});

gulp.task( 'css-libs', ['less'], function () {
    return gulp.src( 'public/css/libs.css' )
        .pipe( cssnano() )
        .pipe( rename( { suffix: '.min'} ))
        .pipe( gulp.dest( 'public/css' ));
});

gulp.task( 'scripts', function () {
    return gulp.src( ['resources/libs/jquery/dist/jquery.min.js',
                      'node_modules/bootstrap-less/**/*.js',
                      'public/js/*.js' ] )
        .pipe( concat( 'libs.min.js' ))
        .pipe( uglify() )
        .pipe( gulp.dest( 'public/js' ));
});

gulp.task('jslint', function () {
    return gulp.src(['public/js/**/*.js'])
        .pipe(jslint())
        .pipe(jslint.reporter( 'my-reporter' ));
});

gulp.task('inject', function () {
    let target = gulp.src('public/index.html');
    let sources = gulp.src(['./public/js/**/*.js', './public/css/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./public'));
});

gulp.task( 'browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'public'
        },
        notify: false
    });
});

gulp.task( 'watch', ['browser-sync', 'css-libs', 'scripts'], function () {
    gulp.watch('resources/less/*.less', ['less']);
    gulp.watch( 'public/*.html', browserSync.reload );
    gulp.watch( 'public/js/*.js', [browserSync.reload, 'jslint'] );
});
