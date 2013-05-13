exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            title: "TEXT",
            hour: "INTEGER",
            minute: "INTEGER",
            ampm: "TEXT",
            pretty: "TEXT",
            Sunday: "BOOL",
            Monday: "BOOL",
            Tuesday: "BOOL",
            Wednesday: "BOOL",
            Thursday: "BOOL",
            Friday: "BOOL",
            Saturday: "BOOL"
        },
        defaults: {
            title: "No Title"
        },
        adapter: {
            type: "sql",
            collection_name: "alarms"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("alarm", exports.definition, []);

collection = Alloy.C("alarm", exports.definition, model);

exports.Model = model;

exports.Collection = collection;