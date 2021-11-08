import PModule from "../models/PaymentModule.js";

export const getPayment = async (req,res)=>
{
    try {
        const payments = await PModule.find();

        console.log(payments);
        setTimeout(() => {

            res.status(200).json(payments);
            
        }, 1000);
        

    }
    catch (error){
        res.status(404).json({ message: error.message });
    }

}