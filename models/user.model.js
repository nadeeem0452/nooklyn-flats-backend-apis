const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('_helpers/role');


const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
	questionsNecessary: { type: String, required: false },
    interestedRoommate: { type: String, required: false },
	 questions: {
		
		LookingRoommate:{
		 Quiet: { type: Boolean, required: false },
		 Loud: { type: Boolean, required: false },
		 Tidy: { type: Boolean, required: false },
		 Messy: { type: Boolean, required: false }
		},
		
		LookingInRoommates:{
		 Quiet: { type: Boolean, required: false },
		 Loud: { type: Boolean, required: false },
		 Tidy: { type: Boolean, required: false },
		 Messy: { type: Boolean, required: false }
		},
		
		typeofperson:{
			Quiet: { type: Boolean, required: false },
		 Loud: { type: Boolean, required: false },
		 Tidy: { type: Boolean, required: false },
		 Messy: { type: Boolean, required: false }
		},
		
		DoYouDrink:{
		 Yes: { type: Boolean, required: false },
		 No: { type: Boolean, required: false }
		},
		
		DoYouSmoke:{
		 Yes: { type: Boolean, required: false },
		 No: { type: Boolean, required: false },
		},
		
		LikeGoOut:{
		 Yes: { type: Boolean, required: false },
		 No: { type: Boolean, required: false }
		},
		
		Workhours:{
		 FullTime: { type: Boolean, required: false },
		 PartTime: { type: Boolean, required: false }, 
		 StudentFullTime: { type: Boolean, required: false },
		 StudentPartTime: { type: Boolean, required: false }
		},
		BedTime:{
		 time1: { type: Boolean, required: false },
		 time2: { type: Boolean, required: false },
		 time3: { type: Boolean, required: false }
		},
		RelationshipStatus:{
			Single: { type: Boolean, required: false },
			onRelationship: { type: Boolean, required: false },
			Married: { type: Boolean, required: false }
			
		},
		
		
	},  
	
	Images:{
		
		
				ProfileImage:{
				imageName: { type: String, required: false  },
				imageData: { type: 'Buffer',
					 required: false ,
					 data: [  104, 101, 108, 108, 111, 32, 98, 117, 102, 102, 101, 114  ] 

					}

				},
				CoverImage:{
				   imageName: { type: String, required: false  },
					imageData: { type: 'Buffer',
					 required: false ,
					 data: [  101, 114, 32, 101, 111, 117, 98, 104, 109, 108, 107, 108  ] 

					}
				}
					
					  
	
	},
	
	  DOB: { type: Date, default: Date.now },	
	  gender: { type: String },	
      Role: { type: String, required: true },
     createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
  
module.exports = mongoose.model('User', schema);  