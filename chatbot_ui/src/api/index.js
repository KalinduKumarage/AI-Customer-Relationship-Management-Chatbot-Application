import axios from 'axios';

const url = 'http://localhost:5000/appointments';
const url2 = 'http://localhost:5000/doctors';
const url3 = 'http://localhost:5000/hospitals';
const url4 = 'http://localhost:5000/specialties';
const url5 = 'http://localhost:5000/ProfileModule';
const url6 = 'http://localhost:5000/Consultation';
const URL3 = 'http://localhost:5000/Orders';
const url8 = "http://localhost:5000/users";
const url7 = 'http://localhost:5000/prescriptions';
//const URLX = 'http://localhost:5000/Payments';

export const Pdata = () => axios.get(url5);
export const updateProf = (id,updatedPrf) => axios.patch(`${url5}/${id}`,updatedPrf);
export const Cdata = () => axios.get(url6);

// Naveen Components
export const createUser = async(newUser) =>{
    const response = await axios.post(url8, newUser);
    return response;
}; 
export const getUsers = () => axios.get(url8);

export const fetchAppointments = () => axios.get(url);
export const fetchDoctors = () => axios.get(url2);
export const fetchHospitals = () => axios.get(url3);
export const fetchSpecialties = () => axios.get(url4);
export const createAppointment = (newAppointment) => axios.post(url, newAppointment);
export const createPrescription = (newPrescription) => axios.post(url7, newPrescription);