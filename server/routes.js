var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
var gymHandler = require('./gyms');
var inboxHandler = require('./inbox');
var userHandler = require('./user');
var path = require('path');
var Router = require('express').Router;

module.exports = new Router()
  .get('/athlete', athleteHandler.getAthlete)
  .get('/findathletes', athleteHandler.getAthlete)
  .post('/athlete', athleteHandler.postAthlete)
  .get('/athlete/:id', athleteHandler.getIndividualAthlete)
  .get('/athlete/gyms/:id', athleteHandler.showAthleteGyms)
  .put('/athlete/:id', athleteHandler.updateAthlete)
  .delete('/athlete/:email', athleteHandler.deleteAthlete)
  .get('/trainer', trainerHandler.getTrainer)
  .post('/trainer', trainerHandler.postTrainer)
  .get('/trainer/:id', trainerHandler.getIndividualTrainer)
  .put('/trainer/:id', trainerHandler.updateTrainer)
  .delete('/trainer/:email', trainerHandler.deleteTrainer)
  .get('/trainer/gyms/:id', trainerHandler.showTrainerGyms)
  .get('/inbox/:type/:email', inboxHandler.getMessages)
  .post('/inbox/:type/:id', inboxHandler.sendMessage)
  .delete('/inbox/:id', inboxHandler.deleteMessage)
  .post('/gym', gymHandler.getGyms)
  .get('/gym/:placeId', gymHandler.getSpecificGym)
  .post('/gym/:placeId', gymHandler.saveSpecificGym)
  .put('/gym/toggleactive/:placeId', gymHandler.toggleGymToActive)
  .delete('/gym', gymHandler.deleteGym)
  .get('/user/:email', userHandler.getUser);


// .get('/inbox/:to/:id', inboxHandler.getMessages)
//remove update from the url.
