const {DataTypes} = require('sequelize');

class Quotation {

  static schema = {
    type: "object",
    properties: {
      id: {type: "integer", errorMessage: 'must be of integer type'},
      userId: {type: "integer", errorMessage: 'must be of integer type'},
      coverageId: {type: "integer", errorMessage: 'must be of integer type'},
      priceId: {type: "integer", errorMessage: 'must be of integer type'},
      travelDate: {type: "string", format: "date", errorMessage: 'must be a valid date'},
      passengerCount: {type: "integer", errorMessage: 'must be of integer type'},
      category: {type: "string", errorMessage: 'must be of string type'},
      status: {type: "string", errorMessage: 'must be of string type'},
    },
    required: ["userId", "travelDate", "passengerCount", "status"],
    additionalProperties: false,
  }

  constructor(id, userId, coverageId, priceId, travelDate, passengerCount, category, status) {
    this.id = id;
    this.userId = userId;
    this.coverageId = coverageId;
    this.priceId = priceId;
    this.travelDate = travelDate;
    this.passengerCount = passengerCount;
    this.category = category;
    this.status = status;
  }

}

module.exports = Quotation;