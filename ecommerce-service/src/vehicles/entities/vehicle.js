class Vehicle {

  static schema = {
    type: "object",
    properties: {
      id: { type: "integer", errorMessage: 'must be of integer type' },
      brand: { type: "string", errorMessage: 'must be of string type' },
      model: { type: "string", errorMessage: 'must be of string type' },
      year: { type: "integer", errorMessage: 'must be of integer type' },
      licensePlate: { type: "string", errorMessage: 'must be of string type' },
      providerId: { type: "integer", errorMessage: 'must be of integer type' },
    },
    required: ["brand", "model", "year", "licensePlate"],
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