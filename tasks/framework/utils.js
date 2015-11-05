/**
 * Created by Crystian on 2/21/2015.
 */

// share with app

var chalk = require('chalk'),
	path = require('path'),
	fs = require('fs'),
	debug = require('gulp-debug'),
	gif = require('gulp-if'),
	through = require('through2'),
	gutil = require('gulp-util');

//COMMONS between project and loader:
console.logWarn = function (m) {
	console.log(chalk.black.bgYellow(m));
};

console.logGreen = function (m) {
	console.log(chalk.black.bgGreen(m));
};

console.logRed = function (m) {
	console.log(chalk.red.bold(m));
};

exports.fileExist = function(fileName){
	// I tried using accessSync but doesn't work properly on node 4.2.1
	return fs.existsSync(fileName);
};

//exports.getExtensionFile = function(s) {
//	return path.extname(s).replace('.','');
//};
//
//exports.getFileName = function(s) {
//	return path.basename(s, path.extname(s));
//};
//
//exports.setExtensionFilename = function(s, extension) {
//	var arr = s.split('.');
//	if (arr.length <= 1) {
//		console.logRed('Extension not found!');
//		return s;
//	}
//
//	arr.pop();
//	arr.push(extension);
//
//	return arr.join('.');
//};
//
//exports.setPreExtensionFilename = function(s, preExtension) {
//	var arr = s.split('.');
//	if (arr.length <= 1) {
//		console.logRed('Extension not found!');
//		return s;
//	}
//
//	arr.splice(arr.length-1, 0, preExtension);
//
//	return arr.join('.');
//};

exports.debugeame = function(){
	return through.obj()
			.pipe(gif(!!(gutil.env.debug), debug({verbose: true})))
			.on('error', gutil.log);
};

process.on('uncaughtException', function(err){
	if(typeof err === 'string') err = {message:err};
	console.logRed('uncaughtException: ' + err.message);
	if (gutil.env.debug) {
		console.logRed(err.stack);
	}
	this.exit(1); // exit with error
});

exports.exit = function (n){
	process.exit(n);
};

