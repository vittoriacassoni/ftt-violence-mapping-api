const { Router } = require('express');
const userRoute = Router();
const userController = require('../controllers/UserController');

userRoute.get('/', (req, res) => userController.getUser(req, res));
userRoute.get('/:id', (req, res) => userController.getUserById(req, res));
userRoute.post('/create', (req, res) => userController.createUser(req, res));
userRoute.put('/', (req, res) => userController.updateUser(req, res));
userRoute.delete('/:id', (req, res) => userController.deleteUser(req, res));

module.exports = userRoute;
