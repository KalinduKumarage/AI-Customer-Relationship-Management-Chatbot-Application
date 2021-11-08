import OModule from "../models/prescriptionModel.js";
export const getOrder = async (req,res)=>{

    try {
        const Orders = await OModule.find();

        console.log(Orders);
        res.status(200).json(Orders);
    }
    catch (error){
        res.status(404).json({ message: error.message });
    }
}