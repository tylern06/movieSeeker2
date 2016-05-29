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
	.when('/movie_search/:page_num',{
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

//filter for pagination
myAppModule.filter('pagination', function() {
  return function(input, start) {
    if (!input || !input.length) { return; }
    start = +start; //parse to int
    return input.slice(start);
  }
});

myAppModule.directive('onLastRepeat', function() {
  return function(scope, element, attrs) {
    if (scope.$last) setTimeout(function(){
        scope.$emit('onRepeatLast', element, attrs);
    }, 1);
  };
})
