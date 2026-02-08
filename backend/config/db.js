import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {console.log('✅ Database Connected!')});
        await mongoose.connect(MONGO_URI);
    } 
    catch (error) {
        console.log('❌ Database Error: ', error);
        process.exit(1);
    }
}

export default connectDB;