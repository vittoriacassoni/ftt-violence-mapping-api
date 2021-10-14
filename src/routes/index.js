const { Router } = require('express');
const routes = Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

const UserRouter = require('./UserRouter');

routes.use('/user', UserRouter);

routes.use('/login', (req, res) => {
  var id = 1;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 300 });
  return res.json({ token: token });
});

module.exports = routes;
