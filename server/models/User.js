var mongoose = require('mongoose');
//create user shema
var UserSchema = new mongoose.Schema({
	name: {type: String},
	email: {type: String, unique: true},
	password: {type: String},
	//User has many reivews and favorites
	reviews: [ {type: mongoose.Schema.Types.ObjectId, ref:'Review'} ],
	favorites: [ {type: mongoose.Schema.Types.ObjectId, ref:'Favorite'} ]
	},
	{
		timestamps: true
	})

UserSchema.path("name").required(true, "Name cannot be blank");

mongoose.model("User", UserSchema);
