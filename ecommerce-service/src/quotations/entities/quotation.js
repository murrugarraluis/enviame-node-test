const { DataTypes } = require('sequelize');
class Quotation {
  static schema = {
    type: "object",
    properties: {
      id: { type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty' },
      userId: { type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty' },
      coverageId: { type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty' },
      priceId: { type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty' },
      travelDate: { type: "string", format: "date", errorMessage: 'must be a valid date in YYYY-MM-DD format and not empty' },
      passengerCount: { type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty' },
      category: { type: "string", minLength: 1, errorMessage: 'must be of string type and not empty' },
      status: { type: "string", minLength: 1, errorMessage: 'must be of string type and not empty' },
    },
    required: ["userId", "travelDate", "passengerCount", "status"],
    additionalProperties: false
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