import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import privateRoutes from './routes/privateRoutes.js';
import bloodRoutes from './routes/bloodRoutes.js';

dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
export { JWT_SECRET }; // Export JWT_SECRET for use in controllers

app.use(express.json());

app.use(
  cors({
    // origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179', 'http://localhost:5180'], // Replace with your frontend URL
    origin: 'http://localhost:5173', 
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/blood', bloodRoutes);
app.get('/api/test', (req, res) => res.json({ message: 'chalo ye toh kaam kr rha' }));

app.get('/', (req, res) => res.send('✅ Blood Bank Manager API is running'));

mongoose
  .connect(MONGO_URI)
  .then(() => { 
    console.log("✅ ho gaya connect mubarak!");
    app.listen(PORT, () =>
      console.log(`🚀 yaha run ho rha h-> http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB  connection ke lode lag gaye-> failed:", err);
    process.exit(1);
  });