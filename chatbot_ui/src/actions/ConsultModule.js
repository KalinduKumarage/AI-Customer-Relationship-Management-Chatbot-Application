import * as api from '../api';

// Action creators

export const getConsult = () => async (dispatch) => {
    try {
        const {data} = await api.Cdata();

        dispatch({type:'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error);
    }
 
}