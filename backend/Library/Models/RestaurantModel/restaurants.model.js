const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var restaurantsSchema = new Schema({
	rest_name: { type: String, unique: true, required: true },
	rest_description: { type: String, unique: false, required: false },
	rest_address: { type: String, unique: false, required: false },
	rest_phone: { type: String, unique: false, required: false },
	rest_category: { type: String, unique: false, required: false },
	rest_quality: { type: Number, unique: false, required: false },
	rest_image1: {data: Buffer, contentType: String}, 
	rest_image2: {data: Buffer, contentType: String}, 
	rest_workinghours: { type: String, unique: false, required: false },
	rest_comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
})

restaurantsSchema.methods.saveComment = async function (commentId) {
	this.rest_comments.push(commentId);
	let restaurant = await this.save();
	return restaurant;
}

restaurantsSchema.methods.deleteComment = async function (commentId) {
	this.rest_comments.pull(commentId);
	let restaurant = await this.save();
	return restaurant;
}

module.exports = mongoose.model('Restaurant', restaurantsSchema);