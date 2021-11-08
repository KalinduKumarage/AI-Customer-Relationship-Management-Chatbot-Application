import * as api from '../api';

//action creators

//get function
export const getHospitals = () => async (dispatch) => {
    try {
        const { data } = await api.fetchHospitals();

        dispatch({ type: 'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error.message);
    }

}