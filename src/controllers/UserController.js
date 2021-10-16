const { Response, Request } = require('express');
const userService = require('../services/UserService');
const User = require('../models/User');

class UserController {
  async getUser(req, res) {
    const users = await userService.getUser();

    if (users.length <= 0) {
      
      res.send('ok');

    }
    else{

      res.json(users);
    }
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
        userReq.birth_date
      );
      const response = await userService.createUser(user);

      return res.json(response);
    } catch (e) {
      console.log(e);
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
        userReq.birth_date
      );
      const response = await userService.updateUser(user);

      return res.json(response);
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
    const email = req.params.email;
    const password = req.params.password;
    const response = await  userService.login(email,password)
    .then((response) => {
      if(response){
         res.json({response});
    }
      else{
         res.status(401).send('Usuário e senha inválidos');
    }}).catch((err) => { res.status(400).send('Error: ' + err.message)});  
  }
}

module.exports = new UserController();