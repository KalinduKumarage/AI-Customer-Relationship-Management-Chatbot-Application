import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  nic: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    default:new Date()
  },
  email: {
    type: String,
    required: true,
  },
});

const ProfileModule = mongoose.model("usermodels", profileSchema);

export default ProfileModule;
