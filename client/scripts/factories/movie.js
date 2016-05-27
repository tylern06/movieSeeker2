myAppModule.factory('movieFactory', function($http){
	var now_playing_movies = [];
  var top_rated_movies = [];
  var popular_movies = [];
  var upcoming_movies = [];
	var searched_movies = [];
  var genres = [];
	var factory = {};
  var api_key = 'c3542f2b9e2c9ad8b6ca61aee72c814b';
  var baseURL = 'https://api.themoviedb.org/3/';
	var trailer = '';
	var date = moment().format('LL')
	console.log('date in movieFactory', date)

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

	factory.searchMovies = function(search, callback){
  	$http.get(baseURL + 'search/movie?api_key=' + api_key + '&query=' + search.keyword).success(function(output){
  		// console.log('movies', output)
			searched_movies = output.results;
			if(output.total_pages > 1) {
				for(var i=2; i<=output.total_pages; i++){
					$http.get(baseURL + 'search/movie?api_key=' + api_key + '&query=' + search.keyword + '&page=' + i).success(function(output){
						searched_movies.push.apply(searched_movies, output.results);
					})
				}
			}
  		callback(searched_movies)
  	})
  }

 	factory.getMovie = function(id, callback){
		$http.get(baseURL + 'movie/' + id + '?api_key=' + api_key).success(function(movie_info){
			$http.get(baseURL + 'movie/' + id + '/videos?api_key=' + api_key).success(function(videos){
				$http.get(baseURL + 'movie/' + id + '/reviews?api_key=' + api_key).success(function(reviews){
					console.log(reviews);
					$http.get('http://www.omdbapi.com/?i=' + movie_info.imdb_id + '&plot=short&r=json').success(function(omdb){
						callback(movie_info, videos, reviews, omdb)
					})
				})
			});
		})
  }

  factory.gDate = function(callback){
  	callback(date)
  }
  factory.sDate = function(data){
		date = data
		console.log('set date', data)
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
