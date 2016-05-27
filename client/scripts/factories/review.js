myAppModule.factory('reviewFactory', function($http){
  var reviews = [];
  var factory = {};

  factory.index = function(callback) {
    $http.get('/reviews').success(function(data) {
      // console.log('Data received successfully');
      reviews = data;
      callback(reviews);
    })
  }
  factory.addReview = function(user_id, newReview, callback){
    console.log(user_id, newReview);
    console.log('I am in reviewFactory front-end side');
    $http.post('/create_review/', user_id, newReview).success(function(topic){
      $http.get('/reviews').success(function(data) {
        reviews = data;
        callback(reviews);
      })
    });
  }
  return factory;
});
