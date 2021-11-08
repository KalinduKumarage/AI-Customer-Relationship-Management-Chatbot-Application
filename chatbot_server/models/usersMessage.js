import mongoose from 'mongoose';

const userSchema= mongoose.Schema({ 
    firstName: String,
    lastName : String,
    dob : {
        type:Date,
        default:new Date()
    },
    nic :String,
    phone : String,
    gender : String,

});

const userMessage = mongoose.model('userMessage',userSchema);

export default userMessage;