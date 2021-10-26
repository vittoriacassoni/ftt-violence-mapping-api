const jwt = require('jsonwebtoken');
const { Router } = require('express');
const userRoute = Router();
const userController = require('../controllers/UserController');

const middlewares = require('../shared/middlewares/middleware');

userRoute.get('/', middlewares.authentication, userController.getUser);
userRoute.get('/:id', middlewares.authentication, userController.getUserById);
userRoute.post('/create', (req, res) => userController.createUser(req, res));
userRoute.put('/', middlewares.authentication, userController.updateUser);
userRoute.delete('/:id', middlewares.authentication, userController.deleteUser);

module.exports = userRoute;
