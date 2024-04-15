const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	
	},
	instagram: {
		type: String,
       
	},
	facebook: {
		type: String,
		default:"https://www.facebook.com/",
	
	},
	address: {
		type: String,
		required: true,
	
	},
	imgUrl: {
		type: String,

	},

});

module.exports = mongoose.model("User", userSchema);
