import * as api from '../api';

// Action creators

export const getProfile = () => async (dispatch) => {
    try {
        const {data} = await api.Pdata();

        dispatch({type:'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error);
    }
 
}

export const updateProf = (id,post) => async (dispatch) => {
    try {
        const {data} = await api.updateProf(id,post);

        dispatch({type:'UPDATE', payload: data});
        
    } catch (error) {
        console.log(error);
    }
}