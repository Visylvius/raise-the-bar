var orm = require('orm');

module.exports = {
  properties: {
    name: String,
    placeId: String,
    address: String,
    id: {type: 'serial', key: true},
    phoneNumber: String,
    url: String,
    dailyHours: Object,
    currentlyWorkingOut: Boolean
  }
};
