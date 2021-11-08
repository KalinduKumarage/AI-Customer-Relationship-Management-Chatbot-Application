import * as api from '../api';

// Action creators

export const createPrescription = (prescription) => async (dispatch) => {
    try {

        const { data } = await api.createPrescription(prescription);

        dispatch({ type: 'CREATE', payload: data });

    } catch (error) {
        console.log(error);
    }
}