import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const sendUserToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
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
  try {
    res.clearCookie('user_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    res.status(200).json({ success: true });
  } 
  catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false});
  }
};

export const checkUserAuth = async (req, res) => {
  res.status(200).json({ success: true });
};