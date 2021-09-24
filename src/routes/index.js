const { Router } = require('express');
const routes = Router();

const UserRouter = require('./UserRouter');

routes.use('/user', UserRouter);

module.exports = routes;
