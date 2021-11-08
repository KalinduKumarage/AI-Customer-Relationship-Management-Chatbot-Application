import mongoose from 'mongoose'

const specialtySchema = mongoose.Schema({
    specialty: {
        type: String,
        required: false,
    }
});

const specialtyModel = mongoose.model("specialtyModel", specialtySchema);

export default specialtyModel;