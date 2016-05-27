myAppModule.controller('usersController', function ($scope, userFactory, $routeParams, $location){
	userFactory.getUsers(function(data){
		$scope.users = data;
		console.log("scope users:", $scope.users);
	})

	userFactory.getSession(function(data){
		$scope.sessionUser = data;
		console.log("user session data:", $scope.sessionUser);
	})

	$scope.logIn = function(user) {
		// console.log(user);
		userFactory.getUser(user, function(data){
			// console.log('user login data:', data);
			if(data.status == false){
				$scope.errors = data.errors
			} else {
				userFactory.getSession(function(data){
					$scope.sessionUser = data;
					// console.log("user session data:", $scope.sessionUser);
				})
			}
		})
	}

	$scope.addUser = function(new_user) {
		console.log(new_user);
		if(new_user.pw1 == new_user.pw2){
			userFactory.addUser(new_user, function(data){
				$scope.sessionUser = data.user.sessionUser;
				$scope.signup_error = {};
				console.log($scope.sessionUser);
			})
		}
		else {
			$scope.signup_error = {message: 'Your password and confirm password must match.'}
			console.log($scope.signup_error.message);
		}
	}

	$scope.logout = function(){
    userFactory.logout(function(info){
			// console.log(info.sessionUser.loggedIn);
      if(!info.sessionUser.loggedIn){
        $scope.sessionUser = info.sessionUser
				$scope.logout_error = {};
        $location.url('/')
      }
      else {
        $scope.logout_error = {message: 'logout failed'};
				console.log($scope.logout_error);
      }
    })
  };
})
