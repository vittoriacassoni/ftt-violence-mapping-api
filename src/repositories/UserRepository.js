var config = require('../dbconfig');
var lodash = require('lodash');
const sql = require('mssql');
var bcrypt = require('bcryptjs');

const User = require('../models/User');

class UserRepository {
  async getUser() {
    let conn = await sql.connect(config);
    var users = await conn.request().query('SELECT * FROM Users');

    return users.recordsets;
  }

  async getUserById(id) {
    let conn = await sql.connect(config);

    var user = await conn.request().input('ID', id).query(`SELECT * FROM Users 
        WHERE ID = @ID`);

    return user.recordsets;
  }

  async createUser(model) {
    let conn = await sql.connect(config);

    var user = lodash.omit(model, 'password_hash');

    user.password_hash = bcrypt.hashSync(model.password_hash, 10);

    var users = await conn
      .request()
      .input('First_Name', user.first_name)
      .input('Last_Name', user.last_name)
      .input('Email', user.email)
      .input('Contact', user.contact)
      .input('Birth_Date', user.birth_date)
      .input('Password_Hash', user.password_hash)
      .query(`INSERT INTO Users VALUES 
            ( @First_Name, @Last_Name, @Email, @Contact, @Birth_Date, @Password_Hash)`);

    return users.recordsets;
  }

  async updateUser(model) {
    try {
      let conn = await sql.connect(config);

      var users = await conn
        .request()
        .input('ID', model.id)
        .input('First_Name', model.first_name)
        .input('Last_Name', model.last_name)
        .input('Email', model.email)
        .input('Contact', model.contact)
        .input('Birth_Date', model.birth_date).query(`UPDATE Users SET 
            First_Name = @First_Name, 
            Last_Name = @Last_Name, 
            Email = @Email, 
            Contact = @Contact, 
            Birth_Date = @Birth_Date 
            WHERE ID = @ID`);

      return users.recordsets;
    } catch (error) {
      console.log();
    }
  }

  async deleteUser(id) {
    try {
      let conn = await sql.connect(config);

      var users = await conn.request().input('ID', id).query(`DELETE FROM Users 
            WHERE ID = @ID`);

      return users.recordsets;
    } catch (error) {
      console.log();
    }
  }

  async getUserByEmail(email) {
    try {
      let conn = await sql.connect(config);

      var user = await conn.request().input('Email', email)
        .query(`SELECT * FROM Users 
            WHERE Email = @Email`);

      return user.recordsets[0];
    } catch (error) {
      console.log();
    }
  }
}

module.exports = new UserRepository();
