import mongoose from "mongoose";

const userLocationSchema = mongoose.Schema({
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  area: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  latitude: {
    type: String,
    required: false,
  },
  longitude: {
    type: String,
    required: false,
  },
});

const userLocationModel = mongoose.model(
  "userLocationModel",
  userLocationSchema
);

export default userLocationModel;
