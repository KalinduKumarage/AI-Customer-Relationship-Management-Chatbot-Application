import express from 'express'
import { createPrescription } from '../controllers/presController.js';

const router = express.Router();

router.post('/', createPrescription);

export default router;