var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
var gymHandler = require('./gyms');
var path = require('path');
var Router = require('express').Router;

module.exports = new Router()
  .get('/athlete', athleteHandler.getAthlete)
  .get('/trainer', trainerHandler.getTrainer)
  .post('/athlete', athleteHandler.postAthlete)
  .get('/athlete/:id', athleteHandler.getIndividualAthlete)
  .put('/athlete/:id', athleteHandler.updateAthlete)
  .delete('/athlete/:id', athleteHandler.deleteAthlete)
  .post('/trainer', trainerHandler.postTrainer)
  .get('/trainer/:id', trainerHandler.getIndividualTrainer)
  .put('/trainer/:id', trainerHandler.updateTrainer)
  .delete('/trainer/:id', trainerHandler.deleteTrainer)
  .post('/gym', gymHandler.getGyms);
