// routes/bloodRoutes.js
import express from 'express';
import { 
    getInventory, 
    addBlood, 
    requestBlood, 
    getBloodStats, 
    getTransactionHistory,
 } from '../controllers/bloodController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/add', verifyToken, addBlood);
router.post('/request', verifyToken, requestBlood);
router.get('/stats', verifyToken, getBloodStats);
router.get('/history', getTransactionHistory);

export default router;
