const {DataTypes} = require('sequelize');

class Quotation {
  static schema = {
    type: "object",
    properties: {
      userId: {type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty'},
      coverageId: {type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty'},
      priceId: {type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty'},
      originId: {type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty'},
      destinationId: {type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty'},
      travelDate: {
        type: "string",
        format: "date",
        errorMessage: 'must be a valid date in YYYY-MM-DD format and not empty'
      },
      passengerCount: {type: "integer", minimum: 1, errorMessage: 'must be of integer type and not empty'},
      category: {type: "string", minLength: 1, errorMessage: 'must be of string type and not empty'},
    },
    required: ["userId", "originId", "destinationId", "travelDate", "passengerCount"],
    additionalProperties: false
  }
  static schemaReserved = {
    type: "object",
    properties: {
      coverageId: { type: "integer", minimum: 1, errorMessage: 'CoverageId must be an integer and not empty' },
      priceId: { type: "integer", minimum: 1, errorMessage: 'PriceId must be an integer and not empty' },
      category: {
        type: "string",
        enum: ["standard", "premium"],
        errorMessage: {
          type: 'Category must be of string type and not empty',
          enum: 'Category must be one of [standard, premium]'
        }
      }
    },
    required: ["coverageId", "priceId", "category"],
    additionalProperties: false,
  };

  constructor(id, userId, travelDate, passengerCount, category, status, coverageId = null, priceId = null) {
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