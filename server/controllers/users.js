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
		console.log(req.body);
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.json(err)
			} else {
				if(user.password == req.body.password){
					sessionUser = {
						loggedIn : true,
						name : user.name,
						_id : user._id
					}
				} else {
          console.log('log in failed');
        }
        // console.log(user.password, req.body.password);
				// console.log(sessionUser);
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
	}
}
