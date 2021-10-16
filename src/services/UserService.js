const userRepository = require('../repositories/UserRepository');
const User = require('../models/User');
const Q = require('q');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class UserService {
  async getUser() {
    const users = await userRepository.getUser();

    return users;
  }

  async getUserById(id) {
    const user = await userRepository.getUserById(id);

    return user;
  }

  async createUser(user) {
    //TODO VALIDACOES
    const response = await userRepository.createUser(user);

    return response;
  }

  async updateUser(user) {
    //TODO VALIDACOES

    const response = await userRepository.updateUser(user);

    return response;
  }

  async deleteUser(id) {
    await userRepository.deleteUser(id);
    return;
  }

  async login(email,password) {
    var deferred = Q.defer();
    const response = new User(await userRepository.getUserByEmail(email));
    if(response[0].length > 0){ //TODO verificação senha

      const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 300 });
      deferred.resolve({token,userID:response.id});
    }
    else{

      deferred.resolve();
    }
    return response;
  }
}

module.exports = new UserService();
