const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path to your User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Your other dependencies and middleware can be imported here
router.post('/signup', async (req, res, next) => {
    try {
      const { username, password, role } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }
  
    //   // Hash the password
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({ username, password, role });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully',success:true });
    } catch (error) {
      next(error);
    }
  });
  router.post('/signin', async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed1' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed2'+password+" "+user.password });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        'MINOR-PROJECT', // Replace with your secret key
        { expiresIn: '1d' } // Token expiration time
      );
  
      res.status(200).json({ 
        success:true,
        token:"Bearer "+token });
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;
    