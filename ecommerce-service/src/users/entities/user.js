class User {
  static schema = {
    type: "object",
    properties: {
      id: { type: "integer", errorMessage: 'must be of integer type' },
      name: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
      lastname: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
      email: {
        type: "string",
        format: "email",
        errorMessage: 'must be a valid email address'
      },
      password: {
        type: "string",
        minLength: 8,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'must be at least 8 characters long'
        }
      },
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