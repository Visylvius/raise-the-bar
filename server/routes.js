var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
module.exports = function(app) {
  app.get('/athlete', athleteHandler.getAthlete);
  app.get('/trainer', trainerHandler.getTrainer);
};
