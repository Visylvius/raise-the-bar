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
    id: {type: 'serial', key: true}
  }
};



//TODO include a bio in this and the athlete index.js under server
