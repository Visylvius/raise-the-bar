var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
var gymHandler = require('./gyms');
var path = require('path');
module.exports = function(app) {
  app.get('/athlete', athleteHandler.getAthlete);
  app.get('/trainer', trainerHandler.getTrainer);
  app.post('/athlete', athleteHandler.postAthlete);
  app.get('/athlete/:id', athleteHandler.getIndividualAthlete);
  app.put('/athlete/:id', athleteHandler.updateAthlete);
  app.delete('/athlete/:id', athleteHandler.deleteAthlete);
  app.post('/trainer', trainerHandler.postTrainer);
  app.get('/trainer/:id', trainerHandler.getIndividualTrainer);
  app.put('/trainer/:id', trainerHandler.updateTrainer);
  app.delete('/trainer/:id', trainerHandler.deleteTrainer);
  app.post('/gym', gymHandler.getGyms);
};
