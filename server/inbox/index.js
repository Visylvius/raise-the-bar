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
  const userEmail = req.body.email;
  const userType = req.params.type;
  const userId = req.params.id;

  console.log('user email is', userEmail);
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
};

//TODO make a join table between athlete / trainer called user that takes the trainerId, athleteId, single column is athlete has a 1
//is a trainer has a 0
