import userMessage from "../models/ProfileModule.js";
import jwt from 'jsonwebtoken';
//import { sessionObject } from "../config/dev.js";
//import { jwtExpire } from "../config/dev.js";
//const jwt =require('jsonwebtoken');
import { sessionObject } from "../config/dev.js";



export const getUsers = async (req, res) => {
  try {
    const userMessages = await userMessage.find();

    //console.log(userMessages);

    res.status(200).json(userMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { nic, firstName, lastName, phone, gender, dob, email } = req.body;
  const user1 = req.body;
  const newUser = new userMessage(user1);
  const jwtSecret = sessionObject.jwtSecret;
  const jwtExpire = sessionObject.jwtExpire;

  try {
    const user = await userMessage.findOne({ email });
    if (!user) {
      await newUser.save();
      console.log((newUser));
      const payload = {
        newUser: {
          _id:newUser._id,
        },
      }

      jwt.sign(payload,jwtSecret,{expiresIn:jwtExpire},(err,token)=>{
        if(err) console.log('jwt error:',err);
        const {_id,phone,email,firstName,lastName,gender,nic,dob} = newUser;
        res.json({
          token,
          newUser:{_id,phone,email,firstName,lastName,gender,nic,dob },
        });
      });
    } else {
      return res.status(400).json({
        message: "Contains Email",
      });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
