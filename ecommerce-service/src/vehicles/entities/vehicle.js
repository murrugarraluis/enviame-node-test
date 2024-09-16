class Vehicle {

  static schema = {
    type: "object",
    properties: {
      brand: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
      model: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
      year: {
        type: "integer", minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
      licensePlate: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
      providerId: {
        type: "integer",
        minLength: 1,
        errorMessage: {
          type: 'must be of string type',
          minLength: 'cannot be an empty string'
        }
      },
    },
    required: ["brand", "model", "year", "licensePlate", "providerId"],
    additionalProperties: false,
  }

  constructor(id, brand, model, year, licensePlate, providerId) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.licensePlate = licensePlate;
    this.providerId = providerId;
  }

}

module.exports = Vehicle;