exports.definition = {
	config: {
		"columns": {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			'title' : 'TEXT',
			'hour': 'INTEGER',
			'minute': 'INTEGER',
			'ampm': 'TEXT',
			'pretty': 'TEXT',
			'Sunday': 'BOOL',
			'Monday': 'BOOL',
			'Tuesday': 'BOOL',
			'Wednesday': 'BOOL',
			'Thursday': 'BOOL',
			'Friday': 'BOOL',
			'Saturday': 'BOOL'
		},
		"defaults": {
			'title' : 'No Title',
		},
		"adapter": {
            "type": "sql",
            "collection_name": "alarms",
            //'idAttribute': 'id'
        }
	}
}