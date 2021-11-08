import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
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
        

    }
);

const OModule = mongoose.model(
    "prescription",
    OrderSchema
);

export default OModule;