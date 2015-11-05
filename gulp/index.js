var gulp = require('gulp');

var rootDir = './';

var meta = {
  assetsDir: rootDir + 'build/',
  jsDir: "./src/js/"
};

meta.js = {
  main: {
    input: meta.jsDir + "comments.js",
    destination: meta.assetsDir + 'js/'
  }
};

module.exports = function(tasks) {
  tasks.forEach(function(name) {
    require('./tasks/' + name)(meta);
  });

  return gulp;
};
