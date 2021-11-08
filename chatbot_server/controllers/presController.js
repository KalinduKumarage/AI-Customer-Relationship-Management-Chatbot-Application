import prescriptionModel from "../models/prescriptionModel.js";

export const createPrescription = async (req, res) => {
    
    const prescription = req.body;

    const newPrescription = new prescriptionModel(prescription);

    try {

        await newPrescription.save();

        res.status(201).json(newPrescription);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}