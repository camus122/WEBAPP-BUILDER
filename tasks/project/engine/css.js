/**
 * Created by Crystian on 15/11/2015.
 */

(function(){
	'use strict';

	var utils        = require('../../shared/utils'),
			sass         = require('gulp-sass'),
			less         = require('gulp-less'),
			stylus       = require('gulp-stylus'),
			minifycss    = require('gulp-minify-css'),
			gif          = require('gulp-if'),
			csslint      = require('gulp-csslint'),
			replace      = require('gulp-replace'),
			autoprefixer = require('gulp-autoprefixer'),
			rename       = require('gulp-rename'),
			gutil        = require('gulp-util'),
			sprite       = require('gulp-sprite-generator'),
			core         = require('./core');

	var extensionFinal = 'css';

	function runPreprocessors(file, config, appName, pth){
		return core.doMagic(file, config, appName, pth, {
			extensionFinal: extensionFinal,
			validPreproExtension: core.defaults.validCssPreproExtensions,
			preprocessFile: preprocessFile,
			removeCode: function(stream){
				return stream;
			},
			linter: function(stream, config){
				stream = stream
					.pipe(replace(' 0px', ' 0'))
					.pipe(csslint('csslintrc.json'))
					.pipe(csslint.reporter(cssLintCustomReporter))
					.pipe(gif(config.linterForce, csslint.reporter('fail')));

				return stream;
			},
			minifyFile: function(stream){
				stream = stream
					.pipe(minifycss());
				return stream;
			},
			postLinter: postLinter
		});
	}

	function postLinter(stream, config, appName){
		if(config.genSprite){
			var imgFolder = 'img';
			var spriteOutput = stream
				.pipe(sprite({
					baseUrl: './',
					spriteSheetName: appName + '.png',
					spriteSheetPath: imgFolder,
					padding: 1,
					algorithm: 'binary-tree',
					//isRetina: false,
					//engine: 'gm',
					verbose: !!gutil.env.debug,
					groupBy: [
						function(image){
							//if (gutil.env.debug) {
							//	console.dir(image);
							//}

							//getting number of sprite folder
							var num   = /(sprite)(.)(\/)/.exec(image.url),
									group = 1;

							if(num !== null && num.length > 0){
								group = num[2];
							}

							return '' + group;
						}
					],
					engineOpts: {
						imagemagick: false
					}
				}));

			spriteOutput.img.pipe(gulp.dest(global.cfg.app.folders.dist + '/' + imgFolder));
			stream = spriteOutput.css;
		}
		return stream;
	}

	function preprocessFile(stream, config, fileName, type){
		//TODO add config option (from app.json) for each type
		switch (type){
			case 'scss':
			case 'sass':
				var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};

				stream = stream.pipe(sass(sassOptions));
				break;
			case 'styl':
				stream = stream.pipe(stylus());
				break;
			case 'less':
				stream = stream.pipe(less());
				break;
		}

		if(config.autoPrefixer){
			stream = stream.pipe(autoprefixer({browsers: global.cfg.autoprefixer}));
		}

		stream = stream.pipe(rename(fileName + '.' + extensionFinal));
		return stream;
	}

	function cssLintCustomReporter(file){
		gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

		file.csslint.results.forEach(function(result){
			gutil.log(result.error.message + ' on line ' + result.error.line);
		});
	}

	exports.runPreprocessors = runPreprocessors;
}());
