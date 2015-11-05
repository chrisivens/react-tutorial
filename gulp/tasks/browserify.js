var browserify = require('browserify');
var watchify = require('watchify');
var livereload = require('gulp-livereload');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var _ = require('lodash');


module.exports = function(meta) {

  var bundle = function(b, module, key) {
    var method = module.watch ? "WATCHIFY" : "BROWSERIFY",
      output = key + ".js";

    return b.bundle()
      .pipe(source(output))
      .pipe(gulp.dest(module.destination))
      .pipe(livereload())
      .on('end', function() {
        if(module.watch) {
          console.log('BUILT - Still Watching ' + output);
        }
      });
  };

  var createBundle = function(module, key, watch) {
    var b = browserify({
      cache: {},
      packageCache: {},
      fullPaths: false,
      paths: ['./node_modules', './src']
    });

    b.add(module.input);

    if(watch) {
      module.watch = true;
      b = watchify(b);
      b.on('update', function() {
        bundle(b, module, key);
      });
    }

    return bundle(b, module, key);
  };

  var createBundles = function(bundles, watch) {
    watch = typeof(watch) === 'undefined' ? false : true;

    _.each(bundles, function(module, key) {
      createBundle(module, key, watch);
    });
  };

  gulp.task('browserify', function() {
    createBundles(meta.js);
  });

  gulp.task('watchify', function() {
    createBundles(meta.js, "watch");
  });

};
