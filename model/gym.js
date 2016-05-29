var orm = require('orm');

module.exports = {
  properties: {
    name: String,
    location: String,
    id: {type: 'serial', key: true},
    phoneNumber: Number,
    url: String,
    dailyHours: String,
    parkingLot: Boolean
  }
};
