var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var lwip = promise.promisifyAll(require('lwip'));
promise.promisifyAll(require('lwip/lib/Image').prototype);
promise.promisifyAll(require('lwip/lib/Batch').prototype);



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
    cardDescription: req.body.cardDescription,
    preferedLiftingTimes: req.body.preferedLiftingTimes
  }, function(err, athlete) {
    if (err) {
      return res.status(500).json({err});
    } else {
      const avatar = req.body.avatar.split(',');
      const imgBuffer = Buffer.from(avatar[1], 'base64');
      const type = avatar[0].match('/jpeg|png|jpg/');
      const { x, y, width, height } = req.body.crop;
      if (!type) {
        res.status(400).json({err: 'please provide a valid image type'});
      } else {
        lwip.openAsync(imgBuffer, 'jpg')
          .then((img) => {
            const widthRatio = img.width() /100;
            const heightRatio = img.height() /100;
            return img.cropAsync(x * widthRatio, y * heightRatio, (x + width) * widthRatio, (y + height) * heightRatio);
          })

          .then((img) => img.resizeAsync(300, 250))
          .then((img) => img.toBufferAsync('jpg', {quality: 90}))
          .then((buffer) => fs.writeFileAsync(`../dist/avatars/${athlete.id}.jpg`, buffer))
          .then(() => res.json(athlete))
          .catch((err) => {
            console.log(err);
            res.sendStatus(500).json({err: 'Image Conversion Error'});
          });
        }
      }

      //Callback Hell
      // if (!type) {
      //   res.status(400).json({err: 'please provide a valid image type'});
      // } else {
      //   lwip.open(imgBuffer, 'jpg', (err, img) => {
      //     if (err) {
      //       console.log(err);
      //       res.status(400).json({err: 'error processing images'});
      //     } else {
      //       const processedImg = img.resize(300, (err, img) => {
      //         if (err) {
      //           console.log(err);
      //           res.sendStatus(500).json({err: 'Server Error'});
      //         } else {
      //           img.toBuffer('jpg', {quality: 90}, (err, buffer) => {
      //             if (err) {
      //               console.log(err);
      //               res.sendStatus(500).json({err: 'Buffer error'});
      //             } else {
      //               fs.writeFile('../dist/images/saved_avatar.jpg', buffer, (err) => {
      //                 if (err) {
      //                   console.log(err);
      //                   return res.status(500).json({err: 'Server Error'});
      //                 } else {
      //                   return res.json(athlete);
      //                 }
      //               });
      //             }
      //           });
      //         }
      //       });
      //     }
      //   });
      // }
    });
  };

//use bluebird.promisify on any any function that takes a callback

exports.getIndividualAthlete = function(req, res) {
  req.models.athlete.get(req.params.id, function(err, athlete) {
    if (err) {
      return res.sendStatus(500).json({error: err});
    } else {
      athlete.getAthlete_bio(function(err, bio) {
        if (err) {
          res.sendStatus(500).json({error: err});
        } else {
          res.json(athlete);
        }
      });
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
    //create bio and update bio into functions
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
      athlete.cardDescription = req.body.cardDescription;

      athlete.save(function(err) {
        if (err) {
          throw err;
        } else {
          athlete.getAthlete_bio(function(err, bio) {
            if (err) {
              console.log(err);
              res.sendStatus(500).json({err: err});
            } else if (!bio) {
              req.models.bio.create(req.body.bio, function(err, bio) {
                if (err) {
                  res.sendStatus(500).json({err: err});
                } else {
                  athlete.setAthlete_bio(bio, function(err) {
                    if (err) {
                      res.sendStatus(500).json({err: err});
                    } else {
                      res.json(athlete);
                    }
                  });
                }
              });
              //change to promises
            } else {
              bio.about = req.body.bio.about;
              bio.liftingStyles = req.body.bio.liftingStyles;
              bio.experience = req.body.bio.experience;
              bio.save(function(err) {
                if (err) {
                  res.sendStatus(500).json({err: 'error saving bio'});
                } else {
                  res.json(athlete);
                }
              });
            }
          });
        }
      });
    }
  });
};
