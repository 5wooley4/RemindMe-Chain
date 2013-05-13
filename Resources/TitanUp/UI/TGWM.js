function TGWM() {}

var TU = null;

var _tabgroup = null;

TGWM.createTabGroup = function() {
    _tabgroup = Titanium.UI.createTabGroup();
    _tabgroup.addEventListener("focus", function(e) {
        if (e.previousIndex != e.index) {
            e.previousIndex >= 0 && null != e.previousTab && e.previousTab.getWindow().fireEvent("tabinactive", e);
            e.tab.getWindow().fireEvent("tabactive", e);
        }
    });
    return _tabgroup;
};

TGWM.openWindow = function(w) {
    if (null != _tabgroup) {
        var currentTab = _tabgroup.getActiveTab();
        var currentWin = currentTab.getWindow();
        w.containingTab = currentTab;
        "android" == TU.Device.getOS() && w.addEventListener("open", function() {
            _tabgroup.getActiveTab().setWindow(currentWin);
        });
        _tabgroup.getActiveTab().open(w);
        return;
    }
    w.open();
};

TGWM.closeWindow = function(w) {
    if (null != _tabgroup) {
        "ios" == TU.Device.getOS() ? "undefined" != typeof w.containingTab ? w.containingTab.close(w) : _tabgroup.getActiveTab().close(w) : w.close();
        return;
    }
    w.close();
};

TGWM.closeOnTabInactive = function(win) {
    var mytabwin = TGWM.getActiveTab().getWindow();
    var onTabInactive = function() {
        mytabwin.removeEventListener("tabinactive", onTabInactive);
        TGWM.closeWindow(win);
    };
    mytabwin && mytabwin.addEventListener("tabinactive", onTabInactive);
};

TGWM.getActiveTab = function() {
    return _tabgroup.getActiveTab();
};

TGWM.TUInit = function(tu) {
    TU = tu;
};

module.exports = TGWM;