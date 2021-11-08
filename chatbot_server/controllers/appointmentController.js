import appointmentModel from "../models/appointmentModel.js";

export const createAppointment = async (req, res) => {

    const appointment = req.body;
    
    const newAppointment = new appointmentModel(appointment);
    
    try{
        await newAppointment.save();

        //res.status(200).json(newAppointment);
        res.status(201).json(newAppointment);

    }
    catch (error){
        res.status(409).json({ message: error.message });
    }
}