const jwt = require('jsonwebtoken');
const Error = require('../validations/Error');
require('dotenv').config();

module.exports = {
  authentication: (req, res, next) => {
    const auth = req.headers['authorization'];

    if (auth.startsWith('Bearer ')) {
      const token = auth.substring(7, auth.length);

      jwt.verify(token, process.env.JWT_SECRET, (error, userInfo) => {
        if (error) res.status(403).end();

        next();
      });
    }
  },
};
