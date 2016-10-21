var orm = require('orm');

module.exports = {
  properties: {
    name: String,
    placeId: {type: 'text', unique: true},
    address: String,
    id: {type: 'serial', key: true},
    phoneNumber: String,
    url: String,
    dailyHours: Object,
    currentlyWorkingOut: Boolean
  }
};
