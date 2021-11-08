import specialtyModel from "../models/specialtyModel.js";

export const getSpecialtyList = async (req, res) => {
    try {
        const specialties = await specialtyModel.find();

        console.log(specialties);
        res.status(200).json(specialties);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}