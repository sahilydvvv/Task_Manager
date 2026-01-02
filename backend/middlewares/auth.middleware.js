import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id, iat, exp }

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Protect middleware hit");


    req.user = user;
    next();

  } catch (error) {
    console.error("Error in authenticateToken middleware:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
