import * as api from '../api';

//Action creators

//get function
export const getDoctors = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDoctors();

        dispatch({ type: 'FETCH_ALL', payload: data });
        
    } catch (error) {
        console.log(error.message);
    }
}