import ConsultModule from "../models/appointmentModel.js";

export const getConsultation = async (req,res)=>{
    try {
        const appointments = await ConsultModule.find();

        console.log(appointments);
        setTimeout(() => {

            res.status(200).json(appointments);
            
        }, 1000);
        

    }
    catch (error){
        res.status(404).json({ message: error.message });
    }

}