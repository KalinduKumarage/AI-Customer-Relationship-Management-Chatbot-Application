import * as api from '../api';

//Action creators

//get function
// export const getAppointments = () => async (dispatch) => {
//     try {
//         const { data } = await api.fetchAppointments();

//         dispatch({ type: 'FETCH_ALL', payload: data });
//     }catch (error) {
//         console.log(error.message);
//     }
// }

export const createAppointment = (appointment) => async (dispatch) => {
    try{
        const { data } = await api.createAppointment(appointment);

        dispatch({ type: 'CREATE', payload: data});

    } catch (error){
        console.log(error);
    }
}