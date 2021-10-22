const { Response, Request } = require('express');
const userService = require('../services/UserService');
const User = require('../models/User');
const Error = require('../shared/validations/Error');

class UserController {
  async getUser(req, res) {
    const users = await userService.getUser();
    res.json(users);
  }

  async getUserById(req, res) {
    const id = req.params.id;
    const user = await userService.getUserById(id);

    res.json(user);
  }

  async createUser(req, res) {
    try {
      const userReq = req.body;

      const user = new User(
        0,
        userReq.first_name,
        userReq.last_name,
        userReq.email,
        userReq.contact,
        userReq.birth_date,
        userReq.password
      );

      const response = await userService.createUser(user);

      if (response instanceof Error) {
        res.status(response.statusCode).json(response.message);
      }

      res.json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateUser(req, res) {
    try {
      const userReq = req.body;

      const user = new User(
        userReq.id,
        userReq.first_name,
        userReq.last_name,
        userReq.email,
        userReq.contact,
        userReq.birth_date,
        userReq.password_hash
      );
      const response = await userService.updateUser(user);

      res.json(response);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    await userService.deleteUser(id);

    res.send('ok');
  }

  async login(req, res) {
    const email = req.query.email;
    const password = req.query.password;

    const response = await userService.login(email, password);

    if (response instanceof Error) {
      res.status(response.statusCode).json(response.message);
    }

    res.status(200).json(response);
  }
}

module.exports = new UserController();
