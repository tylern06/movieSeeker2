var mongoose = require('mongoose');
//instantiate customer model
var User = mongoose.model('User');
var errors = []
sessionUser = {loggedIn: false};

module.exports = {
	index: function(req, res){
		User.find({}, function(err, users){
			if(err){
				console.log(err);
			} else {
				console.log(users);
				res.json(users);
			}
		});
	},
	create: function(req, res){
		console.log(req.body)
		var user = new User({name: req.body.name, email: req.body.email, password: req.body.pw1})
		console.log(user);
		user.save(function(err){
			console.log('err in create', err)
			if(err){
				errors = []
				console.log('something went wrong')
				for (var x in err.errors){
					errors.push(err.errors[x].message)
				}
				// console.log('errors in create', errors)
				res.json({status: false, errors: errors})
			} else {
				sessionUser = {
					loggedIn : true,
					name : user.name,
					_id : user._id
				}
				console.log('successfully registered and logged in!');
				res.json({status: true, sessionUser: sessionUser});
			}
		});
	},
	find: function(req,res){
		console.log(req.params.email);
		User.findOne({email: req.params.email}, function(err, user){
			if(err){
				res.json(err)
			} else {
				sessionUser = {
					loggedIn : true,
					name : user.name,
					_id : user._id
				}
				console.log(sessionUser);
				res.json(user);
			}
		})
	},
	getSession: function(req,res){
		res.json(sessionUser);
	},
	logout: function(req, res){
    sessionUser = {loggedIn: false}
    res.json({status: true, sessionUser: sessionUser})
	// destroy: function(req,res){
	// 	console.log('req.params.id in destroy', req.params.id)
	// 	User.remove({_id: req.params.id},function(err,customer){
	// 		console.log('customer in destroy', customer)
	// 		res.redirect('/')
	// 	})
	}
}
