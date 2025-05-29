import express from 'express';
import { registerDonor, loginDonor } from '../controllers/authController.js';
import { getDonorProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerDonor);
router.post('/login', loginDonor);
router.get('/profile', verifyToken, getDonorProfile);
// router.delete('/profile', verifyToken, deleteDonorProfile);


export default router;
