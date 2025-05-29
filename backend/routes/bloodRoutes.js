// routes/bloodRoutes.js
import express from 'express';
import { getInventory, addBlood, requestBlood, getBloodStats } from '../controllers/bloodController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/add', verifyToken, addBlood);
router.post('/request', verifyToken, requestBlood);
router.get('/stats', getBloodStats);

export default router;
