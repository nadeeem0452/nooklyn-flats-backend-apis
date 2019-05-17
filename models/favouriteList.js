const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const favouriteSchema = new Schema({
		
		favourite: { type: String }
		
		userId: { type:String, required: false },
		
		agentId:{ type: String, required: false },
				
      createdDate: { type: Date, default: Date.now }

});

favouriteSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('favouriteList', favouriteSchema);


