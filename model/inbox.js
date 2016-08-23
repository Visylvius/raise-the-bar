var orm = require('orm');

module.exports = {
  properties: {
    to: String,
    from: String,
    body: String,
  }
};


//TODO

//create model that takes to, from, body, and timestamp

//then build a corresponding actions/reducers/dispatch

//whenever a message populates the database,
//emit an event for the logged user, and then use an action to recieve the message
