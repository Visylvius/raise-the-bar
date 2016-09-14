var orm = require('orm');

module.exports = {
  properties: {
    name: String,
    placeId: String,
    address: String,
    location: String,
    id: {type: 'serial', key: true},
    phoneNumber: Number,
    url: String,
    dailyHours: Object,
    photos: Object,
    parkingLot: Boolean
  }
};
