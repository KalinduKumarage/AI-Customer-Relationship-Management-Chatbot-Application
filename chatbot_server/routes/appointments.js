import express from 'express'

import { createAppointment } from '../controllers/appointmentController.js'

const router = express.Router();

//localhost:5000/appointments

router.post('/', createAppointment);

export default router;