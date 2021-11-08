import  Mongoose  from 'mongoose';
import ProfileModule from '../models/ProfileModule.js';

export const getProfile = async (req,res)=>{


    try {
        const user = await ProfileModule.findById('616e68b878dc86362c88986d');
        res.status(200).json({
        data: user    
        });
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}

export const updateProfile = async (req,res) => {

    const {id:_id} = req.params;
    const profile = req.body;
    console.log(profile);
    //if(!Mongoose.Types.objectId.isValid(_id)) return res.status(404).send("No user with that ID");

    const updatedPrf = await ProfileModule.findByIdAndUpdate(_id,profile,{new : true});

    res.status(201).json({
        status:"success",
        data:{
            updatedPrf
        }
    })
}