myAppModule.factory('movieFactory', function($http){
	var now_playing_movies = [];
  var top_rated_movies = [];
  var popular_movies = [];
  var upcoming_movies = [];
  var genres = [];
	var factory = {};
  var api_key = 'c3542f2b9e2c9ad8b6ca61aee72c814b';
  var baseURL = 'http://api.themoviedb.org/3/';
	var trailer = '';

	factory.getMovies = function(callback){
		$http.get(baseURL + 'movie/now_playing?api_key=' + api_key).success(function(data){
      now_playing_movies = data.results;
			callback(now_playing_movies);
		})
	}

	factory.getTopRatedMovies = function(callback){
		$http.get(baseURL + 'movie/top_rated?api_key=' + api_key).success(function(data){
      top_rated_movies = data.results;
			callback(top_rated_movies);
		})
	}

  factory.getPopularMovies = function(callback){
		$http.get(baseURL + 'movie/popular?api_key=' + api_key).success(function(data){
      popular_movies = data.results;
			callback(popular_movies);
		})
	}

  factory.getUpcomingMovies = function(callback){
		$http.get(baseURL + 'movie/upcoming?api_key=' + api_key).success(function(data){
      upcoming_movies = data.results;
			callback(upcoming_movies);
		})
	}

  factory.getGenres = function(callback){
		$http.get(baseURL + 'genre/movie/list?api_key=' + api_key).success(function(data){
      genres = data.genres;
			callback(genres);
		})
	}

	factory.searchMovies = function (data, callback){
  	console.log('movie search', data.name)
  	$http.get('http://www.omdbapi.com/?s='+ data.name + '&y=&plot=full&r=json').success(function(output){
  		console.log('movies', output)
  		callback(output)
  	})
  }

 	factory.getMovie = function (data, callback){
		console.log('movie search', data.name)
		$http.get('http://www.omdbapi.com/?i='+ data + '&y=&plot=short&r=json').success(function(output){
			console.log('movie', output)
			callback(output)
		})
  }

  factory.setTrailer = function(data){
  	trailer = data
  	console.log('set trailer', data)
  }

  factory.getTrailer = function(callback){
  	callback(trailer)
  }
	return factory;
})
