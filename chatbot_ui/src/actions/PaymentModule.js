import * as api from '../api';

// Action creators

export const getPayment = () => async (dispatch) => {
    try {
        const {data} = await api.Pdata();

        dispatch({type:'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error);
    }
 
}