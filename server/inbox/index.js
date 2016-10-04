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

exports.sendMessage = function(req, res) {
  console.log(req);
  // var type = req.body.type;
  // var id = req.body.id;
  var to = req.body.to;
  var from = req.body.from;
  var body = req.body.body;

  console.log(to, 'to');
  console.log(body, 'body');
  req.models.inbox.create({
    to: req.body.to,
    from: req.body.from,
    body: req.body.body
  }, function(err, message) {
    if (err) {
      return res.sendStatus(500).json({err: err});
    }
    res.json(message);
  });
};

exports.getMessages = function(req, res) {
  console.log('req.body', req.params);
  const userEmail = req.params.email;
  const userType = req.params.type;
  const userId = req.params.id;

  console.log('user email is', userEmail);
  console.log('userType', userType);
  if (userType === 'athlete') {
    req.models.athlete.find({email: userEmail}, function(err, athlete) {
      console.log(athlete);
      const { id } = athlete[0];
      console.log(id, 'id');
      req.models.inbox.find({to: `/api/athlete/${id}`}, function(err, messages) {
        if (err) {
          res.sendStatus(500).json({err: err});
        } else {
          res.json(messages);
        }
      });
    });
  } else if (userType === 'trainer') {
    req.models.trainer.find({email: userEmail}, function(err, trainer) {
      console.log('trainer line 59', trainer);
      const { id } = trainer[0];
      req.models.inbox.find({to: `/api/trainer/${id}`}, function(err, messages) {
        if (err) {
          return res.sendStatus(500).json(err);
        }
        res.json(messages);
      });
    });
  }
};

//TODO make a join table between athlete / trainer called user that takes the trainerId, athleteId, single column is athlete has a 1
//is a trainer has a 0
