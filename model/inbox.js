var orm = require('orm');

module.exports = {
  properties: {
    to: String,
    from: String,
    displayName: String,
    imgId: String,
    userSendingMessageType: String,
    userSendingMessageId: {type: 'integer'},
    recipientType: String,
    recipientId: {type: 'integer'},
    body: String,
    timeSent: {type: 'number'}
  }
};


//TODO

//create model that takes to, from, body, and timestamp

//then build a corresponding actions/reducers/dispatch

//whenever a message populates the database,
//emit an event for the logged user, and then use an action to recieve the message
