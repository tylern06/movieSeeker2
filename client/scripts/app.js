//import angular module
var	myAppModule = angular.module('myApp', ['ngRoute','angularMoment', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
myAppModule.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/dashboard.html'
	})
	.when('/movie/:id',{
		templateUrl: 'partials/movie.html'
	})
	.when('/movie_search',{
		templateUrl: 'partials/movie_search.html'
	})
	.when('/showtime/:id',{
		templateUrl: 'partials/showtime.html'
	})
	.when('/theater/:name', {
 		templateUrl: 'partials/theater.html'
 	})
	.when('/users/:id',{
		templateUrl: 'partials/users.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

myAppModule.filter("myFilter", function(){
	// In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, optional1, optional2) {
    var output;
    // Do filter work here
    return output;
  }
});
