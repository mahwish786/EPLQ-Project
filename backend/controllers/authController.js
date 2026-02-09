import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import dotenv from 'dotenv';
dotenv.config();

const sendUserToken = (user, statusCode, res) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is missing in .env file");
  }

  const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  };

  res.status(statusCode).cookie('user_token', token, options).json({
    success: true,
    user: { id: user._id, email: user.email, role: 'user' }
  });
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Attempting to register user: ${email}`);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });
    console.log(`User created: ${user._id}`);
    
    sendUserToken(user, 201, res);

  } catch (error) {
    console.error("🔥 USER REGISTER ERROR:", error);
    res.status(500).json({ message: error.message }); 
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    sendUserToken(user, 200, res);

  } catch (error) {
    console.error("User Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('user_token', 'none', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ success: true });
};

export const checkUserAuth = async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.status(200).json({ success: true, role: 'user', user: req.user });
};