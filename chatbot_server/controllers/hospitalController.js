import hospitalModel from "../models/hospitalModel.js";

export const getHospitalList = async (req, res) => {
    try{
        const hospitals = await hospitalModel.find();

        console.log(hospitals);
        res.status(200).json(hospitals);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}