function Controller() {
    function __alloyId12() {
        var models = __alloyId11.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId9 = models[i];
            __alloyId9.__transform = {};
            var __alloyId10 = Alloy.createController("alarm_row", {
                $model: __alloyId9
            });
            rows.push(__alloyId10.getViewEx({
                recurse: true
            }));
        }
        $.__views.table.setData(rows);
    }
    function doClick() {
        var AddAlarm = Alloy.createController("AddAlarm");
        AddAlarm.getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("alarm");
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#b2cecf",
        layout: "vertical",
        navBarHidden: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.head = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "head",
        layout: "horizontal"
    });
    $.__views.index.add($.__views.head);
    $.__views.__alloyId7 = Ti.UI.createButton({
        width: "60dip",
        height: "60dip",
        left: "10dip",
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        borderRadius: "5dip",
        color: "white",
        font: {
            fontSize: "20dip"
        },
        backgroundColor: "#30b06d",
        title: "+",
        id: "__alloyId7"
    });
    $.__views.head.add($.__views.__alloyId7);
    doClick ? $.__views.__alloyId7.addEventListener("click", doClick) : __defers["$.__views.__alloyId7!click!doClick"] = true;
    $.__views.__alloyId8 = Ti.UI.createLabel({
        color: "#d02552",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "30dip",
            fontWeight: "bold"
        },
        left: "10dip",
        text: "Remind Me",
        id: "__alloyId8"
    });
    $.__views.head.add($.__views.__alloyId8);
    $.__views.table_container = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        bottom: "10dip",
        id: "table_container"
    });
    $.__views.index.add($.__views.table_container);
    $.__views.table = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        bottom: "10dip",
        right: "10dip",
        left: "10dip",
        borderRaidus: "5dip",
        backgroundColor: "#EEEEEE",
        id: "table"
    });
    $.__views.table_container.add($.__views.table);
    var __alloyId11 = Alloy.Collections["alarm"] || alarm;
    __alloyId11.on("fetch destroy change add remove reset", __alloyId12);
    exports.destroy = function() {
        __alloyId11.off("fetch destroy change add remove reset", __alloyId12);
    };
    _.extend($, $.__views);
    require("TitanUp/TitanUp");
    var alarms = Alloy.Collections.alarm;
    alarms.fetch();
    if ("android" == Ti.Platform.osname) {
        var intent = Titanium.Android.createServiceIntent({
            url: "myservice.js"
        });
        intent.putExtra("interval", 6e4);
        intent.putExtra("message_to_echo", "Checking if alarm needs sounding");
        if (!Titanium.Android.isServiceRunning(intent)) {
            var service = Titanium.Android.createService(intent);
            service.addEventListener("resume", function(e) {
                Titanium.API.info("Service code resumes, iteration " + e.iteration);
            });
            service.addEventListener("pause", function(e) {
                Titanium.API.info("Service code pauses, iteration " + e.iteration);
            });
            service.start();
        }
    }
    Ti.App.addEventListener("new_alarm", function() {
        alarms.fetch();
        alert("got the new alarm");
    });
    var timer, timePressed = 0;
    var pressLen = 500;
    $.table.addEventListener("touchstart", function(e) {
        if ("alarm_row" == e.source.id) {
            timePressed = 0;
            timer = setInterval(function() {
                timePressed += 100;
                if (timePressed >= pressLen) {
                    Ti.API.info("vibrate");
                    clearInterval(timer);
                    Ti.Media.vibrate();
                }
            }, 100);
        }
    });
    $.table.addEventListener("touchend", function() {
        try {
            clearInterval(timer);
        } catch (e) {
            Ti.API.info("interval already cleared");
        }
        timePressed >= pressLen && alert("yeah, thats a long click!");
        timePressed = 0;
    });
    $.index.open();
    __defers["$.__views.__alloyId7!click!doClick"] && $.__views.__alloyId7.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;