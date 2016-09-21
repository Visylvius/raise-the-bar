exports.getUser = function(req, res) {
  const userEmail = req.params.email;
  req.models.athlete.one({email: userEmail}, function(err, athlete) {
    if (err) {
      return res.sendStatus(500).json({err: err});
    }
    if (athlete) {
      res.status(200).send({type: 'athlete', athlete});
    } else {
      res.status(404).send();
    }
  });
};
