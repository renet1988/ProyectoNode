const mongoose =require( "mongoose");
const Schema = mongoose.Schema;

var commentsSchema = new Schema({
    comm_comment: { 
	type:String, 
	unique:false, 
	required:true, 
	}, 	
	comm_user: {
        type: Schema.ObjectId,
        ref: 'User'
    }, 	
	comm_date: { 
	type:Date, 
	unique:false, 
	required:false, 
	},
	comm_restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.model('Comment', commentsSchema);