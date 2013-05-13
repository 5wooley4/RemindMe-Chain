function Sizer() {}

function initialize() {
    _density = TU.Device.getDensity();
    "ios" == TU.Device.getOS() && (_isIOS = true);
    _isTablet = TU.Device.getIsTablet();
}

var TU = null;

var _isIOS = false;

var _density = "medium";

var _isTablet = false;

Sizer.getDimension = function(m) {
    if (_isIOS) return m;
    Ti.API.debug("[TU.UI.Sizer] getDimensionExact (" + l + ", " + m + ", " + h + ", " + xh + "); density: " + _density);
    var l = parseInt(.75 * m);
    var h = parseInt(1.5 * m);
    var xh = 2 * m;
    var dimension = m;
    switch (_density) {
      case "low":
        dimension = _isTablet ? m : l;
        break;

      case "medium":
        dimension = _isTablet ? h : m;
        break;

      case "high":
        dimension = _isTablet ? xh : h;
        break;

      case "xhigh":
        dimension = xh;
    }
    return dimension;
};

Sizer.getDimensionExact = function(l, m, h, xh) {
    if (_isIOS) return m;
    var dimension = xh;
    switch (_density) {
      case "low":
        dimension = _isTablet ? m : l;
        break;

      case "medium":
        dimension = _isTablet ? h : m;
        break;

      case "high":
        dimension = _isTablet ? xh : h;
        break;

      case "xhigh":
        dimension = xh;
    }
    return dimension;
};

Sizer.TUInit = function(tu) {
    TU = tu;
    initialize();
};

module.exports = Sizer;