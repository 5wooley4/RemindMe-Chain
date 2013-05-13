module.exports = function() {
    return {
        createCheckbox: function(specs) {
            function togglecheck() {
                view.checked = view.checked ? false : true;
            }
            var is_android = "android" == Ti.Platform.osname;
            "object" != typeof specs && (specs = {});
            var checkbox;
            checkbox = Ti.UI.createSwitch({
                style: is_android ? Ti.UI.Android.SWITCH_STYLE_CHECKBOX : null,
                value: false,
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE
            });
            var view = Ti.UI.createView({
                height: specs.height || Ti.UI.SIZE,
                width: specs.width || Ti.UI.SIZE,
                layout: specs.layout || "vertical",
                top: specs.top || "0dip",
                bottom: specs.bottom || "0dip",
                backgroundColor: "red"
            });
            if (specs.label) if ("string" == typeof specs.label) {
                var lbl = Ti.UI.createLabel({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE,
                    text: specs.label,
                    color: "black",
                    font: {
                        fontSize: "15dip"
                    }
                });
                view.add(lbl);
            } else view.add(specs.label);
            view.checked = false;
            view.add(checkbox);
            view.addEventListener("change", togglecheck);
            return view;
        },
        day_delta: function(day) {
            var d = new Date();
            var d = d.getDay();
            "string" == typeof day && ("Sunday" == day || "sun" == day ? day = 0 : "Monday" == day || "mon" == day ? day = 1 : "Tuesday" == day || "tue" == day ? day = 2 : "Wednesday" == day || "wed" == day ? day = 3 : "Thursday" == day || "thu" == day ? day = 4 : "Friday" == day || "fri" == day ? day = 5 : ("Saturday" == day || "sat" == day) && (day = 6));
            if (d == day) return 0;
            var count = 0;
            while (d != day && 7 >= count) {
                count++;
                d++;
                d > 6 && (d = 0);
            }
            return count;
        },
        day_int_to_str: function(d) {
            d %= 7;
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var n = weekday[d];
            return n;
        }
    };
}();