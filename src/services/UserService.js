const userRepository = require('../repositories/UserRepository');
const User = require('../models/User');

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
}

module.exports = new UserService();
