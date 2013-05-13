function UI() {}

var TU = null;

UI.EventThrottle = function() {
    var _ignore_event = false;
    this.shouldFire = function() {
        if (_ignore_event) {
            Ti.API.debug("[TU.UI.EventThrottle] ignoring event...");
            return false;
        }
        _ignore_event = true;
        return true;
    };
    this.setWindow = function(win) {
        win.addEventListener("close", function() {
            _ignore_event = false;
        });
    };
    this.setTimeout = function(ms) {
        setTimeout(function() {
            _ignore_event = false;
        }, ms);
    };
};

UI.createSimplePicker = function(params) {
    var SimplePicker = require("/TitanUp/UI/Views/SimplePicker");
    SimplePicker.TUInit(TU);
    return new SimplePicker(params);
};

UI.createManagedMapView = function() {
    var ManagedMapView = require("/TitanUp/UI/Views/ManagedMapView");
    return new ManagedMapView();
};

UI.createSelectBar = function(params) {
    var SelectBar = require("/TitanUp/UI/Views/SelectBar");
    SelectBar.TUInit(TU);
    return new SelectBar(params);
};

UI.createGalleryView = function(params) {
    var GalleryView = require("/TitanUp/UI/Views/GalleryView");
    GalleryView.TUInit(TU);
    return new GalleryView(params);
};

UI.Theme = require("/TitanUp/UI/Theme");

UI.Sizer = require("/TitanUp/UI/Sizer");

UI.TGWM = require("/TitanUp/UI/TGWM");

UI.TUInit = function(tu) {
    TU = tu;
    UI.Theme.TUInit(tu);
    UI.Sizer.TUInit(tu);
    UI.TGWM.TUInit(tu);
};

module.exports = UI;