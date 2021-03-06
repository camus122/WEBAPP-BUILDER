/**
 * Created by Crystian on 10/16/2014.
 *
 * The main propose for this file is test the loader
 */

//var gutil = require('gulp-util'),
//	Nightmare = require('nightmare'),
//	replace = require('replace'),
//	async = require('async'),
//	fs = require('fs-extra'),
//	utils = require('./project/utils'),
//	path = require('path'),
//	Promise = require('q').Promise,
//	gulp = require('gulp');
//
//debug mode: on console: set DEBUG=nightmare
gulp.task('_test',['_serveNightmare'], function(cb) {
//	'use strict';
//	var index = (global.cfg.folders.template +'/' + global.cfg.folders.build + '/' + global.cfg.loader.filesDest.index),
//		page = 'http://' + global.cfg.ip + ':' + global.cfg.ports.nightmare + '/' + global.cfg.loader.filesDest.index;
//
//	if(!utils.fileExist(index)){
//		console.logRed('Index not found, can you made one?, rememeber you need to create it with \'gulp full\' on \'template\' folder, this is a real test');
//		utils.exit(1);
//	}
//
//	console.logWarn('REMEMBER, this change index.html! and it will be without css by issue when you load the css via ajax');
//
//	var r =	['\"phantom\": false,', '\"phantom\": true,'];
//
//	if(global.cfg.loader.release){
//		r =	['phantom:!1,', 'phantom:1,'];
//	}
//
//	replace({
//		regex: r[0],
//		replacement: r[1],
//		paths: [index],
//		recursive: false,
//		silent: false
//	});
//
//	fs.mkdirsSync(global.cfg.loader.folders.screens);
//
//	//EXPECT
//	var browsers =[
//
//		//CHROME
//		{
//			name: 'chrome40',
//			ua: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.91 Safari/537.36',
//			compatibility: 2,
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			orientation: 1,	lang: 'en-US'
//		},
//		{
//			name: 'chrome37',
//			ua: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36)',
//			compatibility: 2,
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			orientation: 1,	lang: 'en-US'
//		},
//
//		//FIREFOX
//		{
//			name: 'ff32',
//			ua: 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0',
//			compatibility: 2,
//			isDevice: 0,	isDesktop: 1,	isTablet: 1,	isMobile: 0,
//			orientation: 1,	lang: 'en-US'
//		},
//
//		//IE
//		{
//			name: 'ie5',
//			ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie7',
//			ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie8',
//			ua: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie9',
//			ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 0
//		},{
//			name: 'ie10',
//			ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729)',
//			compatibility: 1,
//			//isTablet = 0, it's ok, because compatibility is 1
//			isDevice: 0,	isDesktop: 1,	isTablet: 0,	isMobile: 0,
//			orientation: 0,	lang: 'en-US'
//		},
//
//		//IPHONE
//		{
//			name: 'iphone3gs',
//			ua: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-US) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
//			compatibility: 0
//		},{
//			name: 'iphone4',
//			ua: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-US) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
//			compatibility: 0
//		},{
//			name: 'iphone5',
//			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-US) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 320,	height: 568,	orientation: 0,	lang: 'en-US'
//		},{
//			name: 'iphone6',
//			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 375,	height: 667,	orientation: 0,	lang: 'en-US'
//		},{
//			name: 'iphone6plus',
//			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 375,	height: 667,	orientation: 0,	lang: 'en-US'
//		},{
//			name: 'ipad1-2',
//			ua: 'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-US) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5',
//			compatibility: 0
//		},{
//			name: 'ipad3-4',
//			ua: 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 1,	isMobile: 0,
//			orientation: 1,	lang: 'en-US'
//		},
//
//		//ANDROID
//		{
//			name: 'androidS2',
//			ua: 'Mozilla/5.0 (Linux; U; Android 2.1; en-US; GT-I9000 Build/ECLAIR) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2',
//			compatibility: 0
//		},{
//			name: 'androidS3',
//			ua: 'Mozilla/5.0 (Linux; U; Android 4.0; en-US; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 360,	height: 640,	orientation: 0,	lang: 'en'
//		},{
//			name: 'androidS4',
//			ua: 'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 360,	height: 640,	orientation: 0,	lang: 'en-US'
//		},{
//			name: 'androidLG-G',
//			ua: 'Mozilla/5.0 (Linux; Android 4.0; LG-E975 Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 384,	height: 640,	orientation: 0,	lang: 'en-US'
//		},{
//			name: 'androidHTC-ONE',
//			ua: 'Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			orientation: 1,	lang: 'en-US'
//		},{
//			name: 'androidNexus4',
//			ua: 'Mozilla/5.0 (Linux; Android 4.2.1; en-US; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			orientation: 1,	lang: 'en'
//		},{
//			name: 'androidNexus5',
//			ua: 'Mozilla/5.0 (Linux; Android 4.2.1; en-US; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			orientation: 1,	lang: 'en'
//		},{
//			name: 'androidSTab',
//			ua: 'Mozilla/5.0 (Linux; U; Android 2.2; en-US; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			width: 1024,	height: 600,	orientation: 1,	lang: 'en'
//		},{
//			name: 'androidSonyXperiaZ1',
//			ua: 'Mozilla/5.0 (Linux; U; Android 4.2; en-US; SonyC6903 Build/14.1.G.1.518) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			orientation: 1,	lang: 'en'
//		},{
//			name: 'androidMotorlaDroid',
//			ua: 'Mozilla/5.0 (Linux; U; Android 2.0; en-US; Milestone Build/ SHOLS_U2_01.03.1) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17',
//			compatibility: 2,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 1,
//			orientation: 1,	lang: 'en'
//		},
//
//		//OTHERS
//		{
//			name: 'nokiaN97',
//			ua: 'NokiaN97/21.1.107 (SymbianOS/9.4; Series60/5.0 Mozilla/5.0; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebkit/525 (KHTML, like Gecko) BrowserNG/7.1.4',
//			compatibility: 1,
//			//TODO: IMPROVE IT!
//			isDevice: 0,	isDesktop: 1,	isTablet: 0,	isMobile: 0,
//			orientation: 0,	lang: 'en-US'
//		},{
//			name: 'nokiaLumia820',
//			ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)',
//			compatibility: 1,
//			//TODO: IMPROVE IT!
//			isDevice: 0,	isDesktop: 1,	isTablet: 0,	isMobile: 0,
//			orientation: 0,	lang: 'en-US'
//		},{
//			name: 'blackberryZ10',
//			ua: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
//			compatibility: 1,
//			isDevice: 1,	isDesktop: 0,	isTablet: 0,	isMobile: 0,
//			orientation: 0,	lang: 'en-US'
//		}
//	];
//
//	async.mapSeries(browsers, function (b, cbMap) {
//		gutil.log('Browser to test: ' + b.name);
//
//		var nightmare = new Nightmare({
//			weak: false,
//			timeout: 1000,
//			show: !!gutil.env.debug,
//			width: b.width || 1024,
//			height: b.height || 768
//		});
//
//		var screenFile = global.cfg.loader.folders.screens + '/' + b.name + '.png';
//
//		Promise.resolve(nightmare
//				.useragent(b.ua)
//				.goto(page)
//				.wait(1000)
//				.screenshot(screenFile)
//				.evaluate(function () {
//					return window.loader
//				})
//				.end()
//		).then(function (loader) {
//
//				if (!loader) {
//					console.logRed('Problem detected, check if you publish on 0.0.0.0, you need to publish on real ip');
//					return cbMap();
//				}
//
//				var cfg = loader.cfg;
//
//				//just in case
//				if (global.cfg.loader.release &&
//					(
//						cfg.showDeviceInfo ||
//						cfg.showSkeletor ||
//						cfg.contentEditable
//					)
//				){
//					gutil.beep();
//					console.logRed('Mode release on false (and/or others) activate!');
//					return cbMap();
//				}
//
//				if (cfg.compatibility !== b.compatibility) {
//					gutil.beep();
//					console.logRed('Compatibility throuble: Esperado "' + b.compatibility + '" pero vino: "' + cfg.compatibility + '" Browser: ' + b.name);
//					return cbMap();
//				}
//
//				if (cfg.compatibility === 0){return cbMap();}
//
//				if (!loader.platform) {
//					gutil.beep();
//					console.logRed('WTF? there aren\'t platform! -  Browser: ' + b.name);
//					return cbMap();
//				}
//				if (cfg.isCordovaDevice) {
//					gutil.beep();
//					console.logRed('WTF?? cordova detected?! -  Browser: ' + b.name);
//					return cbMap();
//				}
//				if (cfg.isDevice != b.isDevice) {
//					gutil.beep();
//					console.logRed('Device not detected correctly! -  Browser: ' + b.name);
//					return cbMap();
//				}
//				if (cfg.isDesktop != b.isDesktop) {
//					gutil.beep();
//					console.logRed('Desktop not detected correctly! -  Browser: ' + b.name);
//					return cbMap();
//				}
//				if (cfg.isMobile != b.isMobile) {
//					gutil.beep();
//					console.logRed('Mobile not detected correctly! -  Browser: ' + b.name);
//					return cbMap();
//				}
//				if (cfg.isTablet != b.isTablet) {
//					gutil.beep();
//					console.logRed('Desktop/Tablet not detected correctly! -  Browser: ' + b.name);
//					return cbMap();
//				}
//				if (cfg.orientation != b.orientation) {
//					gutil.beep();
//					console.logRed('Orientation not detected correctly! -  Browser: ' + b.name);
//					return cbMap();
//				}
//				//TODO will fix it
//				if (cfg.lang != b.lang) {
//					//gutil.beep();
//					//console.log('cfg.lang',cfg.lang);
//					//console.log('b.lang',b.lang);
//					//	console.logRed('Language not detected correctly! -  Browser: ' + b.name);
//					//	return cbMap();
//				}
//
//				return cbMap();
//			});
//
//	}, function (){
//		setTimeout(function () {
//			//kill the server!
//			utils.exit(1);
//		}, 200);
//
		cb();
//	});
//
});

