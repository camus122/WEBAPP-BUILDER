/**
* Created by Crystian on 2/11/2015.
*/

//default values for test:
//_loaderCfg.devLocal			= 1;//request by request, otherwise one json file
_loaderCfg.showDeviceInfo	= 0;
_loaderCfg.showSkeletor		= 0;
_loaderCfg.contentEditable	= 0;

//injected automatically on the app:
_loaderCfg.isDevice		= 0; // setter by loader
_loaderCfg.isDesktop	= 0; // setter by loader
_loaderCfg.compatibility= 0; // 0 = no compatible, 1 = con problemas, 2 = compatible
_loaderCfg.orientation	= 0; // 0=portrait, 1=landscape //detected by diag
_loaderCfg.isLandscape	= 0; //detected by diag
_loaderCfg.isPortraid	= 0; //detected by diag
_loaderCfg.isTouchDevice= 0; //detected by diag, be careful, can not be real
_loaderCfg.isMobile		= 0; // setter by diag, need it a review
_loaderCfg.isTablet		= 0; // setter by diag, need it a review
_loaderCfg.lang			= ''; //by lang and settings
_loaderCfg.offline		= 0; //detected by diag.offline
_loaderCfg.online		= 1; //detected by diag.offline
_loaderCfg.connectionType= 2; //0=without connection, 1=bad connection and 2 good connection //just for cordova apps
