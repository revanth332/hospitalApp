const passport = require('../config'); // Replace with the path to your Passport configuration file

function authenticateUser(req, res, next) {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = authenticateUser;
