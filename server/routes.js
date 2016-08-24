var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
var gymHandler = require('./gyms');
var inboxHandler = require('./inbox');
var path = require('path');
var Router = require('express').Router;

module.exports = new Router()
  .get('/athlete', athleteHandler.getAthlete)
  .post('/athlete', athleteHandler.postAthlete)
  .get('/athlete/:id', athleteHandler.getIndividualAthlete)
  .put('/athlete/update/:id', athleteHandler.updateAthlete)
  .delete('/athlete/:id', athleteHandler.deleteAthlete)
  .get('/trainer', trainerHandler.getTrainer)
  .post('/trainer', trainerHandler.postTrainer)
  .get('/trainer/:id', trainerHandler.getIndividualTrainer)
  .put('/trainer/update/:id', trainerHandler.updateTrainer)
  .delete('/trainer/:id', trainerHandler.deleteTrainer)
  .post('/gym', gymHandler.getGyms)
  .get('/inbox/:to/:id', inboxHandler.getMessages)
  .post('/inbox', inboxHandler.sendMessage);



//remove update from the url.
