import doctorModel from "../models/doctorModel.js";

export const getDoctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find();

        console.log(doctors);
        res.status(200).json(doctors);

    }
    catch (error){
        res.status(404).json({ message: error.message });
    }
}