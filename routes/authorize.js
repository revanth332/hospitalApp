const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser'); // Replace with the path to your authentication middleware

router.get('/protected', authenticateUser, async (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  // req.user contains the user's information
  
  res.status(200).json({ success:true,message: 'Protected resource accessed successfully',user:req.user });
});

module.exports = router;
