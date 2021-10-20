const userRepository = require('../repositories/UserRepository');
const User = require('../models/User');
const Q = require('q');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Validations = require('../shared/validations/Validations');
const { validateRequiredField } = require('../shared/validations/Validations');
const Error = require('../shared/validations/Error');

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
    
    console.log(JSON.stringify(user));
    var errors = [];
    
    if(!Validations.validateStringAlphaRequired(user.first_name))
      errors.push('Campo Nome deve ser obrigatório e conter apenas letras');
    
    if(!Validations.validateStringAlphaRequired(user.last_name))
      errors.push('Campo Sobrenome deve ser obrigatório e conter apenas letras');

    if(!Validations.validateEmail(user.email))
      errors.push('Campo E-mail inválido');

    if(!Validations.validatePhoneNumber(user.contact))
      errors.push('Campo Telefone inválido');

    if(!validateRequiredField(user.password_hash))
      errors.push('Campo Senha é obrigatório');

      //TODO VALIDATEDATE

    if(errors.length > 0){
      return new Error (errors.join(', '),400);
    }
  
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

  async login(email, password) {
    var deferred = Q.defer();

    const response = await userRepository.getUserByEmail(email);
    const [userResponse] = response;

    const user = new User(
      userResponse.ID,
      userResponse.First_Name,
      userResponse.Last_Name,
      userResponse.Email,
      userResponse.Contact,
      userResponse.Birth_Date,
      userResponse.Password_Hash
    );

    if (
      userResponse !== undefined &&
      bcrypt.compareSync(password, user.password_hash)
    ) {
      console.log('deu bom na validacao');

      const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
      deferred.resolve({ token, userID: user.id });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }
}

module.exports = new UserService();
