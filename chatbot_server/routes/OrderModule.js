import express from 'express';
import { getOrder } from '../controllers/OrderModule.js';

const router = express.Router();

router.get('/',getOrder);

export default router;