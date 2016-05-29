myAppModule.factory('newsFactory', function($http){
	var factory = {};
	var url = "https://api.nytimes.com/svc/topstories/v2/movies.json";
	url += '?' + $.param({
	  'api-key': "9517057724134dafb3dc9fc62c9ee1b4"
	});


	factory.getNews = function(callback){
		$.ajax({
			url: url,
			method: 'GET',
			}).done(function(result) {
				console.log(result);
				callback(result);
			}).fail(function(err) {
				throw err;
		});
	}

	return factory
})
