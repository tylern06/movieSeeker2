// var mongoose = require('mongoose');
// var deepPopulate = require('mongoose-deep-populate')(mongoose);
// //instantiate Topic model
// var Topic = mongoose.model('Topic');
// var User = mongoose.model('User');
// var errors = []
//
// module.exports = {
// 	index: function(req, res){
// 		Topic.find({})
// 				 .deepPopulate("_creator")
// 				 .exec(function(err, topics){
// 				 	// console.log('all topics', topics)
// 				 	res.json(topics)
// 				 })
// 	},
// 	create: function(req,res){
// 		console.log('create topic req.body', req.body)
// 		User.findOne({_id: req.body.user_id}, function (err, user){
// 			var topic = new Topic({
// 			topic: req.body.topic,
// 			description: req.body.description,
// 			category: req.body.category.name,
// 			_creator: req.body.user_id
// 		})
// 			topic.save(function (topic_err){
// 				if(topic_err){
// 					errors = []
// 					console.log('something went wrong')
// 					for (var x in topic_err.errors){
// 						errors.push(topic_err.errors[x].message)
// 					}
// 					// console.log('errors in create', errors)
// 					res.json({status: false, errors: errors})
// 				} else {
// 						console.log('successfully added topic')
// 						console.log('topic saved', topic)
// 						//push the users associated topic ref
// 						user.topics.push(topic._id)
// 						user.save(function (err){
// 							if(err){
// 								console.log('user err in topic', err)
// 								res.json({status: false, errors: err})
// 							}else{
// 								res.json({status: true})
// 							}
// 						})//end of user save
// 				  }
// 			});//end of topic save
// 		})
// 	},
// 	show: function(req,res){
// 		Topic.findOne({_id: req.params.id})
// 				//populate creator id with the assocated object
// 				 .deepPopulate('_creator posts posts._creator posts.comments posts.comments._creator posts.commments.comment ')
// 				 .exec(function(err,topic){
// 				 	if(err){
// 				 		console.log(err);
// 				 		res.json(err.errors)
// 				 	} else{
// 				 		console.log('topic in show controller', topic)
// 				 		console.log('the creater of topic is ', topic._creator.name)
// 				 		res.json(topic)
// 				 	}
// 				})
// 	}
// 	// destroy: function(req,res){
// 	// 	console.log('req.params.id in destroy', req.params.id)
// 	// 	product.remove({_id: req.params.id},function(err,customer){
// 	// 		console.log('customer in destroy', customer)
// 	// 		res.redirect('/')
// 	// 	})
// 	// }
// }
