import mongoose from 'mongoose'

const hospitalSchema = mongoose.Schema({
    hospitalName: {   
        type: String,
        required: false,
    },
    hospitalAddress: {
        type: String,
        required: false,
    }
});

const hospitalModel = mongoose.model("hospitalModel",hospitalSchema);

export default hospitalModel;