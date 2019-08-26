let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let feedbackSchema = new Schema({
	name : {type:String, required:true},
	message : {type:String, required:true},
	type : {type:String, required:true},
	status : {type:String, required:true},
	//createdAt: {type:Date, default:new Date()}
},
{ timestamps: true }
);

module.exports = mongoose.model('feedback', feedbackSchema);