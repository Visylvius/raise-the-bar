// exports.getMessages = function(req, res) {
//   var finalQuery = '/api/' + req.params.to + '/' + req.params.id;
//   console.log(finalQuery, 'finalQuery');
//
//   req.models.inbox.find({to: finalQuery}, function(err, messages) {
//     if (err) {
//       res.sendStatus(500).json({err: err});
//     } else {
//       res.json(messages);
//     }
//   });
// };

exports.sendMessage = (req, res) => {
  const from = req.body.from;
  const userSendingMessageType = req.body.userSendingMessageType;
  const recipientId = req.body.recipientId;
  const recipientType = req.body.recipientType;
  const to = req.body.to;
  const body = req.body.body;
  const timeSent = req.body.timeSent;
  console.log('timeSent', timeSent);
  console.log('timeSentType', typeof timeSent);
  console.log('from', from);
  console.log('userSendingMessage', userSendingMessageType);
  if (userSendingMessageType === 'athlete') {
    console.log('in userSendingMessage');
    req.models.athlete.find({email: from}, (err, athlete) => {
      console.log('in callback', err, athlete);
      if (err) {
        return res.sendStatus(500).json({err});
      }
      console.log('athlete', athlete[0].imgId);
      console.log('timeSent', timeSent);
      req.models.inbox.create({
        to,
        from,
        displayName: athlete[0].displayName,
        imgId: athlete[0].imgId,
        recipientId,
        recipientType,
        userSendingMessageType,
        userSendingMessageId: athlete[0].id,
        body,
        timeSent
      }, (error, message) => {
        console.log('outside of create', message);
        if (error) {
          return res.status(500).json({error});
        }
      res.json(message);
      });
    });
  } else if (userSendingMessageType === 'trainer') {
    req.models.trainer.find({email: from}, (err, trainer) => {
      if (err) {
        return res.sendStatus(500).json({err});
      }
      req.models.inbox.create({
        to,
        from,
        displayName: trainer[0].displayName,
        imgId: trainer[0].imgId,
        recipientId,
        recipientType,
        userSendingMessageType,
        userSendingMessageId: trainer[0].id,
        body,
        timeSent
      }, (error, message) => {
        if (error) {
          return res.status(500).json({error});
        }
        res.json(message);
      });
    });
  }
};

exports.getMessages = (req, res) => {
  console.log('req.body', req.params);
  const userEmail = req.params.email;
  const userType = req.params.type;
  const userId = req.params.id;

  console.log('user email is', userEmail);
  console.log('userType', userType);
  if (userType === 'athlete') {
    req.models.athlete.find({email: userEmail}, (err, athlete) => {
      console.log(athlete);
      const { id } = athlete[0];
      console.log(id, 'id');
      req.models.inbox.find({to: `/api/athlete/${id}`}, (error, messages) => {
        if (error) {
          res.sendStatus(500).json({err});
        } else {
          res.json(messages);
        }
      });
    });
  } else if (userType === 'trainer') {
    req.models.trainer.find({email: userEmail}, (err, trainer) => {
      console.log('trainer line 59', trainer);
      const { id } = trainer[0];
      req.models.inbox.find({to: `/api/trainer/${id}`}, (error, messages) => {
        if (error) {
          return res.sendStatus(500).json(err);
        }
        res.json(messages);
      });
    });
  }
};

exports.deleteMessage = (req, res) => {
  req.models.inbox.get(req.params.id, (error, message) => {
    if (error) {
      return res.status(500).json({error});
    }
    console.log('message was found', message);
    message.remove((err) => {
      if (err) {
        return res.status(500).json({err});
      }
      console.log('message was successfully deleted');
      res.sendStatus(204);
    });
  });
};
