import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

export const protectUser = async (req, res, next) => {
  console.log("🔍 Middleware: Checking User Token...");

  let token = req.cookies.user_token;

  if (!token) {
    console.log("❌ Failure: No 'user_token' cookie found in request.");
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);

    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
        console.log("❌ Failure: User ID from token not found in Database.");
        throw new Error('User not found');
    }

    if (decoded.role !== 'user') {
        console.log(`❌ Failure: Role mismatch. Token says '${decoded.role}', expected 'user'.`);
        throw new Error('Invalid role');
    }

    console.log("✅ Success: User authorized!");
    next();
  } catch (error) {
    console.error("🔥 Auth Crash:", error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const protectAdmin = async (req, res, next) => {
  let token = req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized as admin' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    if (!req.admin || decoded.role !== 'admin') throw new Error();
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};