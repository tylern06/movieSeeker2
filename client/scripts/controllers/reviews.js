myAppModule.controller('reviewsController', function ($scope, reviewFactory, userFactory){
	reviewFactory.index(function(data){
		$scope.reviews = data;
	})

  userFactory.getSession(function(info){
    $scope.user = info
    // console.log($scope.user);
    if($scope.user.loggedIn == false){
      console.log('User not logged in!');
    }
    else {
      console.log('User logged in', $scope.user)
    }
  });

	$scope.addReview = function(newReview){
    var user_id = $scope.user._id;
    // console.log(user_id, newReview);
    if(user_id == null || typeof user_id === 'undefined'){
      console.log('Please log in first');
    } else {
      // console.log(user_id)
      var newData = [{user_id: user_id}, {review: newReview}]
      console.log(newData);
  		reviewFactory.addReview(newData, function (data){
        reviewFactory.index(function(data){
      		$scope.reviews = data;
      	})
  		})
  		$scope.new_review = {};
    }
	}
})
