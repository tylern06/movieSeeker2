myAppModule.controller('topicsController', function ($scope, topicFactory, userFactory, postFactory, commentFactory, $location, $routeParams){
 	function getSession(){
 		userFactory.getSession(function(data){
 			$scope.sessionUser = data;
 			if($scope.sessionUser.loggedIn == false){
 				$location.url('/')
 			}
 		})
 	}
	function getTopics(){
		topicFactory.getTopics(function(data){
			// console.log('get topics ', data)
			$scope.topics = data;
		})
	}

 	function getCategories(){
		topicFactory.getCategories(function(data){
			$scope.categories = data;
			// console.log('categories',data)
		})
 	}

 	function getTopic(){
 		console.log('topic id', $routeParams.id)
 		topicFactory.getTopic($routeParams.id, function(data){
 			$scope.topic = data
 			console.log("$scope topic", data)
 		})
 	}
 	//get topic if $routeParams.id exist
  if ($routeParams.id != null){
		getTopic()
	}

	//get current sesson user
	getSession()
	//get all categories
 	getCategories()
 	//get all topics
	getTopics()

	$scope.addTopic = function(user_id){
		$scope.newTopic.user_id = user_id
		console.log('scope user id ', $scope.newTopic.user_id)
		// console.log('topic new',$scope.newTopic)
		topicFactory.addTopic($scope.newTopic,function (data){
			console.log('data in add topic', data)
			//getTopics need be invoked after addTopic
			getTopics();
		})
		getSession()
		$scope.newTopic = {};
	}

	$scope.addPost = function (topic_id){
		$scope.newPost.topic_id = topic_id
		$scope.newPost.creator_id = $scope.sessionUser._id
		console.log('in add post of topics')
		postFactory.addPost($scope.newPost,topic_id, function (topic_data){
			//run callback function to update topic with new post
			$scope.topic = topic_data
 		})
		$scope.newPost = {};
	}
  
	$scope.addComment = function (post_id,topic_id,newComment){
		console.log('post id', post_id)
		newComment.post_id = post_id
		newComment.topic_id = topic_id
		newComment.creator_id = $scope.sessionUser._id
		console.log('in add comment of topics', newComment)
		commentFactory.addComment(newComment,function (topic_data){
			$scope.topic = topic_data
 		})
	
	}

	$scope.like = function(post_id, topic_id, creator_id){
		console.log("like post_id", post_id)
		if(creator_id != $scope.sessionUser._id){
			postFactory.like(post_id, topic_id, function (data){
				console.log('data from postFactory output', data)
				$scope.topic = data
			})
		}
	}

	$scope.dislike = function(post_id, topic_id){
		console.log("dislike post_id", post_id)
		postFactory.dislike(post_id,topic_id, function (data){
			console.log('data from postFactory output', data)
			$scope.topic = data
		})
	}

	$scope.logout = function(){
		userFactory.clearSession()
		$location.url('/')
	}

})

