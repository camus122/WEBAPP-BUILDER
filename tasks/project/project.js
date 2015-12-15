/**
 * Created by Crystian on 4/13/2015.
 */

(function(){
	'use strict';

	var runSequence = require('run-sequence'),
			serve       = require('../shared/server.js'),
			fs          = require('fs-extra'),
			utils       = require('../shared/utils.js'),
			engine      = require('./engine/engine.js');

	//Alias
	gulp.task('css', ['makeCss']);
	gulp.task('js', ['makeJs']);
	gulp.task('html', ['makeHtml']);
	gulp.task('on', ['watch']);
	gulp.task('removeBuild', ['_removeBuild']);
	gulp.task('removeTemp', ['_removeTemp']);

	function breakIfIsLoader(){
		if(global.cfg.fromFwk){
			console.logRed('APPFACTORY: it is loader, you need to run the command on project folder or template');
			utils.exit(1);
		}
	}

	function breakIfIsTemplate(){
		if(global.cfg.isTemplate){
			console.logRed('APPFACTORY: it is a template');
			utils.exit(1);
		}
	}

	gulp.task('buildFull', function(){
		breakIfIsLoader();

		return runSequence(
			'buildLoader',
			'buildProject'
		);
	});

	gulp.task('serveProject', function(){
		breakIfIsLoader();
		breakIfIsTemplate();

		return serve.makeServe(global.cfg.pathPrj + global.cfg.app.folders.www, '/', global.cfg.ip, global.cfg.ports.project);
	});

	gulp.task('buildProject', ['makeWwwJson'], function(cb){
		breakIfIsLoader();
		cb();
	});

	gulp.task('makeWwwJson', ['makeCss', 'makeJs', 'makeHtml'], function(){
		engine.makeWwwJson();
	});

	gulp.task('watch', function(){
		gulp.watch([global.cfg.pathPrj + '**/app?(s).json'], ['makeFiles']);
		gulp.watch([global.cfg.pathPrj + '**/?(*.scss|*.sass|*.less|*.styl)'], ['makeCss']);
		gulp.watch([global.cfg.pathPrj + '**/?(*.ts|*.coffee)'], ['makeJs']);
		gulp.watch([global.cfg.pathPrj + '**/?(*.html)'], ['makeHtml']);
	});

	gulp.task('makeCss', function(){
		return engine.css();
	});

	gulp.task('makeJs', function(){
		return engine.js();
	});

	gulp.task('makeHtml', function(){
		return engine.html();
	});

	gulp.task('release', function(cb){
		if(!global.cfg.loader.release || !global.cfg.app.release){
			console.logRed('Release mode fail. Set your app and loader on release: true');
			utils.exit(1);
		}

		//TODO continuar
		runSequence(
			'full:loader',
			'test:loader',
			cb);
	});


	//require('./cordova.js');

	////building
	//gulp.task('build:fast', ['runMagic'], function (){
	//	return magic.runJsonify(global.cfg.folders.www +'/apps.json');
	//});
	//
	//gulp.task('runMagic', function (){
	//	return magic.runMagic(global.cfg.folders.www +'/apps.json');
	//});
	//
	//gulp.task('optimizeImages', function (){
	//	return magic.optimizeImages();
	//});
	//
	//gulp.task('clearCache', function (done) {
	//	return magic.clearCache(done);
	//});
	//
	//gulp.task('genAppCache', function (){
	//	return magic.genAppCache();
	//});
}());