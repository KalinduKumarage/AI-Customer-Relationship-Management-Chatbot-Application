import * as api from "../api/index.js";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({ type: CREATE, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = () => async (dispatch) => {
  try{
    const {userData} =await api.getUsers();
    dispatch({ type:FETCH_ALL,payload:userData});
    
  }catch(error){
    console.log(error.message);
  }

};
