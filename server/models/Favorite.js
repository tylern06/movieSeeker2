var mongoose = require('mongoose')
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var FavoriteSchema = new mongoose.Schema({
	imdbID: {type: String, required: true},
	//Post belongs to a user and topic
	_creator: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
	},
	{
		timestamps: true
	})

var Favorite = mongoose.model("Favorite", FavoriteSchema);

FavoriteSchema.plugin(deepPopulate);
