myAppModule.factory('showtimeFactory', function($http){
	var factory = {};
	var showtimes = [];
	var initialShowtime = false;
	var dates = []
	var position = {}
	for(var i = 0; i < 8; i++){
		var time = moment().add(i,'day').format('LL')
		dates.push({date: time})
	}
  console.log('dates', dates)

  function getCurrentLocation(callback){
  	if (navigator.geolocation) {
			var timeoutVal = 10 * 1000 * 2000;
			navigator.geolocation.getCurrentPosition(displayPosition,displayError,
								{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 });
		}else {
			console.log("Geolocation is not supported by this browser");
		}

		function displayPosition(position) {
			position = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}
		  console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
		}
		function displayError(error) {
		  var errors = { 
		    1: 'Permission denied',
		    2: 'Position unavailable',
		    3: 'Request timeout'
		  };
		  console.log("Error: " + errors[error.code]);
		}
  }

	factory.searchTheaters = function (data, callback){
		console.log('in search theater', data)
		$http.post('/showtimes/search', data).success(function (output){
			showtimes = output
			initialShowtime = true
			callback(output)
		})
	}

	factory.updateShowtime = function(newDate, callback){
		$http.get("https://freegeoip.net/json/").success(function (location) {
		 	console.log('location', location)
		 	newDate.location = location
		 	// console.log('newDate', newDate)
  		$http.post('/showtimes/update', newDate).success(function (output){
    		console.log('showtimes', output)
    		showtimes = output
    		initialShowtime = true
    		callback(output)
    	})
		})
	}

  factory.getShowtimes = function (callback){
		$http.get("https://freegeoip.net/json/").success(function (location) {
		 	console.log('location', location)
  		$http.post('/showtimes',location).success(function (output){
    		console.log('showtimes', output)
    		showtimes = output
    		initialShowtime = true
    		callback(output)
    	})
		})
  }

   factory.getDates = function(callback){
   	callback(dates);
   }

   factory.getSavedShowtimes = function(callback){
   	callback(showtimes);
   }

   factory.getInitialShowtime = function(callback){
   	callback(initialShowtime);
   }
	return factory
})
