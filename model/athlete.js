var orm = require('orm');
var Athlete = module.exports = {
  properties: {
    displayName: String,
    name: String,
    liftingStyle: String,
    location: String,
    trainer: Boolean,
    password: String,
    hasTrainer: Boolean,
    preferedGyms: String,
    id: {type: 'serial', key: true}
  }
};
