var orm = require('orm');

module.exports = {
  properties: {
    name: Text,
    location: Text,
    id: Serial,
    phoneNumber: Number,
    url: Text,
    dailyHours: Text,
    parkingLot: Boolean
  }
};
