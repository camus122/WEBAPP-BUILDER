/**
* Created by Crystian on 10/16/2014.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	//gutil = require('gulp-util'),
	utils = require('./project/utils.js'),
	runSequence = require('run-sequence');

gulp.task('default', ['build:fast']);
gulp.task('css', ['css:loader']); //just an alias
gulp.task('full',['build:full']);

gulp.task('build:full', function (cb) {
	runSequence(
		'make:base',
		'build:fast',
	cb);
});

gulp.task('build:fast',function (cb) {
	runSequence(
		'remove:build',
		'make:loader',
		'remove:temp',
	cb);
});


gulp.task('release', function (cb) {
	if (!global.cfg.loader.release) {
		console.logRed('Variable "release" in project-config on "false", you will change it if you want a release');
		cb();
		utils.exit(1);
	}

	runSequence(
		'build:full',
		'test:loader',
	cb);
});
