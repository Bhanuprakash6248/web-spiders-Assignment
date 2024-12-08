const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")

const authenticate = async (req,res,next)=>{
    try {
        const token = req.header('Authorization')
        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ message: 'Invalid token.' });
    
        next();
      } catch (err) {
        res.status(401).json({ message: 'Unauthorized access.' });
      }
}

module.exports = authenticate;