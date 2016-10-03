var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
var gymHandler = require('./gyms');
var inboxHandler = require('./inbox');
var userHandler = require('./user');
var path = require('path');
var Router = require('express').Router;

module.exports = new Router()
  .get('/athlete', athleteHandler.getAthlete)
  .post('/athlete', athleteHandler.postAthlete)
  .get('/athlete/:id', athleteHandler.getIndividualAthlete)
  .get('/athlete/gyms/:email', athleteHandler.showAthleteGyms)
  .put('/athlete/update/:id', athleteHandler.updateAthlete)
  .delete('/athlete/:id', athleteHandler.deleteAthlete)
  .get('/trainer', trainerHandler.getTrainer)
  .post('/trainer', trainerHandler.postTrainer)
  .get('/trainer/:id', trainerHandler.getIndividualTrainer)
  .put('/trainer/:id', trainerHandler.updateTrainer)
  .delete('/trainer/:id', trainerHandler.deleteTrainer)
  .get('/inbox/:email', inboxHandler.getMessages)
  .post('/inbox/:type/:id', inboxHandler.sendMessage)
  .post('/gym', gymHandler.getGyms)
  .get('/gym/:placeId', gymHandler.getSpecificGym)
  .post('/gym/:placeId', gymHandler.saveSpecificGym)
  .get('/user/:email', userHandler.getUser);


// .get('/inbox/:to/:id', inboxHandler.getMessages)
//remove update from the url.
