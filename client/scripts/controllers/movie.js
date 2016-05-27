myAppModule.controller('movieController', function ($scope, movieFactory, reviewFactory, userFactory, $routeParams, $location, $timeout){
  console.log('route param:', $routeParams);
  if($routeParams.id.substring(0, 2) == 'tt'){
    console.log('using imdb_id');
    movieFactory.showMovie($routeParams.id, function(movie_info, videos, reviews, omdb){
      $scope.movie = angular.extend(movie_info, videos);
      $scope.movie = angular.extend($scope.movie, omdb);
      $scope.reviews = reviews;
      console.log($scope.movie);
      console.log($scope.reviews);
      reviewFactory.getReviews($scope.movie.imdbID, function(data){
        $scope.our_reviews = data;
      })
    })
  } else {
    console.log('using tmdb_id');
    movieFactory.getMovie($routeParams.id, function(movie_info, videos, reviews, omdb){
      $scope.movie = angular.extend(movie_info, videos);
      $scope.movie = angular.extend($scope.movie, omdb);
      $scope.reviews = reviews;
      console.log($scope.movie);
      console.log($scope.reviews);
      reviewFactory.getReviews($scope.movie.imdbID, function(data){
        $scope.our_reviews = data;
      })
    })
  }

  $scope.$on('onRepeatLast', function(scope, element, attrs){
    $(document).ready(function(){
  		$('a.youtube').YouTubePopup({hideTitleBar:true, showBorder:false, overlayOpacity:0.95, width:900, height:506});
  	});
  });

	$scope.addReview = function(imdbID){
    console.log(imdbID);
    userFactory.getSession(function(info){
      $scope.user = info;
      if($scope.user._id == null || typeof $scope.user._id === 'undefined'){
        console.log('Please log in first');
      } else {
        // console.log(user_id)
        // var user_id = $scope.user._id
        // var review = $scope.new_review.content
        // var imdbID = imdbID;
    		reviewFactory.addReview($scope.new_review.content, imdbID, $scope.user._id, function (data){
          reviewFactory.getReviews(imdbID, function(data){
        		$scope.our_reviews = data;
            console.log($scope.our_reviews);
        	})
    		})
    		$scope.new_review = {};
      }
    })
    // var user_id = $scope.user._id;
    // console.log(user_id, newReview);
	}
})
