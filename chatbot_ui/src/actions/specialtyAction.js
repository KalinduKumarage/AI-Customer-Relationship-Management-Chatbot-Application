import * as api from '../api';

//action creators

//get function

export const getSpecialties = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSpecialties();

        dispatch({ type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}