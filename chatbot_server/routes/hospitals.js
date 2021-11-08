import express from 'express'

import { getHospitalList } from '../controllers/hospitalController.js';

const router = express.Router();

//localhost:5000/hospitals

router.get('/', getHospitalList);

export default router;