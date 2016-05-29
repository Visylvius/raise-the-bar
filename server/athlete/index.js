exports.getAthlete = function(req, res) {
  req.models.athlete.all(function(err, athlete) {
    if (err) {
      throw err;
    } else {
      res.json(athlete);
    }
  });
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
    athlete.remove(function(err) {
      if (err) {
        throw err;
      } else {
        res.sendStatus(204);
      }
    });
  });
};

exports.updateAthlete = function(req, res) {
  req.models.athlete.get(req.params.id, function(err, athlete) {
    if (err) {
      throw err;
    } else {
      athlete.displayName = req.body.displayName;
      athlete.name =  req.body.name;
      athlete.liftingStyle = req.body.liftingStyle;
      athlete.location = req.body.location;
      athlete.trainer = req.body.trainer;
      athlete.password = req.body.password;
      athlete.hasTrainer = req.body.hasTrainer;
      athlete.preferedGyms = req.body.preferedGyms;

      athlete.save(function(err) {
        if (err) {
          throw err;
        } else {
          res.json(athlete);
        }
      });
    }
  });
};
