var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
//instantiate Topic model
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var errors = []

module.exports = {
	index: function(req, res){
		Reivew.find({})
				  .deepPopulate('_user')
				  .exec(function(err, reviews){
				 	res.json(reviews)
				})
	},
	create: function(req, res){
		console.log('create review req.body', req.body)
		User.findOne({_id: req.body.user_id}, function (err, user){
			var review = new Review({review: req.body.review, _user: req.body.user_id})
			review.save(function(err){
				if(err){
					console.log('something went wrong', err)
					res.json({status: false, errors: err})
				} else {
					user.reviews.push(review._id)
					user.save(function (err){
						if(err){
							console.log('user err in review', err)
							res.json({status: false, errors: err})
						} else {
              Reivew.find({})
          				  .deepPopulate('_user')
          				  .exec(function(err, reviews){
          				 	res.json(reviews)
          				})
						}
					})//end of user save
			  }
			});//end of topic save
		})
	}
}
