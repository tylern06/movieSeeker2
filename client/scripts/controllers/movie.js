myAppModule.controller('movieController', function ($scope, movieFactory, $routeParams, $location){
  console.log('route param:', $routeParams);
  movieFactory.getMovie($routeParams.id, function(movie_info, videos, reviews, omdb){
    $scope.movie = angular.extend(movie_info, videos);
    $scope.movie = angular.extend($scope.movie, omdb);
    $scope.reviews = reviews;
    console.log($scope.movie);
    console.log($scope.reviews);
  })
})
