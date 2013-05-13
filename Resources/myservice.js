var service = Titanium.Android.currentService;

var intent = service.intent;

var message = intent.getStringExtra("message_to_echo");

Titanium.API.info(message);