import express from 'express'

import { getSpecialtyList } from '../controllers/specialtyController.js';

const router = express.Router();

//localhost:5000/specialties

router.get('/', getSpecialtyList);

export default router;