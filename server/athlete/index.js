exports.getAthlete = function(req, res) {
  res.sendStatus(200);
};


exports.postAthlete = function(req, res) {
  req.models.athlete.create({
    displayName: req.body.displayName,
    name: req.body.name,
    liftingStyle: req.body.liftingStyle,
    location: req.body.location,
    trainer: req.body.trainer,
    password: req.body.password,
    hasTrainer: req.body.hasTrainer,
    preferedGyms: req.body.preferedGyms,
    preferedLiftingTimes: req.body.preferedLiftingTimes
  }, function(err, athlete) {
    if (err) {
      throw err;
    } else {
      res.json(athlete);
    }
  });
};

exports.getIndividualAthlete = function(req, res) {
  req.models.athlete.get(req.params.id, function(err, athlete) {
    if (err) {
      throw err;
    } else {
      res.json(athlete);
    }
  });
};

exports.deleteAthlete = function(req, res) {
  req.models.athlete.get(req.params.id, function(err, athlete) {
    if (err) {
      throw err;
    } else {
      res.send('athlete ' + req.params.id + ' has been successfully deleted');
    }
  });
};
