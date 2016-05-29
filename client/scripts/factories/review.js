myAppModule.factory('reviewFactory', function($http){
  var reviews = [];
  var factory = {};

  factory.getReviews = function(imdbID, callback) {
    console.log(imdbID);
    $http.get('/reviews/' + imdbID).success(function(data) {
      // console.log('Data received successfully');
      reviews = data;
      callback(reviews);
    })
  }

  factory.addReview = function(new_review, imdbID, user_id, callback){
    console.log('I am in reviewFactory front-end side');
    var newData = {review: new_review, imdbID: imdbID, creator: user_id};
    console.log(newData);
    $http.post('/create_review/', newData).success(function(review){
      $http.get('/reviews/' + imdbID).success(function(data) {
        reviews = data;
        callback(reviews);
      })
    });
  }
  return factory;
});
