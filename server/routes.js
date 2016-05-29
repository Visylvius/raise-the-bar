var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
var path = require('path');
var fs = require('fs');
module.exports = function(app) {
  app.get('/athlete', athleteHandler.getAthlete);
  app.get('/trainer', trainerHandler.getTrainer);
  app.post('/athlete', athleteHandler.postAthlete);
  app.get('/athlete/:id', athleteHandler.getIndividualAthlete);
  app.delete('/athlete/:id', athleteHandler.deleteAthlete);
  app.post('/trainer', trainerHandler.postTrainer);
  app.get('/trainer/:id', trainerHandler.getIndividualTrainer);
  app.delete('/trainer/:id', trainerHandler.deleteTrainer);
};
