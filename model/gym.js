var orm = require('orm');

module.exports = {
  properties: {
    name: String,
    placeId: {type: 'text'},
    address: String,
    id: {type: 'serial', key: true},
    phoneNumber: String,
    url: String,
    dailyHours: Object,
    imgId: String
  }
};
