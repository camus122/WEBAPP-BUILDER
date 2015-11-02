///**
//* Created by Crystian on 15/02/02.
//*/
//
//var gulp = require('gulp'),
//	fs = require('fs-extra'),
//	_ = require('lodash'),
//	commons = require('./commons'),
//	rename = require('gulp-rename'),
//	cheerio = require('gulp-cheerio'),
//	replace = require('gulp-replace'),
//	inject = require('gulp-inject'),
//	gutil = require('gulp-util');
//
////replace references on index.html
//gulp.task('make:base:index', ['make:bower', 'make:index', 'make:config'], function() {
//	return gulp.src(global.cfg.loader.folders.www +'/'+ global.cfg.loader.filesDest.index)
//		.pipe(commons.debugeame())
//		.pipe(commons.injectContent(global.cfg.loader.folders.loadings+'/'+ global.cfg.loader.loading +'/loading.html','loadingHtml'))
//		.pipe(inject(gulp.src(global.cfg.loader.folders.loadings+'/'+ global.cfg.loader.loading +'/loading.css', {read: false}), {name: 'loadingCss', relative:'true'}))
//		.pipe(inject(gulp.src(global.cfg.varJs, {read: false}), {name: 'bower', relative:'true'}))
//		.pipe(inject(gulp.src(global.cfg.varCss, {read: false}), {name: 'bower', relative:'true'}))
//		.pipe(gulp.dest(global.cfg.loader.folders.www));
//});
//
//// make a new index on loader folder
//gulp.task('make:index', function () {
//	return gulp.src(global.cfg.loader.folders.www + '/index.tpl.html')
//		.pipe(commons.debugeame())
//		.pipe(rename(global.cfg.loader.filesDest.index))
//		.pipe(cheerio({
//			run: function ($) {
//				var cfg = global.cfg;
//
//				function attr_unescape( x ){
//					return $('<div />').html( x ).text();
//				}
//				$('#pageTitle').text(cfg.loader.text.title);
//				$('#pageDescription').attr('content',cfg.loader.text.description);
//				$('#pageKeyword').attr('content',cfg.loader.text.keyword);
//				$('#pageAuthor').attr('content',cfg.loader.text.author);
//				$('#noscript').html(cfg.loader.text.noscript);
//				$('#viewport').attr('content',cfg.loader.viewport);
//				$('#contentSecurity').attr('content',cfg.loader.contentSecurity);
//			}
//		}))
//		.pipe(replace('<!--msgTpl-->','<!-- REMEMBER, this file is generated, don\'t change it, because you can lost it -->'))
//		.pipe(replace('&apos;','\''))//it's for contentSecurity apost, we cannot inject that one
//		.pipe(gulp.dest(global.cfg.loader.folders.www));
//});
//
//gulp.task('make:config', function (cb) {
//	//variables shared between loader build and loader app
//	var json = {};
//	json.release = global.cfg.release;
//	json.version = global.cfg.version;
//
//	json.compress = global.cfg.compress;
//	json.isCordovaDevice = global.cfg.isCordovaDevice;
//	json.compatibilityMatrix = global.cfg.compatibilityMatrix;
//	json.debugZoneActive = global.cfg.debugZoneActive;
//	json.mixpanel = global.cfg.mixpanel;
//	json.analytics = global.cfg.analytics;
//	json.consoleError = global.cfg.consoleError;
//	json.firstApp = global.cfg.firstApp;
//	json.fastclick = !!(global.cfg.loader.bower.fastclick);
//	json.appRoot = '../../templates/'+ global.cfg.projectCode;
//	json.projectCode = global.cfg.projectCode;
//	json.www = global.cfg.folders.www;
//	json.showDeviceInfo = global.cfg.showDeviceInfo;
//	json.showSkeletor = global.cfg.showSkeletor;
//	json.contentEditable = global.cfg.contentEditable;
//
//	json.oneRequest = false;//flagOneRequest
//	json.phantom = false;//flagPhantom
//
//	json.loader = {
//		version: global.cfg.loader.version,
//		release: global.cfg.loader.release,
//		//build: false, ??
//		text: {
//			incompatibleByFeatures: global.cfg.loader.text.incompatibleByFeatures,
//			incompatibleByDiag: global.cfg.loader.text.incompatibleByDiag,
//			semiIncompatible: global.cfg.loader.text.semiIncompatible,
//			faqLink: global.cfg.loader.text.faqLink,
//			errorRequestFile: global.cfg.loader.text.errorRequestFile,
//			errorTimeoutServer: global.cfg.loader.text.errorTimeoutServer
//		}
//	};
//
//	var compatibilityTpl =
//		'\n\n//primer chequeo, si no es compatible con esto, se cancela el loader!\n'+
//		'_loaderCfg.compatibilityFirst = function () {\n'+
//		'	//jshint maxcomplexity:false, quotmark:false\n'+
//		'	\'use strict\';\n'+
//		'	var arr = [];\n'+
//		global.cfg.compatibilityFirst+
//		'};\n';
//
//	var text = '/* Remember, this file is autogenerate, don\'t change it */\n\n' +
//		'//jshint maxlen:false\n'+
//		'var _loaderCfg = '+ JSON.stringify(json, null, '\t') +';'+
//		compatibilityTpl;
//
//	fs.writeFile(global.cfg.loader.folders.www +'/config.js',
//		text,
//		function(err){
//			if(err) {
//				console.logRed(err);
//			} else {
//				console.logGreen('Config.js generated');
//			}
//			cb();
//		});
//});
