var config = require('../dbconfig');

const sql = require('mssql');

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
    try {
      let conn = await sql.connect(config);

      var users = await conn
        .request()
        .input('First_Name', model.first_name)
        .input('Last_Name', model.last_name)
        .input('Email', model.email)
        .input('Contact', model.contact)
        .input('Birth_Date', model.birth_date).query(`INSERT INTO Users VALUES 
            ( @First_Name, @Last_Name, @Email, @Contact, @Birth_Date)`);

      return users.recordsets;
    } catch (error) {
      console.log();
    }
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
}

module.exports = new UserRepository();
