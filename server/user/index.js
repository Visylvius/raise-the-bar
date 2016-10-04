exports.getUser = function(req, res) {
  const userEmail = req.params.email;
  req.models.athlete.one({email: userEmail}, function(err, athlete) {
    if (err) {
      return res.sendStatus(500).json({err: err});
    }
    if (athlete) {
      res.status(200).send({type: 'athlete', athlete});
    } else {
      req.models.trainer.one({email: userEmail}, function(err, trainer) {
        if (err) {
          return res.sendStatus(500).json({err});
        }
        if (trainer) {
          res.status(200).send({type: 'trainer', trainer});
        } else {
          res.status(200).send({type: 'not found'});
        }
      });
    }
  });
};
