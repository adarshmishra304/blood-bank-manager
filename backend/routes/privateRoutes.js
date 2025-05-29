// routes/privateRoutes.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example protected route
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Yeh private data hai 😎',
    user: req.user, // You can access user data from token
  });
});

export default router;
