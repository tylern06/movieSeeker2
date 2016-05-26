myAppModule.controller('moviesController', function ($scope, movieFactory, showtimeFactory, $routeParams, $location){
  $scope.slideInterval = 3000;
  var baseURL = 'http://image.tmdb.org/t/p/w370';
  $scope.noWrapSlides = false;
  $scope.active = 0;
  // var slides = $scope.slides = [];
  $scope.now_playing_slides = [];
  $scope.now_playing_groupslide = [];
  $scope.top_rated_slides = [];
  $scope.top_rated_groupslide = [];
  $scope.popular_slides = [];
  $scope.popular_groupslide = [];
  $scope.upcoming_slides = [];
  $scope.upcoming_groupslide = [];
  $scope.showtimes = [];
  // var currIndex = 0;

  movieFactory.getMovies(function(data){
		$scope.now_playing_movies = data;
		// console.log($scope.now_playing_movies);
    for(var i=0; i<$scope.now_playing_movies.length; i++){
      var slide = {image: baseURL + $scope.now_playing_movies[i].poster_path,
        title: $scope.now_playing_movies[i].title,
        id: $scope.now_playing_movies[i].id
      };
      $scope.now_playing_slides.push(slide);
    }
    var temp = [];
    for(var k=0; k<5; k++){
      for(var j=k*4; j<k*4+4; j++){
        temp.push($scope.now_playing_slides[j]);
      }
      $scope.now_playing_groupslide.push(temp);
      temp = [];
    }
	})

  movieFactory.getTopRatedMovies(function(data){
		$scope.top_rated_movies = data;
		// console.log($scope.top_rated_movies);
    for(var i=0; i<$scope.top_rated_movies.length; i++){
      var slide = {image: baseURL + $scope.top_rated_movies[i].poster_path,
        title: $scope.top_rated_movies[i].title,
        id: $scope.top_rated_movies[i].id
      };
      $scope.top_rated_slides.push(slide);
    }
    var temp = [];
    for(var k=0; k<5; k++){
      for(var j=k*4; j<k*4+4; j++){
        temp.push($scope.top_rated_slides[j]);
      }
      $scope.top_rated_groupslide.push(temp);
      temp = [];
    }
	})

  movieFactory.getPopularMovies(function(data){
		$scope.popular_movies = data;
		// console.log($scope.popular_movies);
    for(var i=0; i<$scope.popular_movies.length; i++){
      var slide = {image: baseURL + $scope.popular_movies[i].poster_path,
        title: $scope.popular_movies[i].title,
        id: $scope.popular_movies[i].id
      };
      $scope.popular_slides.push(slide);
    }
    var temp = [];
    for(var k=0; k<5; k++){
      for(var j=k*4; j<k*4+4; j++){
        temp.push($scope.popular_slides[j]);
      }
      $scope.popular_groupslide.push(temp);
      temp = [];
    }
	})

  movieFactory.getUpcomingMovies(function(data){
		$scope.upcoming_movies = data;
		// console.log($scope.upcoming_movies);
    for(var i=0; i<$scope.upcoming_movies.length; i++){
      var slide = {image: baseURL + $scope.upcoming_movies[i].poster_path,
        title: $scope.upcoming_movies[i].title,
        id: $scope.upcoming_movies[i].id
      };
      $scope.upcoming_slides.push(slide);
    }
    console.log($scope.upcoming_movies);
    var temp = [];
    for(var k=0; k<5; k++){
      for(var j=k*4; j<k*4+4; j++){
        temp.push($scope.upcoming_slides[j]);
      }
      $scope.upcoming_groupslide.push(temp);
      temp = [];
    }
	})

  movieFactory.getGenres(function(data){
		$scope.genres = data;
		// console.log($scope.genres);
	})

  function getShowtimes(){
 		showtimeFactory.getShowtimes(function (data){
 			$scope.showtimes = data;
      console.log($scope.showtimes);
 		})
 	}

  //check if getShowtimes AJAX request has been done intially
	function checkInitialRequest(){
		showtimeFactory.getInitialShowtime(function (status){
			console.log('showtime status', status)
			if(status == false){
				getShowtimes();
			}else{
				//get the saved showtime if AJAX request already been done
				showtimeFactory.getSavedShowtimes(function (showtimes){
					$scope.showtimes = showtimes
					console.log('saved showtimes', showtimes)
				})
			}
		})
	}
	// getShowtimes();
	checkInitialRequest();

  $scope.searchMovies = function(){
		movieFactory.searchMovies($scope.newSearch, function (data){
			$scope.searchMovies = data.Search
			console.log('in search controller', data.search)
			$scope.newSearch = {};
		})
	}

	function getDates(){
		showtimeFactory.getDates(function (dates){
			$scope.dates = dates
		})
	}
	//if theater name exist, set scope.theater
	if($routeParams.name != null ){
		$scope.theater = $routeParams.name
		getDates();
		console.log('theater', $scope.theater)
	}
	//if moviename exist, getMovie
	if($routeParams.id != null){
		movieFactory.getMovie($routeParams.id,function (data){
			$scope.movie = data
			movieFactory.getTrailer(function (output){
				$scope.trailer = output
				console.log('trailer', output)
			})
		})
	}

  $scope.showmovie = function(movie, trailer){
    console.log('im in show movie', movie)
    var imdb_id = movie.slice(movie.length-10, movie.length-1)
    console.log(imdb_id)
    //save trailer in factory to be retrieved from all controllers
    movieFactory.setTrailer(trailer)
    $location.url('/movie/' + imdb_id)
  }

  $scope.updateShowtime = function(newDate){
    console.log('im in updateShowtime')
    console.log('newDate', newDate)
    showtimeFactory.updateShowtime(newDate, function (output){
      console.log('output update', output)
    })

  }

  $scope.searchTheaters = function(){
    console.log('scope new theater', $scope.newTheater)
    showtimeFactory.searchTheaters($scope.newTheater,function (output){
      $scope.showtimes = output
    })
    $scope.newTheater = {};
  }
})
