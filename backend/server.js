import express from 'express';
const app = express();
app.set('trust proxy', 1);
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import placeRoutes from './routes/placeRoute.js';
import authRoutes from './routes/authRoute.js';
import adminRoutes from './routes/adminRoute.js';
import cors from 'cors';
await connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000', 
    'https://eplq-secure.vercel.app',
  ], 
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/places', placeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the EPLQ API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔒 Secure EPLQ Server running on port ${PORT}`));

export default app;