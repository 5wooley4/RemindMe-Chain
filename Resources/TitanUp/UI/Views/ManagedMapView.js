function ManagedMapView() {
    if (null != _instance) return _instance;
    _instance = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: true,
        regionFit: true,
        userLocation: true,
        visible: false
    });
    _instance.addEventListener("click", function(e) {
        if (null == e.clicksource || "pin" == e.clicksource || null == e.annotation) return;
        null != _click_callback && _click_callback(e);
    });
    _instance.manage = function(view, win, click_callback, added_callback, removed_callback) {
        Ti.API.debug('[ManagedMapView.addToView] managing MapView for window "' + win.title + '"...');
        win.addEventListener("open", function() {
            _instance.addToView(view, click_callback);
            added_callback && added_callback();
        });
        win.addEventListener("close", function() {
            _instance.removeFromView(view);
            removed_callback && removed_callback();
        });
    };
    _instance.addToView = function(view, click_callback) {
        Ti.API.debug("[ManagedMapView.addToView] entering...");
        if (view == _current_parent) return;
        null != _current_parent && _instance.removeFromView(_current_parent);
        Ti.API.debug('[ManagedMapView.addToView] adding instance to view "' + view.title + '"...');
        view.add(_instance);
        _current_parent = view;
        _click_callback = click_callback;
    };
    _instance.removeFromView = function(view) {
        Ti.API.debug("[ManagedMapView.removeFromView] entering...");
        if (view != _current_parent) return;
        Ti.API.debug('[ManagedMapView.removeFromView] removing instance from view "' + view.title + '"...');
        _current_parent = null;
        _click_callback = null;
        view.remove(_instance);
    };
    return _instance;
}

var _instance = null;

var _current_parent = null;

var _click_callback = null;

module.exports = ManagedMapView;