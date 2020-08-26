


//====================================
//              modules             //
//====================================
const gulp = require('gulp');
const sass = require('gulp-sass');
const csscomb = require('gulp-csscomb');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const tinpng = require('gulp-tinypng');
// const watch = require('gulp-watch');
const newer = require('gulp-newer');
const svgo = require('gulp-svgo');
const twig = require('gulp-twig');
const replace = require('gulp-replace');
const htmlbeautify = require('gulp-html-beautify');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
// svgSprite = require('gulp-svg-sprite');

const tailwindcss = require('tailwindcss');


//====================================
//              Default             //
//====================================

/*
gulp.task('default',
    [
        'browser-sync',
        'watch',
        'all'
    ]
);

gulp.task('all',
    [
        'scss',
        'twig',
        // 'js',
        'fonts',
        'img-tin',
        'concat-css-libs',
        // 'concat-js-libs',
        // 'svg'
    ]
);

*/



//====================================
//          BrowserSync            //
//====================================



function doBrowserSync(done) {
  browserSync.init({
    server: {
      baseDir: "public"
    },
    port: 3000
  });
  done();
}

// // BrowserSync Reload
// function doBrowserSyncReload(done) {

//   browsersync.reload();
//   done();
// }

//====================================
//               watch              //
//====================================

function doWatch () {

  gulp.watch('resources/scss/**/*.scss', doScss);
  gulp.watch('resources/twig/**/*.scss', doScss);
  gulp.watch('resources/twig/**/*.twig', doTwig);
  gulp.watch('resources/twig/**/*.html', doTwig);

}

//====================================
//                Twig              //
//====================================

function doTwig () {

  return gulp.src('resources/twig/pages/*.{twig,html}')
    .pipe(plumber())
    .pipe(twig())
    .pipe(replace('/resources/', ''))
    .pipe(htmlbeautify())
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
}


//====================================
//     scss / html / js / fonts     //
//====================================

function doScss () {

  return gulp.src(['resources/scss/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(concat('style.scss'))
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      tailwindcss('tailwind.config.js'),
    ]))
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(replace('/resources/', '../'))
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/frontend/css/'))
    .pipe(browserSync.stream());

}


// gulp.task('js', function () {
//     gulp.src('resources/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('public/js/'))
//         .pipe(browserSync.stream());
// });

// gulp.task('fonts', function () {
//   return watch('resources/fonts/**/**/*.*', function () {
//     gulp.src('resources/fonts/**/**/*.*')
//       .pipe(plumber())
//       .pipe(newer('app/fonts'))
//       .pipe(gulp.dest('app/fonts'));
//   });
// });

function doFonts() {
  return gulp.src('resources/fonts/**/**/*.*')
    .pipe(plumber())
    .pipe(newer('app/fonts'))
    .pipe(gulp.dest('app/fonts'));
}

// gulp.task('svg', function () {
//     return watch('src/img/**/**/*.svg', function () {
//         gulp.src('src/img/**/**/*.svg')
//             .pipe(plumber())
//             .pipe(svgo())
//             .pipe(gulp.dest('app/img'));
//     });
// });

//====================================
//           concat-libs            //
//====================================

// gulp.task('concat-css-libs', function () {
//     return watch('src/css/plugins/*.css', function () {
//         gulp.src([
//             'src/css/plugins/*.css'
//         ])
//             .pipe(concat("assets.css"))
//             .pipe(autoprefixer())
//             .pipe(csscomb())
//             .pipe(csso())
//             .pipe(gulp.dest('app/css/'))
//     });
// });

// gulp.task('concat-js-libs', function () {
//     return watch('src/js/plugins/*.js', function () {
//         gulp.src('src/js/plugins/*.js')
//             .pipe(concat('assets.js'))
//             .pipe(uglify())
//             .pipe(gulp.dest('app/js/'))
//     });
// });

//====================================
//            img TinyPng           //
//====================================

// gulp.task('img-tin', function () {
//     return watch('src/img/**/**/*.*', function () {
//         gulp.src('src/img/**/**/*.*')
//             .pipe(plumber())
//             .pipe(newer('app/img'))
//             .pipe(tinpng('1n9UL-m3FoRoJ-nq24hbAJmuR1pl_wls'))
//             .pipe(gulp.dest('app/img'));
//     });
// });


//====================================
//              scsscomb            //
//====================================

// gulp.task('scsscomb-task', function () {
//     gulp.src(['src/scss/**/*.scss'])
//         .pipe(plumber())
//         .pipe(csscomb())
//         .pipe(gulp.dest('src/scss/'));
// });

//====================================
//             tailwind             //
//====================================
// gulp.task('tailwind', function () {
//     return gulp.src('node_modules/tailwindcss/tailwind.css')
//         .pipe(postcss([
//             require('tailwindcss'),
//             require('autoprefixer'),
//         ]))
//         .pipe(gulp.dest('app/css/'))
// });

//====================================
//            End Gulpfile          //
//====================================

// gulp.src('path/to/assets/*.svg')
//     .pipe(svgSprite(/* ... Insert your configuration here ... */))
//     .pipe(gulp.dest('out'));
// define complex tasks
// const js = gulp.series(scriptsLint, scripts);
// const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
// const watch = gulp.parallel(watchFiles, browserSync);




const build = gulp.series (gulp.parallel(doScss, doTwig));
const watch = gulp.parallel (doWatch, doBrowserSync);

exports.watch = watch;


exports.default = build;
