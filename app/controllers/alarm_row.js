
var args = arguments[0] || {};

var utils = require('/Tools');

model = args.$model;

var date = new Date();
var day_checker = date.getDay()+1;
var today = utils.day_int_to_str(date.getDay());
var weekday=new Array(7);
weekday[0]=model.get("Sunday");
weekday[1]=model.get("Monday");
weekday[2]=model.get("Tuesday");
weekday[3]=model.get("Wednesday");
weekday[4]=model.get("Thursday");
weekday[5]=model.get("Friday");
weekday[6]=model.get("Saturday");
//Ti.API.info(JSON.stringify(model));
//Ti.API.info(JSON.stringify(weekday));
found = false;
var days = 0;
while(!found && days < 8){
	if(weekday[day_checker] == 1){
		found = true;
	}
	else{
		day_checker++;
		day_checker = day_checker % 7;
	}
	days++;
}
next_alarm_day = utils.day_int_to_str(day_checker)
$.next_alarm.text = "Next Alarm: "+next_alarm_day + "(" + days +  " days)";
