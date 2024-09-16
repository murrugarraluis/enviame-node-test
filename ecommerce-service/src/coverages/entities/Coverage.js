class Coverage {
  static schema = {
    type: "object",
    properties: {
      id: { type: "integer", errorMessage: 'must be of integer type' },
      name: { type: "string", minLength: 1, errorMessage: 'must be a non-empty string' },
      vehicleId: { type: "integer", minimum: 1, errorMessage: 'must be a non-zero positive integer' },
      providerId: { type: "integer", minimum: 1, errorMessage: 'must be a non-zero positive integer' },
      departureTime: {
        type: "string",
        minLength: 1,
        errorMessage: 'must be a valid non-empty time',
        pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$"  // regex to match HH:mm:ss format
      },
      arrivalTime: {
        type: "string",
        minLength: 1,
        errorMessage: 'must be a valid non-empty time',
        pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$"  // regex to match HH:mm:ss format
      },
      duration: {
        type: "string",
        minLength: 1,
        errorMessage: 'must be a valid non-empty time',
        pattern: "^([0-1]?\\d|2[0-3]):([0-5]?\\d):([0-5]?\\d)$"  // regex to match HH:mm:ss format, allowing for single digit hours and minutes
      },
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