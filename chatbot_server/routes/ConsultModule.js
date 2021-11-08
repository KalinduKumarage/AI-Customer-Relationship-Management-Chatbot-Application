import express from 'express';
import { getConsultation } from '../controllers/ConsultModule.js';

const router = express.Router();

router.get('/',getConsultation);

export default router;