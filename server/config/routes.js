var mongoose = require('mongoose');
//go back up 2 folders and to controllers/cats rotues
var users = require('../controllers/users.js')
var reviews = require('../controllers/reviews.js')
var favorites = require('../controllers/favorites.js')
var showtimes = require('../controllers/showtimes.js')
var movies = require('../controllers/movies.js')

module.exports = function(app){
	//display all users
	app.get('/users', function (req, res){
	  users.index(req, res);
	})
	app.post('/users/', function (req, res){
		// console.log(req.body);
		users.find(req, res);
	})
	app.post('/create_user', function (req, res){
		users.create(req, res);
	})
	app.get('/session_user', function (req, res){
	  users.getSession(req, res);
	})
	app.get('/logout', function (req, res){
	  users.logout(req, res);
	})

	app.post('/showtimes', function(req, res){
		showtimes.index(req, res);
	})
	app.post('/showtimes/search', function(req, res){
		showtimes.search(req, res);
	})
	app.post('/showtimes/update', function(req, res){
		// console.log('routes new Date', req.body)
		showtimes.update(req, res);
	})

	app.get('/reviews/:imdbID', function (req, res){
	  reviews.index(req,res);
	})
	app.post('/create_review', function (req, res){
		console.log('req.body reviews', req.body)
		reviews.create(req,res);
	})
	// app.get('/topics/:id', function(req,res){
	// 	console.log('req params in topic',req.params)
	// 	topics.show(req,res);
	// })
	// app.post('/posts', function(req,res){
	// 	console.log('req.body add post', req.body)
	// 	posts.create(req,res);
	// })
	// app.post('/comments', function(req,res){
	// 	console.log('req.body add comment', req.body)
	// 	comments.create(req,res);
	// })
	//
	// app.get('/posts/:id/like', function(req,res){
	// 	console.log('im in post lies', req.params.id)
	// 	posts.like(req,res);
	// })
	// app.post('/posts/:id/dislike', function(req,res){
	// 	posts.dislike(req,res);
	// })
}
