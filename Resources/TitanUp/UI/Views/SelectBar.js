function SelectBar(params) {
    var _labels = [];
    var _buttons = [];
    var _self = null;
    var _enabled = true;
    var _allow_deselect = true;
    var _current_idx = -1;
    var onswitchclick = function(e) {
        var btn_val = e.source.value;
        var btn_idx = -1;
        for (var j = 0; _buttons.length > j; j++) if (_buttons[j] == e.source) {
            btn_idx = j;
            break;
        }
        if (-1 == btn_idx) return;
        var new_idx = btn_idx;
        btn_val ? btn_idx != _current_idx && -1 != _current_idx && _buttons[_current_idx].setValue(false) : _allow_deselect ? new_idx = -1 : e.source.setValue(true);
        if (new_idx != _current_idx) {
            _current_idx = new_idx;
            _self.fireEvent("TUchange", {
                index: _current_idx
            });
        }
    };
    var _init = function(params) {
        if ("undefined" == typeof params.labels) return null;
        _labels = params.labels;
        if ("undefined" != typeof params.allow_deselect) {
            _allow_deselect = params.allow_deselect;
            delete params.allow_deselect;
        }
        "undefined" == typeof params.height && (params.height = Ti.UI.SIZE);
        if ("ios" == TU.Device.getOS()) {
            "undefined" == typeof params.style && (params.style = Titanium.UI.iPhone.SystemButtonStyle.BAR);
            _self = Ti.UI.iOS.createTabbedBar(params);
            var gotclickevent;
            _self.addEventListener("click", function(e) {
                _current_idx = e.index;
                gotclickevent = true;
                _self.fireEvent("TUchange", {
                    index: _self.xgetSelectedIndex()
                });
            });
            _allow_deselect && _self.addEventListener("singletap", function() {
                if (!gotclickevent) {
                    _self.setIndex(null);
                    _self.fireEvent("TUchange", {
                        index: -1
                    });
                }
                gotclickevent = false;
            });
        } else {
            params.layout = "horizontal";
            var btnw = parseInt(100 / _labels.length);
            btnw = "" + btnw + "%";
            _self = Ti.UI.createView(params);
            for (var i = 0; _labels.length > i; i++) {
                var label = params.labels[i];
                var button = Ti.UI.createSwitch({
                    titleOn: label,
                    titleOff: label,
                    font: TU.UI.Theme.fonts.small,
                    width: btnw
                });
                _buttons.push(button);
                button.addEventListener("click", onswitchclick);
                _self.add(button);
            }
        }
    };
    _init(params);
    if (null == _self) return null;
    _self.xgetSelectedIndex = function() {
        return _current_idx;
    };
    _self.xsetSelectedIndex = function(idx) {
        if (-1 > idx) return;
        if (idx > _labels.length - 1) return;
        _current_idx = idx;
        if ("ios" == TU.Device.getOS()) {
            -1 == idx && (idx = null);
            _self.setIndex(idx);
            return;
        }
        for (var i = 0; _buttons.length > i; i++) _buttons[i].setValue(false);
        _buttons[idx].setValue(true);
    };
    _self.xsetEnabled = function(enabled) {
        _enabled = enabled;
        if ("ios" == TU.Device.getOS()) {
            _self.setTouchEnabled(enabled);
            return;
        }
        for (var j = 0; _buttons.length > j; j++) _buttons[j].enabled = enabled;
    };
    return _self;
}

var TU = null;

SelectBar.TUInit = function(tu) {
    TU = tu;
};

module.exports = SelectBar;