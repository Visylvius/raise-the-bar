var orm = require('orm');
var Athlete = module.exports = {
  properties: {
    displayName: Text,
    name: Text,
    liftingStyle: Text,
    location: Text,
    trainer: Boolean,
    password: Text,
    hasTrainer: Boolean,
    preferedGyms: Text,
    preferedLiftingTimes: Date,
    id: Serial
  }
};
