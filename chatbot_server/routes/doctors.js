import express from 'express'

import { getDoctorList } from '../controllers/doctorController.js';

const router = express.Router();

//localhost:5000/doctors 

router.get('/', getDoctorList);

export default router;