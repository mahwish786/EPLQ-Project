import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import placeRoutes from './routes/placeRoute.js';
import authRoutes from './routes/authRoute.js';
import adminRoutes from './routes/adminRoute.js';

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://eplq-green.vercel.app'], 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/places', placeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔒 Secure EPLQ Server running on port ${PORT}`));

export default app;