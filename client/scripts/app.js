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
