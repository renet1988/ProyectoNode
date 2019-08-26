let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var userSchema = new Schema( {
	user: {
		type: String,
		unique: false,
		required: true,
	},
	email: {
		type: String,
		unique: false,
		required: false,
	}
});

module.exports = mongoose.model('user', userSchema);