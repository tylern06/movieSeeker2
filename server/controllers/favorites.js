// var mongoose = require('mongoose');
//
// var Post = mongoose.model('Post');
// var Topic = mongoose.model('Topic');
// var User = mongoose.model('User');
//
// module.exports = {
// 	index: function(req,res){
// 		Post.find({}, function(err,posts){
// 			res.json(posts)
// 		});
// 	},
// 	create: function(req,res){
// 		Topic.findOne({_id: req.body.topic_id}, function (err,topic){
// 			var post = new Post({
// 				post: req.body.post,
// 				_creator: req.body.creator_id,
// 				_topic: req.body.topic_id
// 			})
// 			post.save(function (post_err){
// 				if(post_err){
// 					errors = []
// 					for(var x in post_err.errors){
// 						errors.push(post_err.errors[x].message)
// 					}
// 					res.json({status:false, errors: errors})
// 				}else{
// 					console.log('post saved successfully')
// 					topic.posts.push(post._id)
// 					topic.save(function (topic_err){
// 						if(topic_err){
// 							res.json({status:false, error: topic_err})
// 						}else{
// 							User.findOne({_id:req.body.creator_id}, function (user_err, user){
// 								if(user_err){
// 									res.json({status:false, errors: user_err})
// 								}else{
// 									user.posts.push(post._id)
// 									user.save(function (err){
// 										if(err){
// 											res.json({status:false, errors:err})
// 										}else{
// 											console.log('saved user and post')
// 											res.json({status:true})
// 										}
// 									})
// 								}
// 							})
// 						}
// 					})
// 				}
// 			})
// 		})
// 	},
// 	like: function(req,res){
// 		Post.update({_id: req.params.id}, {$inc: {like: 1}}, function(err, post){
// 			console.log('post like in controller',post)
// 			res.json(post)
// 		})
// 	},
// 	dislike: function(req,res){
// 		Post.update({_id: req.params.id}, {$inc: {dislike: 1}}, function(err, post){
// 			console.log('post dislike in controller',post)
// 			res.json(post)
// 		})
// 	}
// }
//
//
//
//
//
//
//
//
//
//
