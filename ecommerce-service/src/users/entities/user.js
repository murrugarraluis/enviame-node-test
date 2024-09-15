class User {

  static schema = {
    type: "object",
    properties: {
      id: {type: "integer", errorMessage: 'must be of integer type'},
      name: {type: "string", errorMessage: 'must be of string type'},
      lastname: {type: "string", errorMessage: 'must be of string type'},
      email: {type: "string", format: "email", errorMessage: 'must be a valid email address'},
      password: {type: "string", errorMessage: 'must be of string type'},
    },
    required: ["name", "lastname", "email", "password"],
    additionalProperties: false,
  }

  constructor(id, name, lastname, email, password) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

}

module.exports = User;