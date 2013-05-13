function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        className: "loc_row",
        dataId: "",
        id: "row",
        model: "undefined" != typeof $model.__transform["alloy_id"] ? $model.__transform["alloy_id"] : $model.get("alloy_id")
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.alarm_row = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "alarm_row"
    });
    $.__views.row.add($.__views.alarm_row);
    $.__views.alarm_info = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        touchEnabled: false,
        id: "alarm_info"
    });
    $.__views.alarm_row.add($.__views.alarm_info);
    $.__views.alarm_title = Ti.UI.createLabel({
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "14dip"
        },
        touchEnabled: false,
        left: "10dip",
        top: "10dip",
        bottom: "10dip",
        right: "10dip",
        id: "alarm_title",
        text: "undefined" != typeof $model.__transform["title"] ? $model.__transform["title"] : $model.get("title")
    });
    $.__views.alarm_info.add($.__views.alarm_title);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "14dip"
        },
        text: "undefined" != typeof $model.__transform["pretty"] ? $model.__transform["pretty"] : $model.get("pretty"),
        id: "__alloyId2"
    });
    $.__views.alarm_info.add($.__views.__alloyId2);
    $.__views.time_to_alarm = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "time_to_alarm"
    });
    $.__views.alarm_row.add($.__views.time_to_alarm);
    $.__views.next_alarm = Ti.UI.createLabel({
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "14dip"
        },
        text: "--",
        id: "next_alarm"
    });
    $.__views.time_to_alarm.add($.__views.next_alarm);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var utils = require("/Tools");
    model = args.$model;
    var date = new Date();
    var day_checker = date.getDay() + 1;
    utils.day_int_to_str(date.getDay());
    var weekday = new Array(7);
    weekday[0] = model.get("Sunday");
    weekday[1] = model.get("Monday");
    weekday[2] = model.get("Tuesday");
    weekday[3] = model.get("Wednesday");
    weekday[4] = model.get("Thursday");
    weekday[5] = model.get("Friday");
    weekday[6] = model.get("Saturday");
    found = false;
    var days = 0;
    while (!found && 8 > days) {
        if (1 == weekday[day_checker]) found = true; else {
            day_checker++;
            day_checker %= 7;
        }
        days++;
    }
    next_alarm_day = utils.day_int_to_str(day_checker);
    $.next_alarm.text = "Next Alarm: " + next_alarm_day + "(" + days + " days)";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;