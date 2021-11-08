import mongoose from 'mongoose'

const doctorSchema = mongoose.Schema({
    doctorName: {
        type: String,
        required: false,
    },
    specialty: {
        type: String,
        required: false,
    },
    vistingHours: {
        type: String,
        required: false,
    },
    hospital: {
        type: String,
        required: false,
    }
});

const doctorModel = mongoose.model("doctorModel",doctorSchema);


export default doctorModel;