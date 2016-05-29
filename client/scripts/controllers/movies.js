myAppModule.controller('moviesController', function ($scope, movieFactory, showtimeFactory, newsFactory, $routeParams, $location){
  $scope.slideInterval = 5000;
  var baseURL = 'http://image.tmdb.org/t/p/w370';
  var genres = [];
  var page = 1;
  var keyword = '';
  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.now_playing_slides = [];
  $scope.now_playing_groupslide = [];
  $scope.top_rated_slides = [];
  $scope.top_rated_groupslide = [];
  $scope.popular_slides = [];
  $scope.popular_groupslide = [];
  $scope.upcoming_slides = [];
  $scope.upcoming_groupslide = [];
  $scope.showtimes = [];

  function genresToString(arr){
    console.log(arr.length);
    for(var i=0; i<arr.length; i++){
      // console.log(arr[i].genre_ids);
      for(key in arr[i].genre_ids){
        var temp = arr[i].genre_ids[key];
        // console.log(temp);
        for(index in genres){
          if(genres[index].id == temp){
            // console.log(genres[index].name)
            arr[i].genre_ids[key] = {
              id: genres[index].id,
              name: genres[index].name
            }
          }
        }
      }
    }
    return arr;
  }

  movieFactory.getGenres(function(data){
    genres = data;
    $scope.genres = genres;
    // console.log('genres', genres);
  })

  movieFactory.getMovies(function(data){
    $scope.now_playing_movies = data;
    // console.log($scope.now_playing_movies);
    // genresToString($scope.now_playing_movies);
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
    // console.log($scope.now_playing_groupslide);
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
    // console.log($scope.upcoming_movies);
    var temp = [];
    for(var k=0; k<5; k++){
      for(var j=k*4; j<k*4+4; j++){
        temp.push($scope.upcoming_slides[j]);
      }
      $scope.upcoming_groupslide.push(temp);
      temp = [];
    }
  })

  function getShowtimes(){
    showtimeFactory.getShowtimes(function (data){
      $scope.showtimes = data
    })
  }

  //check if getShowtimes AJAX request has been done intially
  function checkInitialRequest(){
    showtimeFactory.getInitialShowtime(function (status){
      // console.log('showtime status', status)
      if(status == false){
        getShowtimes();
      }else{
        //get the saved showtime if AJAX request already been done
        showtimeFactory.getSavedShowtimes(function (showtimes){
          $scope.showtimes = showtimes
          // console.log('saved showtimes', showtimes)
        })
      }
    })
  }

  function getNews(){
    newsFactory.getNews(function (data){
      $scope.news = data.results
      // console.log('news in controller', data)
    })
  }
  checkInitialRequest();
  getNews();

  $scope.searchMovies = function(){
    console.log($scope.search);
    if($scope.search != null){
      movieFactory.searchMovies($scope.search, function (data){
        $scope.searched_movies = data
        searched_movies = genresToString($scope.searched_movies);
        console.log('in controller', $scope.searched_movies)
        console.log($scope.searched_movies.length)
        $scope.keyword = $scope.search;
        $scope.search = {};
      })
      $location.url('/movie_search');
    }
  }

  function getDates(){
    showtimeFactory.getDates(function (dates){
      $scope.dates = dates
    })
  }

  function gDate(){
    movieFactory.gDate(function (date){
      $scope.date = date
    })
  }
  //if theater name exist, set scope.theater
  if($routeParams.name != null ){
    $scope.theater = $routeParams.name
    getDates();
    gDate();
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

  $scope.getMovie = function(id){
      $location.url('/movie/' + id);
  }

  $scope.showMovie = function(imdbURL){
    console.log(imdbURL)
    var imdb_id = imdbURL.slice(imdbURL.length-10, imdbURL.length-1);
    console.log(imdb_id)
    $location.url('/movie/' + imdb_id);
  }

  $scope.updateShowtime = function(newDate){
    console.log('im in updateShowtime')
    console.log('newDate', newDate)
    showtimeFactory.updateShowtime(newDate, function (output){
      console.log('output update', output)
      $scope.showtimes = output
      movieFactory.sDate(newDate.date.date)
      gDate();
    })
  }

  $scope.searchTheaters = function(){
    console.log('scope new theater', $scope.newTheater)
    showtimeFactory.searchTheaters($scope.newTheater,function (output){
      $scope.showtimes = output
    })
    $scope.newTheater = {};
  }

  $scope.curPage = 0;
  $scope.pageSize = 8;

  $scope.numberOfPages = function() {
    return Math.ceil($scope.news.length / $scope.pageSize);
  };

  $scope.curPage2 = 0;
  $scope.pageSize2 = 10;

  $scope.numberOfPages2 = function() {
    return Math.ceil($scope.showtimes.length / $scope.pageSize2);
  };
})
