exports.getMessage = function(req, res) {
  var to = req.body.to;
  var id = req.params.id;
  var from = req.body.from;
  var body = req.body.body;

  req.models.inbox.get(to, function(err, message) {
    if (err) {
      return res.sendStatus(500).json({err: err});
    }
    res.json(message);
  });
};

exports.sendMessage = function(req, res) {
  var type = req.params.type;
  var id = req.params.id;
  var to = req.body.to;
  var from = req.body.from;
  var body = req.body.body;

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
