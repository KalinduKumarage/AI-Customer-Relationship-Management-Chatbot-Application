import express from 'express';
import { getProfile,updateProfile } from '../controllers/ProfileModule.js';

const router = express.Router();

router.get('/',getProfile);
router.patch('/:id',updateProfile);

export default router;