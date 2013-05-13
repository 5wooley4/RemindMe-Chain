
var TU = require('/TitanUp/TitanUp');
var utils = require('/Tools');
var is_android = Ti.Platform.osname == 'android';

var ar = [];
var str = null;
for(var i = 1; i < 13; i++){
	str = i+':';
	if(i < 10)
		str = '0'+str;
	ar.push(str);
}
var selected_hour = ar[0]
var hour = TU.UI.createSimplePicker ({
		width: '33%',
		title: "Hour",
		values: ar
	});
hour.addEventListener ('TUchange', function (e) {
		selected_hour = e.value;
});
var ar2 = [];
str = null;
for(var i = 0; i < 60; i++){
	str = i+'';
	if(i < 10)
		str = '0'+str;
	ar2.push(str);
}
var selected_minute = ar2[0];
var minute = TU.UI.createSimplePicker ({
		width: '33%',
		title: "Minute",
		values: ar2
	});
minute.addEventListener ('TUchange', function (e) {
		selected_minute = e.value;
});
var selected_mn = 'AM'
var mn = TU.UI.createSimplePicker ({
		width: '33%',
		title: "AM/PM",
		values: ['AM', 'PM']
	});
mn.addEventListener ('TUchange', function (e) {
		selected_mn = e.value;
});



$.form.add(hour);
$.form.add(minute);
$.form.add(mn);


ch_sun = utils.createCheckbox({label:" Sunday", width:'33%'});
ch_mon = utils.createCheckbox({label:" Monday", width:'33%'});
ch_tue = utils.createCheckbox({label:" Tuesday", width:'33%'});
ch_wed = utils.createCheckbox({label:" Wednesday", width:'33%'});
ch_thu = utils.createCheckbox({label:" Thursday", width:'33%'});
ch_fri = utils.createCheckbox({label:" Friday", width:'33%'});
ch_sat = utils.createCheckbox({label:" Saturday", width:'99%'});

// ch_sun = utils.createCheckbox({label:" Sunday", width:'60dip'});
// ch_mon = utils.createCheckbox({label:" Monday", width:'60dip'});
// ch_tue = utils.createCheckbox({label:" Tuesday", width:'60dip'});
// ch_wed = utils.createCheckbox({label:" Wednesday", width:'60dip'});
// ch_thu = utils.createCheckbox({label:" Thursday", width:'60dip'});
// ch_fri = utils.createCheckbox({label:" Friday", width:'60dip'});
// ch_sat = utils.createCheckbox({label:" Saturday", width:'100%'});

$.repeat.add(ch_sun);
$.repeat.add(ch_mon);
$.repeat.add(ch_tue);
$.repeat.add(ch_wed);
$.repeat.add(ch_thu);
$.repeat.add(ch_fri);
$.repeat.add(ch_sat);



function close(e){
	var repeat_string = '';
	repeat_string += ch_sun.checked? 'S': '-';
	repeat_string += ch_mon.checked? 'M': '-';
	repeat_string += ch_tue.checked? 'T': '-';
	repeat_string += ch_wed.checked? 'W': '-';
	repeat_string += ch_thu.checked? 'T': '-';
	repeat_string += ch_fri.checked? 'F': '-';
	repeat_string += ch_sat.checked? 'S': '-';
	if(e.source.id=='create_alarm'){
		var name = $.alarm_name.value;
		var h = parseInt(selected_hour.substring(0, 2));
		var m = parseInt(selected_minute);
		var new_alarm = Alloy.createModel('alarm', {
			title: name,
			hour: h,
			minute: m,
			ampm:selected_mn,
			Sunday: ch_sun.checked,
			Monday: ch_mon.checked,
			Tuesday: ch_tue.checked,
			Wednesday: ch_wed.checked,
			Thursday: ch_thu.checked,
			Friday: ch_fri.checked,
			Saturday: ch_sat.checked,
			pretty: selected_hour+selected_minute+' '+selected_mn + ' ' + repeat_string
		});
	    	new_alarm.save();
	    	Ti.App.fireEvent('new_alarm');
    	}
    
	$.win.close();
}
