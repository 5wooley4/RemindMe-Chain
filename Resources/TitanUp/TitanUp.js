function TitanUp() {}

var start = new Date().getTime();

_version = "0.1.0";

TitanUp.getVersion = function() {
    return _version;
};

Ti.API.debug("[TitanUp] initializing...");

TitanUp.Device = require("/TitanUp/Device");

TitanUp.UI = require("/TitanUp/UI/UI");

TitanUp.UI.TUInit(TitanUp);

TitanUp.LocationManager = require("/TitanUp/LocationManager");

TitanUp.LocationManager.TUInit(TitanUp);

TitanUp.Globals = {};

var elapsed = new Date().getTime() - start;

Ti.API.debug("[TitanUp] load time: " + elapsed + " ms");

module.exports = TitanUp;