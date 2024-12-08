const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

const signup = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already in use.' });
  
      const hashedPassword = await bcrypt.hash(password,10)
      const user = await User.create({ username, email, password:hashedPassword });
      const token = generateToken(user._id);
  
      res.status(201).json({ user: { id: user._id, username, email },token});
    } catch (err) {
      res.status(500).json({ message: 'Error creating user.' });
    }
  };


  const Login = async (req,res)=>{
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email' });
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password.' });
  
 
      const token = generateToken(user._id);
  
      res.status(200).json({ user: { id: user._id, username: user.username, email }, token });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in.' });
    }


  };

  module.exports = {signup,Login}