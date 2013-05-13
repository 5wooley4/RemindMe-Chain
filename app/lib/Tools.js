
// module.exports._getExtension = function(fn) {
	// // from http://stackoverflow.com/a/680982/292947
	// var re = /(?:\.([^.]+))?$/;
	// var tmpext = re.exec(fn)[1];
	// return (tmpext) ? tmpext : '';
// };
// 
// module.exports.RemoteImage = function(a){
	// a = a || {};
	// var md5;
	// var needsToSave = false;
	// var savedFile;
	// if(a.image){
		// md5 = Ti.Utils.md5HexDigest(a.image)+this._getExtension(a.image);
		// savedFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,md5);
		// if(savedFile.exists()){
			// a.image = savedFile;
		// } else {
			// needsToSave = true;
		// }
	// }
	// var image = Ti.UI.createImageView(a);
	// if(needsToSave === true){
		// function saveImage(e){
			// image.removeEventListener('load',saveImage);
			// savedFile.write(
				// Ti.UI.createImageView({image:image.image,width:'auto',height:'auto'}).toImage()
			// );
		// }
		// image.addEventListener('load',saveImage);
	// }
	// return image;
// };
module.exports = (function(){
	return {
		/**
		 * Creates a checkbox which can be used on android or anything else.
 		 * @param {Object} specs
 		 * Object which holds the specs to be defined.
		 */
		createCheckbox: function(specs) {
			var is_android = Ti.Platform.osname == 'android';
			if(typeof specs != "object")
			    specs = {};
			var checkbox;
				checkbox = Ti.UI.createSwitch({
			        style : is_android?Ti.UI.Android.SWITCH_STYLE_CHECKBOX:null,
			        value : false,
			        height : Ti.UI.SIZE,
			        width : Ti.UI.SIZE
			    });
					
			var view = Ti.UI.createView({
				height: specs.height || Ti.UI.SIZE,
				width: specs.width || Ti.UI.SIZE,
				layout: specs.layout || 'vertical',
				top: specs.top || '0dip',
				bottom: specs.bottom || '0dip',
				backgroundColor:'red'
			});
			
			if(specs.label){
				if(typeof specs.label == 'string'){
					var lbl = Ti.UI.createLabel({
						height: Ti.UI.SIZE,
						width: Ti.UI.SIZE,
						text: specs.label,
						color: 'black',
						font: {fontSize: '15dip'}
					});
					view.add(lbl);
					// view.label = lbl;
				}
				else{
					view.add(specs.label);
				}
			}
			view.checked = false;
			view.add(checkbox);

			function togglecheck () {
			    if(!view.checked) {
			        view.checked = true;
			    }
			    else {
			        view.checked = false;
			    }           
			};
			view.addEventListener('change', togglecheck);
			
			return view;
		},
		/**
		 * Returns the time from today until that day.
 		 * @param {Integer} day
		 */
		day_delta: function(day){
			var d = new Date();
			var d = d.getDay();
			if(typeof day == 'string'){
				//day = day.tolowercase();
				if(day == 'Sunday' || day == 'sun'){
					day = 0;
				}
				else if (day == 'Monday' || day == 'mon'){
					day = 1;
				}
				else if (day == 'Tuesday' || day == 'tue'){
					day = 2;
				}
				else if (day == 'Wednesday' || day == 'wed'){
					day = 3;
				}
				else if (day == 'Thursday' || day == 'thu'){
					day = 4;
				}
				else if (day == 'Friday' || day == 'fri'){
					day = 5;
				}
				else if (day == 'Saturday' || day == 'sat'){
					day = 6;
				}
			}
			if(d == day)
				return 0;
			
			var count = 0;
			while(d != day && count <= 7){
				count++;
				d++;
				if(d > 6){
					d = 0;
				}
			}
			return count;
		},
		/**
		 * given an integer, returns the string representation. 
 		 * @param {Object} d
		 */
		day_int_to_str: function(d){
			d %= 7;
			var weekday=new Array(7);
			weekday[0]="Sunday";
			weekday[1]="Monday";
			weekday[2]="Tuesday";
			weekday[3]="Wednesday";
			weekday[4]="Thursday";
			weekday[5]="Friday";
			weekday[6]="Saturday";
			
			var n = weekday[d];	
			return n;
		}
	};
})( );