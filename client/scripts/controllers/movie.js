myAppModule.controller('movieController', function ($scope, movieFactory, $routeParams, $location, $timeout){
  console.log('route param:', $routeParams);
  if($routeParams.id.substring(0, 2) == 'tt'){
    console.log('using imdb_id');
    movieFactory.showMovie($routeParams.id, function(movie_info, videos, reviews, omdb){
      $scope.movie = angular.extend(movie_info, videos);
      $scope.movie = angular.extend($scope.movie, omdb);
      $scope.reviews = reviews;
      console.log($scope.movie);
      console.log($scope.reviews);
    })
  } else {
    console.log('using tmdb_id');
    movieFactory.getMovie($routeParams.id, function(movie_info, videos, reviews, omdb){
      $scope.movie = angular.extend(movie_info, videos);
      $scope.movie = angular.extend($scope.movie, omdb);
      $scope.reviews = reviews;
      console.log($scope.movie);
      console.log($scope.reviews);
    })
  }

  $scope.$on('onRepeatLast', function(scope, element, attrs){
    $(document).ready(function(){
  		$('a.youtube').YouTubePopup({hideTitleBar:true, showBorder:false, overlayOpacity:0.95, width:900, height:506});
  	});
  });
})
