import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  allergies: {
    type: String,
    required: false,
  },
  healthConditions: {
    type: String,
    required: false,
  },
  medicines: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  selectedImage: {
    type: String,
    required: false,
  },
});

const prescriptionModel = mongoose.model(
  "prescriptionModel",
  prescriptionSchema
);

export default prescriptionModel;
