function LocationManager() {
    function add_listener() {
        if (_geo_sleeping) return;
        if (!_listener_active) {
            Ti.API.debug("[LocationManager] " + new Date() + " adding location callback...");
            Ti.Geolocation.addEventListener("location", callback);
            _listener_active = true;
        }
    }
    function remove_listener() {
        if (_listener_active) {
            Ti.API.debug("[LocationManager] " + new Date() + " removing location callback...");
            Ti.Geolocation.removeEventListener("location", callback);
            _listener_active = false;
        }
    }
    function callback(e) {
        if (!e.success || e.error) Ti.API.error("[LocationManager] " + new Date() + " Error: " + JSON.stringify(e.error)); else {
            _coords = e.coords;
            Ti.API.info("[LocationManager] " + new Date() + " lat,lon: " + e.coords.latitude + ", " + e.coords.longitude + "; accuracy: " + e.coords.accuracy + "; timestamp: " + e.coords.timestamp);
            Ti.API.info(e.coords);
            if (_desired_accuracy >= e.coords.accuracy) {
                Ti.API.debug("[LocationManager] " + new Date() + " sleeping the geolocation for 60 seconds...");
                _geo_sleeping = true;
                remove_listener();
                setTimeout(function() {
                    _geo_sleeping = false;
                    add_listener();
                }, 6e4);
                return;
            }
        }
        if (!_first_callback) {
            add_listener();
            _first_callback = true;
        }
    }
    function _init() {
        if (Ti.Geolocation.locationServicesEnabled) {
            if ("ios" == TU.Device.getOS()) {
                Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
                Ti.Geolocation.distanceFilter = 10;
                Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
            } else Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
            Ti.Geolocation.purpose = "Determine Current Location";
            Ti.Geolocation.getCurrentPosition(callback);
            _initialized = true;
        } else alert("Please enable location services");
    }
    this.getCoords = function() {
        return _coords;
    };
    _initialized || _init();
}

var TU = null;

var _coords = null;

var _retry_timeout = null;

var _desired_accuracy = 100;

var _listener_active = false;

var _initialized = false;

var _first_callback = false;

var _geo_sleeping = false;

LocationManager.TUInit = function(tu) {
    TU = tu;
};

module.exports = LocationManager;