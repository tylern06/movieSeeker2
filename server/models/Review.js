var mongoose = require('mongoose')
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var ReviewSchema = new mongoose.Schema({
	review: {type: String, required: true},
	imdbID: {type: String, required: true},
	//Reviews belongs to a user
	_creator: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
	},
	{
		timestamps: true
	})

ReviewSchema.path('review').required(true, "Review cannot be blank")
ReviewSchema.path('imdbID').required(true, "imdbID cannot be blank")
ReviewSchema.path('_creator').required(true, "Creator's ID cannot be blank")
var Review = mongoose.model("Review", ReviewSchema);

ReviewSchema.plugin(deepPopulate);
