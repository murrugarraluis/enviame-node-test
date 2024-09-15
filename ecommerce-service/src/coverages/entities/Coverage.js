class Coverage {

  static schema = {
    type: "object",
    properties: {
      id: {type: "integer", errorMessage: 'must be of integer type'},
      name: {type: "string", errorMessage: 'must be of string type'},
      vehicleId: {type: "integer", errorMessage: 'must be of integer type'},
      providerId: {type: "integer", errorMessage: 'must be of integer type'},
      departureTime: {type: "string", format: "time", errorMessage: 'must be a valid time'},
      arrivalTime: {type: "string", format: "time", errorMessage: 'must be a valid time'},
      duration: {type: "string", format: "time", errorMessage: 'must be a valid time'},
    },
    required: ["name", "departureTime", "arrivalTime", "duration", "vehicleId", "providerId"],
    additionalProperties: false,
  }

  constructor(id, name, vehicleId, providerId, departureTime, arrivalTime, duration) {
    this.id = id;
    this.name = name;
    this.vehicleId = vehicleId;
    this.providerId = providerId;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.duration = duration;
  }

}

module.exports = Coverage;