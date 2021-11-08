import mongoose from "mongoose";

const ConsultSchema = mongoose.Schema({
  createdTime: {
    type: Date,
    default: new Date(),
    required: false,
  },
  appointmentTime: {
    type: String,
    required: false,
  },
  doctorSessionId: {
    type: String,
    required: false,
  },
  appointmentNo: {
    type: Number,
    required: false,
  },
  patientName: {
    type: String,
    required: false,
  },
  doctorName: {
    type: String,
    required: false,
  },
  charges: {
    type: Number,
    required: false,
  },
});

const ConsultModule = mongoose.model("appointment", ConsultSchema);

export default ConsultModule;
