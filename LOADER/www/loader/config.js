/**
* Created by Crystian on 10/18/2014.
*/
var _loaderCfg = {};

//Gulp: Automatic by gulp, don't CHANGE it manually or I'LL CUT YOUR HANDS!!!
_loaderCfg.isCordovaDevice = false;
_loaderCfg.version		= '0.0.0';
//END by gulp

//injected automatically:
_loaderCfg.compatibility= 0; // 0 = no compatible, 1 = con problemas, 2 = compatible
_loaderCfg.isDevice		= 0; // setter by loader
_loaderCfg.isDesktop	= 0; // setter by loader
_loaderCfg.isMobile		= 0; // setter by loader
_loaderCfg.isTablet		= 0; // setter by loader
_loaderCfg.orientation	= 0; // 0=portrait, 1=landscape
_loaderCfg.lang			= ''; //by diag and settings
_loaderCfg.isTouchDevice= false; //detected by diag

//default values for test:
_loaderCfg.debugMode		= 1; //can be different that build, this show debugZone with info (debugAdd)
_loaderCfg.showDeviceInfo	= 1;
_loaderCfg.showSkeletor		= 0;
_loaderCfg.contentEditable	= 0;

//others=
_loaderCfg.debugZone	= document.getElementById('debugZone');


//primer chequeo, si no es compatible con esto, se cancela el loader!
_loaderCfg.compatibilityFirst = function(){
	'use strict';

	//jshint maxcomplexity:false
	var arr = [];

	return !!(window.document.querySelector &&
	window.console &&
	window.document.addEventListener &&
	(window.document.getElementsByTagName('body')[0]).classList &&
	window.localStorage &&
	window.navigator &&
	window.XMLHttpRequest &&
	window.applicationCache &&
	window.document.createEvent &&
	arr.map &&
	arr.every);
};


/*
 el primer elemento es incompatible 100%, menores e igual de
 el segundo es browser viejo, compatible, menores e igual de
 el tercero es compatible con ese y superiores, mayores e igual de
 */
_loaderCfg.matrix = {//nombre raro intencional es sobre compatibilidad
	'ie': [9.9, 10.9, 11.0],
	'firefox': [23.9, 25.9, 26.0],
	'android': [3.9, 3.9, 4.0],
	'chrome': [17.9, 28.9, 29.0],
	'safari': [6.0, 6.0, 7.0],
	'ios':	[6	,6	,7]
	// 'operamini':[7	,7	,7],
	// 'bb':		[6	,7	,10],
	// 'ieMobile': [9	,9	,10]

	// TODO revisar opera, anda raro en la virtual con xp,
	// por otro lado los parametros que toma son de compatibles,
	// y por ende usa a chrome :S
	// 'opera':	[16	,17	,18]
};

//jshint maxlen:false
_loaderCfg.i18n = {
	loader : {//loader
		incompatibleByFeatures : 'Navegador incompatible (no se encontraron features), por tu seguridad actualizalo o usa otro, ver en F.A.Q.',
		incompatibleByDiag : 'Navegador incompatible, por tu seguridad actualizalo o usa otro, ver en F.A.Q.',
		semiIncompatible : 'Navegador no reconocido o con problemas de compatibilidad, la aplicacion funcionara pero es recomendable actualizarlo o usar otro, ver en el F.A.Q. \nhttp://languagesgym.com/faq',
		faqLink : '<a href="http://languagesgym.com/faq">http://languagesgym.com/faq</a>',
		errorRequestFile: 'Error leyendo el archivo del servidor, por favor vuelva a intentar mas tarde',
		errorTimeoutServer: 'Se agoto el tiempo de espera, verifica que tengas internet y este andando bien'
	},

	//this errors are lies, solo para enganiar al malisioso
	consoleError: [
		'Error unknown',
		'Error about connection stablished',
		'Error 404',
		'Error connection lost, try again',
		'Command unknown',
		undefined,
		'Null pointer exception',
		'Error jquery plugin',
		'Error ferrasca the boilerplate',
		'Error map not found',
		'Error in obliteration rast'
	],

	langsFrom : {
		'es': {
			name: 'ESPAÑA',
			country: 'es'
		},
		'es-ar': {
			name: 'ARGENTINA',
			country: 'ar'
		},
		'en': {
			name: 'UNITED KINGDOM',
			country: 'gb'
		},
		'en-us': {
			name: 'UNITED KINGDOM',
			country: 'us'
		}/*,
		 'en-us': {
		 name: 'UNITED STATES',
		 country: 'us'
		 }*/
	}
};