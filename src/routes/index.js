const { Router } = require('express');
const routes = Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController');

require('dotenv').config();

const UserRouter = require('./UserRouter');
const ReportRouter = require('./ReportRouter');

routes.use('/user', UserRouter);

routes.use('/report', ReportRouter);

routes.use('/login', (req, res) => userController.login(req, res));

module.exports = routes;
