var orm = require('orm');
var Bio = require('./bio');

var Athlete = module.exports = {
  properties: {
    displayName: String,
    name: String,
    email: String,
    liftingStyle: String,
    location: String,
    trainer: Boolean,
    bio: Object,
    cardDescription: String,
    password: String,
    hasTrainer: Boolean,
    preferedGyms: String,
    imgId: String,
    id: {type: 'serial', key: true}
  }
};
