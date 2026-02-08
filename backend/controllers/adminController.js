import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const sendAdminToken = (admin, statusCode, res) => {
  const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  res.status(statusCode).cookie('admin_token', token, options).json({
    success: true,
    user: { id: admin._id, email: admin.email, role: 'admin' }
  });
};

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({ email, password });
    console.log(`✅ New Admin registered: ${admin._id}`);

    sendAdminToken(admin, 201, res);

  } catch (error) {
    console.error("🔥 ADMIN REGISTRATION ERROR:", error);
    res.status(500).json({ message: "Admin registration failed" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    sendAdminToken(admin, 200, res);

  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutAdmin = async (req, res) => {
  res.cookie('admin_token', 'none', {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: 'none'
  });
  res.status(200).json({ success: true });
};

export const checkAdminAuth = async (req, res) => {
  res.status(200).json({ success: true });
};

