var athleteHandler = require('./athlete');
var trainerHandler = require('./trainer');
var gymHandler = require('./gyms');
var path = require('path');
var Router = require('express').Router;

module.exports = function(io) {
  io.on('connection', api);
};

const api = (socket) => {

  socket.on('message', (data) => {
    // models.inbox.create(data, (err, message) => {
    //   if (err) {
    //     console.error('Error creating message in socket', message);
    //   }
    // });
    console.log('this is data', data);
  });

  socket.on('ferret', (data, reply) => {
    console.log('data', data);
    console.log('reply', reply);
    reply('Yo dawg I hear you like ferrets');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('bimbo', (data, reply) => {
    console.log('sending bimbo event');
    socket.broadcast.emit('ferret', data);
  });

  // socket.on('/athlete/create', (req, res) => {
  //   console.log(req, 'req');
  //   console.log(res, 'res');
  //   console.log('it works?');
  // });
};

// module.exports = new Router()
//   .get('/athlete', athleteHandler.getAthlete)
//   .post('/athlete', athleteHandler.postAthlete)
//   .get('/athlete/:id', athleteHandler.getIndividualAthlete)
//   .put('/athlete/update/:id', athleteHandler.updateAthlete)
//   .delete('/athlete/:id', athleteHandler.deleteAthlete)
//   .get('/trainer', trainerHandler.getTrainer)
//   .post('/trainer', trainerHandler.postTrainer)
//   .get('/trainer/:id', trainerHandler.getIndividualTrainer)
//   .put('/trainer/update/:id', trainerHandler.updateTrainer)
//   .delete('/trainer/:id', trainerHandler.deleteTrainer)
//   .post('/gym', gymHandler.getGyms);
