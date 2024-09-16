class Category {

  static schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
    },
    required: ["name"],
    additionalProperties: false,
  }

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

}

module.exports = Category;