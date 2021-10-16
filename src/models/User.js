class User {
  constructor(
    id,
    first_name,
    last_name,
    email,
    contact,
    birth_date,
    password_hash
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.contact = contact;
    this.birth_date = birth_date;
    this.password_hash = password_hash;
  }
}

module.exports = User;
