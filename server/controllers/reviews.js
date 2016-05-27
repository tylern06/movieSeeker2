var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
//instantiate Topic model
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var errors = []

module.exports = {
	index: function(req, res){
    console.log('imdbID:', req.params.imdbID);
		Review.find({imdbID: req.params.imdbID})
				  .deepPopulate('_creator')
				  .exec(function(err, reviews){
				 	res.json(reviews)
				})
	},
	create: function(req, res){
		console.log('create review req.body', req.body)
    console.log('review: ',req.body.review)
    console.log('imdbID: ',req.body.imdbID)
    console.log('_creator: ',req.body.creator)
		User.findOne({_id: req.body.creator}, function (err, user){
      if(err){
        console.log(err);
      } else {
        var review = new Review({review: req.body.review, imdbID: req.body.imdbID, _creator: req.body.creator})
  			review.save(function(err, review){
  				if(err){
  					console.log('something went wrong', err)
  					res.json({status: false, errors: err})
  				} else {
            console.log('review saved', review);
            console.log('user info', user);
  					user.reviews.push(review._id)
  					user.save(function (err){
  						if(err){
  							console.log('user err in review', err)
  							res.json({status: false, errors: err})
  						} else {
                Review.find({})
            				  .deepPopulate('_creator')
            				  .exec(function(err, reviews){
            				 	res.json(reviews)
            				})
  						}
  					})//end of user save
  			  }
  			});//end of review save
      }
		})
	}
}
