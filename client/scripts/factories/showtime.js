myAppModule.factory('showtimeFactory', function($http){
	var factory = {};
	var showtimes = [];
	var initialShowtime = false;
	var dates = []

	for(var i = 0; i < 8; i++){
		var time = moment().add(i,'day').format('LL')
		dates.push({date: time})
	}
  console.log('dates', dates)

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
