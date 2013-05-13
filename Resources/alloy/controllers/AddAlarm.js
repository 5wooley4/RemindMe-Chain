function Controller() {
    function close(e) {
        var repeat_string = "";
        repeat_string += ch_sun.checked ? "S" : "-";
        repeat_string += ch_mon.checked ? "M" : "-";
        repeat_string += ch_tue.checked ? "T" : "-";
        repeat_string += ch_wed.checked ? "W" : "-";
        repeat_string += ch_thu.checked ? "T" : "-";
        repeat_string += ch_fri.checked ? "F" : "-";
        repeat_string += ch_sat.checked ? "S" : "-";
        if ("create_alarm" == e.source.id) {
            var name = $.alarm_name.value;
            var h = parseInt(selected_hour.substring(0, 2));
            var m = parseInt(selected_minute);
            var new_alarm = Alloy.createModel("alarm", {
                title: name,
                hour: h,
                minute: m,
                ampm: selected_mn,
                Sunday: ch_sun.checked,
                Monday: ch_mon.checked,
                Tuesday: ch_tue.checked,
                Wednesday: ch_wed.checked,
                Thursday: ch_thu.checked,
                Friday: ch_fri.checked,
                Saturday: ch_sat.checked,
                pretty: selected_hour + selected_minute + " " + selected_mn + " " + repeat_string
            });
            new_alarm.save();
            Ti.App.fireEvent("new_alarm");
        }
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#b2cecf",
        layout: "vertical",
        navBarHidden: true,
        exitOnClose: false,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId0 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        scrollType: "vertical",
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        color: "#d02552",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "30dip",
            fontWeight: "bold"
        },
        left: "10dip",
        text: "Add New Alarm",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.overview = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dip",
        right: "10dip",
        bottom: "10dip",
        top: "10dip",
        backgroundColor: "#EEEEEE",
        id: "overview"
    });
    $.__views.__alloyId0.add($.__views.overview);
    $.__views.alarm_name = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        top: "10dip",
        left: "10dip",
        right: "10dip",
        hintText: "Alarm Name",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "alarm_name"
    });
    $.__views.overview.add($.__views.alarm_name);
    $.__views.form = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dip",
        left: "10dip",
        right: "10dip",
        id: "form"
    });
    $.__views.overview.add($.__views.form);
    $.__views.repeat = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: "10dip",
        right: "10dip",
        layout: "horizontal",
        id: "repeat"
    });
    $.__views.overview.add($.__views.repeat);
    $.__views.create_alarm = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: "60dip",
        left: "10dip",
        right: "10dip",
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        backgroundColor: "#30b06d",
        borderRadius: "5dip",
        color: "white",
        font: {
            fontSize: "20dip",
            fontStyle: "bold"
        },
        title: "Add Alarm",
        id: "create_alarm"
    });
    $.__views.overview.add($.__views.create_alarm);
    close ? $.__views.create_alarm.addEventListener("click", close) : __defers["$.__views.create_alarm!click!close"] = true;
    $.__views.cancel_alarm = Ti.UI.createButton({
        backgroundColor: "#d02552",
        width: Ti.UI.FILL,
        height: "60dip",
        top: "10dip",
        left: "10dip",
        right: "10dip",
        bottom: "10dip",
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        borderRadius: "5dip",
        color: "white",
        font: {
            fontSize: "20dip",
            fontStyle: "bold"
        },
        title: "Cancel",
        id: "cancel_alarm"
    });
    $.__views.overview.add($.__views.cancel_alarm);
    close ? $.__views.cancel_alarm.addEventListener("click", close) : __defers["$.__views.cancel_alarm!click!close"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var TU = require("/TitanUp/TitanUp");
    var utils = require("/Tools");
    "android" == Ti.Platform.osname;
    var ar = [];
    var str = null;
    for (var i = 1; 13 > i; i++) {
        str = i + ":";
        10 > i && (str = "0" + str);
        ar.push(str);
    }
    var selected_hour = ar[0];
    var hour = TU.UI.createSimplePicker({
        width: "33%",
        title: "Hour",
        values: ar
    });
    hour.addEventListener("TUchange", function(e) {
        selected_hour = e.value;
    });
    var ar2 = [];
    str = null;
    for (var i = 0; 60 > i; i++) {
        str = i + "";
        10 > i && (str = "0" + str);
        ar2.push(str);
    }
    var selected_minute = ar2[0];
    var minute = TU.UI.createSimplePicker({
        width: "33%",
        title: "Minute",
        values: ar2
    });
    minute.addEventListener("TUchange", function(e) {
        selected_minute = e.value;
    });
    var selected_mn = "AM";
    var mn = TU.UI.createSimplePicker({
        width: "33%",
        title: "AM/PM",
        values: [ "AM", "PM" ]
    });
    mn.addEventListener("TUchange", function(e) {
        selected_mn = e.value;
    });
    $.form.add(hour);
    $.form.add(minute);
    $.form.add(mn);
    ch_sun = utils.createCheckbox({
        label: " Sunday",
        width: "33%"
    });
    ch_mon = utils.createCheckbox({
        label: " Monday",
        width: "33%"
    });
    ch_tue = utils.createCheckbox({
        label: " Tuesday",
        width: "33%"
    });
    ch_wed = utils.createCheckbox({
        label: " Wednesday",
        width: "33%"
    });
    ch_thu = utils.createCheckbox({
        label: " Thursday",
        width: "33%"
    });
    ch_fri = utils.createCheckbox({
        label: " Friday",
        width: "33%"
    });
    ch_sat = utils.createCheckbox({
        label: " Saturday",
        width: "99%"
    });
    $.repeat.add(ch_sun);
    $.repeat.add(ch_mon);
    $.repeat.add(ch_tue);
    $.repeat.add(ch_wed);
    $.repeat.add(ch_thu);
    $.repeat.add(ch_fri);
    $.repeat.add(ch_sat);
    __defers["$.__views.create_alarm!click!close"] && $.__views.create_alarm.addEventListener("click", close);
    __defers["$.__views.cancel_alarm!click!close"] && $.__views.cancel_alarm.addEventListener("click", close);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;