/**
* Created by Crystian on 10/19/2014.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	gif = require('gulp-if'),
	htmlreplace = require('gulp-html-replace'),
	htmlmin = require('gulp-htmlmin'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	streamqueue =require('streamqueue'),
	merge =require('merge-stream'),
	jshint = require('gulp-jshint'),
	replace = require('gulp-replace'),
	header = require('gulp-header'),
	footer = require('gulp-footer'),
	strip = require('gulp-strip-comments'),
	fs = require('fs-extra'),
	clean = require('gulp-clean'),
	commons = require('./commons'),
	gutil = require('gulp-util');

gulp.task('make:loader', ['make:loader:files'],  function () {

	var htmlminOptions = {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		collapseBooleanAttributes: true,
		removeOptionalTags: false
	};

	var stream = gulp.src(global.cfg.folders.www + '/'+global.cfg.files.index)
		//.pipe(debug({verbose: true}))
		//.on('error', gutil.log)
		.pipe(htmlreplace())
		.pipe(commons.injectContent(global.cfg.folders.temp +'/-compiledLoader.css','loaderCss','style'))
		.pipe(commons.injectContent(global.cfg.folders.temp +'/-compiledLoader.js','loaderJs','script'))
		.pipe(gif(global.cfg.loader.release, htmlmin(htmlminOptions)))

		//header and footers:
		.pipe(gif(global.cfg.loader.release, header(global.cfg.loader.text.header.join('\n'),{
			date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
			name: global.cfg.name,
			version: global.cfg.version,
			site: global.cfg.site})))
		.pipe(gif(global.cfg.loader.release, footer(global.cfg.loader.text.footer.join('\n'))))
		.pipe(gulp.dest(global.cfg.folders.build));

	if(global.cfg.cordova){
		/*
		This is ok, because it make another file equals to index but one change,
		I prefer it than run again all process to make other file
		*/
		stream.pipe(rename(global.cfg.files.indexCordova))
		.pipe(gif(global.cfg.loader.release,
			replace(',isCordovaDevice:!1,', ',isCordovaDevice:1,'),
			replace('"isCordovaDevice": false,', '"isCordovaDevice": true,')
		))
		.pipe(gulp.dest(global.cfg.folders.build));
	}

	return stream;
});

gulp.task('make:loader:files', ['make:loader:js', 'make:loader:css', 'copy:bootstrap:fonts'], function (cb) {
	fs.copySync(global.cfg.folders.template, global.cfg.folders.build);
	cb();
});

gulp.task('make:loader:js',  function () {
	var releasePostName = (global.cfg.loader.release) ? 'min.' : '';
	//libs
	var libs = [
		global.cfg.folders.bower + '/platform/platform.' + releasePostName + 'js',
		global.cfg.folders.bower + '/es6-promise/promise.' + releasePostName + 'js',
		global.cfg.loader.bower.fastclick ? global.cfg.folders.bower + '/fastclick/lib/fastclick.' + releasePostName + 'js' : '',
		global.cfg.loader.bower.jquery ? global.cfg.folders.bower + '/jquery/dist/jquery.' + releasePostName + 'js' : '',
		global.cfg.loader.bower.bootstrap ? global.cfg.folders.bower + '/bootstrap/dist/js/bootstrap.' + releasePostName + 'js' : '',
		global.cfg.compress ? global.cfg.folders.bower + '/lz-string/libs/lz-string.' + releasePostName + 'js' : '',
		global.cfg.loader.bower.swiper ? global.cfg.folders.bower + '/swiper/dist/js/swiper.' + releasePostName + 'js' : ''
	];
	var libsMin = gulp.src(libs)
			.pipe(gif(cfg.loader.release, strip({safe:false, block:false})));
	//endLibs

	//header script
	var loaderScripts1 = [
		global.cfg.folders.www + '/config.js',
		global.cfg.folders.www + '/modules/compatibility.js'
	];
	var loaderScripts1Stream = gulp.src(loaderScripts1)
		.pipe(replace(/(\"build\".*\:[ ]?)(\w*)/,'$1true'))//just for index built
		;

	loaderScripts1Stream = commons.jsMaker(loaderScripts1Stream);
	//endheader script

	//body script
	var loaderScripts2 = [
		global.cfg.folders.www + '/modules/shortcuts.js',
		global.cfg.folders.www + '/loader.js',
		global.cfg.folders.www + '/variables.js',
		global.cfg.folders.www + '/modules/utils.js',
		global.cfg.folders.www + '/modules/diag.js',
		global.cfg.folders.www + '/modules/polyfill-ie.js',
		global.cfg.folders.www + '/modules/settings.js',
		global.cfg.folders.www + '/modules/lang.js',
		global.cfg.folders.www + '/modules/events.js',
		global.cfg.folders.www + '/modules/redefine.js',
		global.cfg.folders.www + '/modules/screen.js',
		global.cfg.folders.www + '/modules/cordovaConnection.js',
		global.cfg.folders.www + '/modules/analytics.js',
		global.cfg.folders.www + '/modules/mixpanel.js',
		global.cfg.folders.www + '/modules/boot.js'
	];
	var loaderScripts2Stream = gulp.src(loaderScripts2)
		.pipe(gif(global.cfg.compress, replace('if(!loader.cfg.compress){return data;}//flagCompress','')));

	loaderScripts2Stream = commons.jsMaker(loaderScripts2Stream);
	//endbody script

	return streamqueue({ objectMode: true }, loaderScripts1Stream, libsMin, loaderScripts2Stream)
		.on('error', gutil.log)
		.pipe(concat('/-compiledLoader.js',{newLine: ';'}))
		.pipe(gulp.dest(global.cfg.folders.temp));
});

gulp.task('make:loader:css', ['css:loader'],  function () {
	var releasePostName = (global.cfg.loader.release) ? 'min.' : '';

	var cssLib = [
		global.cfg.loader.bower.swiper ? global.cfg.folders.bower + '/swiper/dist/css/swiper.'+releasePostName+'css' : '',
		global.cfg.loader.bower.bootstrap ? global.cfg.folders.bower + '/' + global.cfg.folders.bootstrapDist + '/css/bootstrap.'+releasePostName+'css' : ''
		//global.cfg.loader.bootstrap ? global.cfg.folders.bower + '/bootstrap/dist/css/bootstrap-theme.'+releasePostName+'css ': ''
	];

	var cssLibToMin = [
		//global.cfg.folders.bower + '/dist/css/css.css'
	];

	var cssLoader = [
		global.cfg.folders.www + '/css/loader.css',
		global.cfg.folders.loadings+'/'+ global.cfg.loader.loading +'/loading.css'];


	return streamqueue({ objectMode: true },
			gulp.src(cssLib)
				.pipe(gif(global.cfg.loader.bower.bootstrap, replace('../fonts/glyphicons','assets/fonts/glyphicons')))
				.pipe(strip({safe:false, block:false})),
			merge(
				gulp.src(cssLoader),
				gulp.src(cssLibToMin)
			)
			.pipe(strip({safe:false, block:false}))
			.pipe(gif(global.cfg.loader.release, minifycss()))
		)
		.on('error', gutil.log)
		.pipe(concat('/-compiledLoader.css'))
		.pipe(gulp.dest(global.cfg.folders.temp));
});

gulp.task('copy:bootstrap:fonts', function (cb) {
	if(global.cfg.loader.bower.bootstrap){
		fs.copySync(
			global.cfg.folders.bower + '/' + global.cfg.folders.bootstrapDist +'/fonts',
			global.cfg.folders.build + '/assets/fonts'
		);
		console.logGreen('Bootstrap fonts copied');
	}
	cb();
});

gulp.task('css:loader', ['css:template'], function () {
	return commons.sassfixer(global.cfg.folders.www + '/**/*.scss',global.cfg.folders.www);
});

gulp.task('css:template', function () {
	var path = global.cfg.folders.template;
	return commons.sassfixer(path +'/**/*.scss',path)
});

