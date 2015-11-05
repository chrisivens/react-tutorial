var livereload = require('gulp-livereload');

var gulp = require('./gulp')([
  'browserify'
]);

gulp.task('default', ['browserify']);

gulp.task('watch', ['watchify'], function() {
  livereload.listen();
});
