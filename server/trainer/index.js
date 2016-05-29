exports.getTrainer = function(req, res) {
  res.send('hello');
};

exports.postTrainer = function(req, res) {
  req.models.trainer.create({
    displayName: req.body.displayName,
    name: req.body.name,
    password: req.body.password,
    timeAvailable: req.body.timeAvailable,
    location: req.body.location,
    email: req.body.email,
    driveForClient: req.body.driveForClient,
    offerFitnessAssessment: req.body.offerFitnessAssessment,
    offerNutritionPlan: req.body.offerNutritionPlan,
    price: req.body.price,
    takingNewClients: req.body.takingNewClients,
    phoneNumber: req.body.phoneNumber,
  }, function(err, trainer) {
    if (err) {
      throw err;
    } else {
      res.json(trainer);
    }
  });
};

exports.getIndividualTrainer = function(req, res) {
  req.models.trainer.get(req.params.id, function(err, trainer) {
    if (err) {
      throw err;
    } else {
      res.json(trainer);
    }
  });
};

exports.deleteTrainer = function(req, res) {
  req.models.trainer.get(req.params.id, function(err, trainer) {
    if (err) {
      throw err;
    } else {
      res.send('trainer ' + req.params.id + ' has been deleted');
    }
  });
};
