var fs = require('fs');
var lwip = require('lwip');




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
      return res.status(500).json({err});
    } else {
      const avatar = req.body.avatar.split(',');
      const imgBuffer = Buffer.from(avatar[1], 'base64');
      const type = avatar[0].match('/jpeg|png|jpg/');
      if (!type) {
        res.status(400).json({err: 'please provide a valid image type'});
      } else {
        lwip.open(imgBuffer, 'jpg', (err, img) => {
          if (err) {
            console.log(err);
            res.status(400).json({err: 'error processing images'});
          } else {
            const processedImg = img.resize(300, (err, img) => {
              if (err) {
                console.log(err);
                res.sendStatus(500).json({err: 'Server Error'});
              } else {
                img.toBuffer('jpg', {quality: 90}, (err, buffer) => {
                  if (err) {
                    console.log(err);
                    res.sendStatus(500).json({err: 'Buffer error'});
                  } else {
                    fs.writeFile('../dist/images/saved_avatar.jpg', buffer, (err) => {
                      if (err) {
                        console.log(err);
                        return res.status(500).json({err: 'Server Error'});
                      } else {
                        return res.json(athlete);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
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
