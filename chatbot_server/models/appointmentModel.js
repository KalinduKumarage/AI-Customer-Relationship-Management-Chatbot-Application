import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema( {
    createdTime: {
        type: Date,
        default: new Date(),
        required: false,
    },
    appointmentTime: {
        type: String,
        required: false,
    },
    patientName:{
        type: String,
        required: false,
    },
    doctorName: {
        type: String,
        required: false,
    },
    contactNo: {
        type: Number,
        required: false,
    },
});

const appointmentModel = mongoose.model("appointmentModel",appointmentSchema);


export default appointmentModel;