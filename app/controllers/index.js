var TU = require('TitanUp/TitanUp');
var alarms = Alloy.Collections.alarm;
alarms.fetch();
if(Ti.Platform.osname == "android"){
	var intent = Titanium.Android.createServiceIntent( { url: 'myservice.js' } );
	// Service should run its code every 2 seconds.
	intent.putExtra('interval', 60000);
	// A message that the service should 'echo'
	intent.putExtra('message_to_echo', 'Checking if alarm needs sounding');
	if (!Titanium.Android.isServiceRunning(intent)){
		var service = Titanium.Android.createService(intent);
		service.addEventListener('resume', function(e) {
		    Titanium.API.info('Service code resumes, iteration ' + e.iteration);
		});
		service.addEventListener('pause', function(e) {
		    Titanium.API.info('Service code pauses, iteration ' + e.iteration);
		});
		service.start();
	}
}

function doClick(e) { 
	var AddAlarm = Alloy.createController('AddAlarm');
	AddAlarm.getView().open();

};
function AddAlarm(e){
	alert(JSON.stringify(e));
};

Ti.App.addEventListener('new_alarm', function(){
	    	alarms.fetch();
	    	alert('got the new alarm')
});

var timer, timePressed = 0;
var pressLen = 500;
$.table.addEventListener('touchstart', function(e){
	if(e.source.id=='alarm_row'){
		
	    timePressed = 0;
	    timer = setInterval(function(){
	        timePressed += 100;
	        if (timePressed >= pressLen){
	        		Ti.API.info('vibrate');
	        	    clearInterval(timer);
	        		Ti.Media.vibrate();
	        	}
	    }, 100);
	} 
});
 
$.table.addEventListener('touchend', function(e){
    try{
    		clearInterval(timer);
    }
    catch(e){
		Ti.API.info('interval already cleared');
	}
    if (timePressed >= pressLen){
        alert('yeah, thats a long click!');
    }
    timePressed = 0;
});


$.index.open();
