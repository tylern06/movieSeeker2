var Showtimes = require('showtimes');
var moment = require('moment');
var now = moment().format('LL')

console.log('now', now)
// console.log('now', now._d.format('LLL'))
module.exports = {
	index: function(req,res){
		var api = new Showtimes({latitude: req.latitude, longitude: req.longitude}, {date: '0'});
		api.getTheaters(function (error, theaters) {
			if (error) {
				throw error
			}
				res.json(theaters);
			});
	},
	search: function(req,res){
		console.log('address', req.body)
		var api = new Showtimes(req.body.address, {date: '0'});
		api.getTheaters(function (error, theaters) {
			if (error) {
				throw error
			}
				res.json(theaters);
		});
	},
	update: function(req,res){
		console.log('in update', req.body)
		// diff = req.body.date.date - now
		// console.log('diff', diff)
		// var api = new Showtimes({latitude: req.latitude, longitude: req.longitude}, {date: '0'});
		// api.getTheaters(function (error, theaters) {
		// 	if (error) {
		// 		throw error
		// 	}
		// 		res.json(theaters);
		// 	});
	}
}
