myAppModule.factory('userFactory', function($http){
	var users = [];
	var factory = {};
	var sessionUser = {loggedIn: false};

	factory.getUsers = function(callback){
		$http.get('/users').success(function(data){
			users = data;
			callback(users);
		})
	}

	factory.getUser = function(data, callback){
		console.log('user data entered', data);
		$http.post('/users/', data).success(function(output){
			$http.get('/session_user').success(function(session){
				callback(session)
			})
		})
	}

	factory.addUser = function(data, callback){
		// console.log(data);
		$http.post('/create_user', data).success(function(user){
			sessionUser = {message: 'user successfully added', user: user};
			callback(sessionUser);
		})
	}

	factory.getSession = function(callback){
		$http.get('/session_user').success(function(session){
			callback(session)
		})
	}

	factory.setSession = function(data){
		// sessionUser = {loggedIn: true, name: data.name, user_id: data._id}
		data.loggedIn = true;
		sessionUser = data
		console.log('sessionUser in set user', sessionUser)
	}

	factory.logout = function(callback){
    $http.get('/logout').success(function(data){
      if(data.status){
        sessionUser = data.sessionUser
      }
      callback(data)
    })
  }
	return factory;
})
