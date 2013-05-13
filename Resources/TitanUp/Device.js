function Device() {}

function initialize() {
    function computePhysicalDimensions() {
        var densityFactor = 1;
        "dip" == Device.getNativeUnit() && (densityFactor = Device.getLogicalDensityFactor());
        _physicalWidth = _displayWidth / _dpi * densityFactor;
        _physicalHeight = _displayHeight / _dpi * densityFactor;
        Ti.API.debug("[TU.Device] _physicalWidth: " + _physicalWidth);
        Ti.API.debug("[TU.Device] _physicalHeight: " + _physicalHeight);
    }
    function setDisplayDimensions() {
        _displayWidth = _dc.platformWidth;
        _displayHeight = _dc.platformHeight;
        Ti.API.debug("[TU.Device] _displayWidth: " + _displayWidth);
        Ti.API.debug("[TU.Device] _displayHeight: " + _displayHeight);
        computePhysicalDimensions();
    }
    _osname = Ti.Platform.osname;
    _platformName = "iPhone OS";
    "iPhone OS" === _platformName ? _os = "ios" : "android" === _platformName && (_os = "android");
    _dc = Ti.Platform.displayCaps;
    _density = _dc.density;
    _dpi = _dc.dpi;
    Ti.Gesture.addEventListener("orientationchange", function() {
        setDisplayDimensions();
    });
    setDisplayDimensions();
    _screensize = Math.sqrt(_physicalWidth * _physicalWidth + _physicalHeight * _physicalHeight);
    _isTablet = "ipad" === _osname || "android" === _osname && _screensize >= 6.25;
    Ti.API.debug("[TU.Device] _screensize: " + _screensize);
    Ti.API.debug("[TU.Device] _isTablet: " + _isTablet ? "true" : "false");
    _workingWidth = _displayWidth;
    _workingHeight = _displayHeight;
}

var _osname = "";

var _platformName = "";

var _dc = null;

var _os = "unknown";

var _displayWidth = 0;

var _displayHeight = 0;

var _workingWidth = 0;

var _workingHeight = 0;

var _density = "";

var _dpi = 0;

var _isTablet = false;

var _physicalWidth = 0;

var _physicalHeight = 0;

var _screensize = 0;

Device.getOS = function() {
    return _os;
};

Device.getDisplayWidth = function() {
    return _displayWidth;
};

Device.getDisplayHeight = function() {
    return _displayHeight;
};

Device.getDensity = function() {
    return _density;
};

Device.getDpi = function() {
    return _dpi;
};

Device.getNativeUnit = function() {
    if ("ios" == _os) return "dip";
    return "px";
};

Device.getLogicalDensityFactor = function() {
    if ("android" == _os) return _dc.logicalDensityFactor;
    if ("ios" == _os && ("ipad" == _osname && 260 == _dpi || 320 == _dpi)) return 2;
    return 1;
};

Device.getIsTablet = function() {
    return _isTablet;
};

Device.getPhysicalWidth = function() {
    return _physicalWidth;
};

Device.getPhysicalHeight = function() {
    return _physicalHeight;
};

Device.getScreensize = function() {
    return _screensize;
};

Device.getWorkingWidth = function() {
    return _workingWidth;
};

Device.getWorkingHeight = function() {
    return _workingHeight;
};

Device.setWorkingDimensions = function(workingWidth, workingHeight) {
    _workingWidth = workingWidth;
    _workingHeight = workingHeight;
};

initialize();

module.exports = Device;