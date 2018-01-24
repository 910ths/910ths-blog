/* ---

  Available modes:
    • gulp (minify CSS & JS)
    • gulp watch (watching files changes, expanded CSS & JS, disabled notifications)
    • gulp dev --sync (BrowserSync active)

--- */

  var

  /* --- ▼ Begin of config ▼ --- */

    path = {
      js  : '_dev/js/',
      css : '_dev/scss/'
    },

    files = {
      css : [
        {
          label  : 'SCSS',
          import : [
            path.css + '**/*.scss'
          ],
          output : [
            {
              path        : path.css + '../../build/css/',
              file        : 'styles.css',
              browserSync : true
            }
          ]
        }
      ],
      js : [
        {
          label  : 'JS scripts',
          import : [
            path.js + 'utils/**.js',
            path.js + 'classes/**.js'
          ],
          output : [
            {
              path : path.js,
              file : 'scripts.js'
            }
          ],
          babel    : true,
          compress : false
        },
        {
          label  : 'JS library',
          import : [
            path.js + 'libs/*.js'
          ],
          output : [
            {
              path : path.js,
              file : 'library.js'
            }
          ],
          babel    : false,
          compress : false
        },
        {
          label  : 'JS',
          import : [
            path.js + 'library.js',
            path.js + 'scripts.js'
          ],
          output : [
            {
              path : path.js + '../../build/js/',
              file : 'scripts.js'
            }
          ],
          babel    : false,
          compress : true
        }
      ]
    },

    autoprefixerOptions = {
      browsers : ['> 1%', 'safari 6'],
      cascade  : false
    },

    browserSyncOptions = {
      port  : 3000,
      proxy : '127.0.0.1/blog'
    },

  /* --- ▲ End of config (DO NOT EDIT CODE BELOW!) ▲ --- */

  gulp           = require('gulp'),
  sassGlob       = require('gulp-sass-glob'),
  plumber        = require('gulp-plumber'),
  sass           = require('gulp-sass'),
  autoprefixer   = require('gulp-autoprefixer'),
  mergeQueries   = require('gulp-group-css-media-queries'),
  minify         = require('gulp-minifier'),
  jsValidate     = require('gulp-jsvalidate'),
  babel          = require('gulp-babel'),
  gutil          = require('gulp-util'),
  gulpif         = require('gulp-if'),
  concat         = require('gulp-concat'),
  browserSync    = require('browser-sync'),

  onErrorStyles  = function(error) {

    gutil.beep();

    if (!error.messageOriginal) {

      gutil.log(gutil.colors.red('Error  : ') + error.message);
      gutil.log(gutil.colors.red('Plugin : ') + error.plugin);

    } else {

      gutil.log(gutil.colors.red('Error : ') + error.messageOriginal);
      gutil.log(gutil.colors.red('File  : ') + error.file);
      gutil.log(gutil.colors.red('Line  : ') + error.line);

    } 

  },
  onErrorScripts = function(error) {

    gutil.beep();

    gutil.log(gutil.colors.red('Error : ') + error.description);
    gutil.log(gutil.colors.red('File  : ') + error.fileName);
    gutil.log(gutil.colors.red('Line  : ') + error.lineNumber);

  }
;

  /* ---
    Build styles
  --- */

    function stylesBuild($index) {

      /* ---
        Task list:
          • load source files
          • import all files from directories declared in main sass file
          • error handling
          • sass
          • autoprefixer
          • merge media queries
          • minify css file (only in gulp task)
          • notifications
      --- */

        return new Promise(finish => {

          var task = gulp
            .src(
              files.css[$index].import
            )
            .pipe(sassGlob())
            .pipe(plumber({
              errorHandler : onErrorStyles
            }))
            .pipe(
              sass({
                outputStyle : 'expanded'
              })
            )
            .pipe(autoprefixer( autoprefixerOptions ))
            .pipe(mergeQueries())
            .pipe(gulpif(!devMode,
              minify({
                minify    : true,
                minifyCSS : true
              })
            ))
            .on('finish', function() {
              gutil.log(gutil.colors.green(files.css[$index].label + ' done!'));
              setTimeout(finish, 10);
            })
          ;

        /* ---
          Saving files & browserSync (only in dev mode)
        --- */

          var length = files.css[$index].output.length;
          for (var i = 0; i < length; i++) {

            task
              .pipe(concat( files.css[$index].output[i].file ))
              .pipe(gulp.dest( files.css[$index].output[i].path ))
              .pipe(gulpif(
                (files.css[$index].output[i].browserSync && browserSyncOptions.active && devMode),
                browserSync.stream()
              ))
            ;

          }

        });

    };

  /* ---
    Build scripts
  --- */

    function scriptsBuild($index) {

      /* ---
        Task list:
          • load source files
          • error handling
          • compilation to ES5 (only in gulp task)
          • minify js file (only in gulp task)
          • notifications
      --- */

        return new Promise(finish => {

          var task = gulp
            .src(
              files.js[$index].import
            )
            .pipe(jsValidate()).on('error', onErrorScripts)
            .pipe(gulpif(!devMode && files.js[$index].babel,
              babel({
                presets: ['es2015']
              })
            ))
            .pipe(gulpif(!devMode && files.js[$index].compress,
              minify({
                minify   : true,
                minifyJS : true
              })
            ))
            .on('finish', function() {
              gutil.log(gutil.colors.green(files.js[$index].label + ' done!'));
              setTimeout(finish, 10);
            })
          ;

        /* ---
          Saving files
        --- */

          var length = files.js[$index].output.length;
          for (var i = 0; i < length; i++) {

            task
              .pipe(concat( files.js[$index].output[i].file ))
              .pipe(gulp.dest( files.js[$index].output[i].path ))
            ;

          }

        });

    };

  /* ---
    Watcher
  --- */

    function getTaskIndex(task) {

      var index = task.seq.slice(-1)[0];
      index = index.replace(/[^0-9]/g, '');

      return index;

    }

    /* ---
      Build action for every CSS file watcher
    --- */

      for (var i = 0; i < files.css.length; i++) {

        gulp.task('styles-[' + i + ']', function() {

          var index = getTaskIndex(this);
          stylesBuild(index);

        });

      }

    /* ---
      Build action for every JS file watcher
    --- */

      for (var i = 0; i < files.js.length; i++) {

        gulp.task('scripts-[' + i + ']', function() {

          var index = getTaskIndex(this);
          scriptsBuild(index);

        });

      }

  /* ---
    Tasks
  --- */

    function stylesBuilder(i) {

      if (i >= files.css.length)
        return;
      else
        stylesBuild(i).then(() => stylesBuilder(i + 1));

    }

    function scriptsBuilder(i) {

      if (i >= files.js.length)
        return;
      else
        scriptsBuild(i).then(() => scriptsBuilder(i + 1));

    }

    gulp.task('gulp', function() {

        stylesBuilder(0);
        scriptsBuilder(0);

    });

    gulp.task('watcher', function() {

      /* ---
        File watcher for every group from files.css array
      --- */

        for (var i = 0; i < files.css.length; i++) {

          gulp.watch(
            files.css[i].import,
            ['styles-[' + i + ']']
          );

        }

      /* ---
        File watcher for every group from files.js array
      --- */

        for (var i = 0; i < files.js.length; i++) {

          gulp.watch(
            files.js[i].import,
            ['scripts-[' + i + ']']
          );

        }

    });

  /* ---
    Run gulp
  --- */

    var devMode = false;

    gulp.task('default', ['gulp']);

    gulp.task('watch', ['watcher'], function() {

      devMode = true;

      if (process.argv.indexOf('--sync') > -1) {

        browserSyncOptions.active = true;

        browserSync.init({
          proxy : browserSyncOptions.proxy,
          port  : browserSyncOptions.port,
          open  : false
        });

      } else {

        browserSyncOptions.active = false;

      }

    });