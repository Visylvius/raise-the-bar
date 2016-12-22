var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var lwip = promise.promisifyAll(require('lwip'));
promise.promisifyAll(require('lwip/lib/Image').prototype);
promise.promisifyAll(require('lwip/lib/Batch').prototype);

exports.getTrainer = function(req, res) {
  req.models.trainer.all(function(err, trainers) {
    if (err) {
      throw err;
    } else {
      res.json(trainers);
    }
  });
};

// exports.postTrainer = function(req, res) {
//   req.models.trainer.create({
//     displayName: req.body.displayName,
//     name: req.body.name,
//     password: req.body.password,
//     timeAvailable: req.body.timeAvailable,
//     location: req.body.location,
//     email: req.body.email,
//     driveForClient: req.body.driveForClient,
//     offerFitnessAssessment: req.body.offerFitnessAssessment,
//     offerNutritionPlan: req.body.offerNutritionPlan,
//     price: req.body.price,
//     takingNewClients: req.body.takingNewClients,
//     phoneNumber: req.body.phoneNumber,
//   }, function(err, trainer) {
//     if (err) {
//       return res.status(500).json({err});
//     } else {
//       const avatar = req.body.avatar.split(',');
//       const imgBuffer = Buffer.from(avatar[1], 'base64');
//       const type = avatar[0].match('/jpeg|png|jpg/');
//       const { x, y, width, height } = req.body.crop;
//       if (!type) {
//         res.status(400).json({err: 'please provide a valid image type'});
//       } else {
//         lwip.openAsync(imgBuffer, 'jpg')
//           .then((img) => {
//             const widthRatio = img.width() /100;
//             const heightRatio = img.height() /100;
//             return img.cropAsync(x * widthRatio, y * heightRatio, (x + width) * widthRatio, (y + height) * heightRatio);
//           })
//           .then((img) => img.resizeAsync(300, 250))
//           .then((img) => img.toBufferAsync('jpg', {quality: 90}))
//           .then((buffer) => fs.writeFileAsync(`../dist/avatars/${athlete.id}.jpg`, buffer))
//           .then(() => res.json(athlete))
//           .catch((err) => {
//             console.log(err);
//             res.sendStatus(500).json({err: 'Image Conversion Error'});
//           });
//         }
//       }
//     }
//   });
// };

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
    imgId: req.body.imgId
  }, function(err, trainer) {
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
          .then((buffer) => fs.writeFileAsync(`../dist/avatars/trainer/${trainer.imgId}.jpg`, buffer))
          .then(() => res.json(trainer))
          .catch((err) => {
            console.log(err);
            res.sendStatus(500).json({err: 'Image Conversion Error'});
          });
        }
      }
    });
  };


exports.getIndividualTrainer = function(req, res) {
    req.models.trainer.get(req.params.id, function(err, trainer) {
      if (err)  return res.status(500).json({err: err});

       trainer.getTrainer_bio(function(err, bio) {
         if (err)   return res.status(500).json({err: err});
        
         return res.json(trainer);
       });
    });
  };
//TODO use the middleware forward req, res, next
//next is going to send everything you want forward
//

exports.deleteTrainer = function(req, res) {
  req.models.trainer.find({email: req.params.email}, (err, trainer) => {
    trainer[0].remove(function(err) {
      if (err) {
        return res.status(500).json({err});
      }
        console.log('user was successfully deleted');
        res.sendStatus(204);
    });
  });
};

exports.updateTrainer = function(req, res) {
  req.models.trainer.get(req.params.id, function(err, trainer) {
    //create bio and update bio into functions
    if (err) {
      throw err;
    } else {
      trainer.displayName = req.body.displayName;
      trainer.name = req.body.name;
      trainer.password = req.body.password;
      trainer.location = req.body.location;
      trainer.email = req.body.email;
      trainer.driveForClient = req.body.driveForClient;
      trainer.offerFitnessAssessment = req.body.offerFitnessAssessment;
      trainer.offerNutritionPlan = req.body.offerNutritionPlan;
      trainer.price = req.body.price;
      trainer.takingNewClients = req.body.takingNewClients;
      trainer.phoneNumber = req.body.phoneNumber;
      trainer.imgId = req.body.imgId;
      trainer.save(function(err) {
        if (err) {
          throw err;
        } else {
          trainer.getTrainer_bio(function(err, bio) {
            if (err) {
              console.log(err);
              res.sendStatus(500).json({err: err});
            } else if (!bio) {
              req.models.bio.create(req.body.bio, function(err, bio) {
                if (err) {
                  res.sendStatus(500).json({err: err});
                } else {
                  trainer.setTrainer_bio(bio, function(err) {
                    if (err) {
                      res.sendStatus(500).json({err: err});
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
                          .then((buffer) => fs.writeFileAsync(`../dist/avatars/trainer/${trainer.imgId}.jpg`, buffer))
                          .then(() => res.json(trainer))
                          .catch((err) => {
                            console.log(err);
                            res.sendStatus(500).json({err: 'Image Conversion Error'});
                          });
                        }
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
                      .then((buffer) => fs.writeFileAsync(`../dist/avatars/trainer/${trainer.imgId}.jpg`, buffer))
                      .then(() => res.json(trainer))
                      .catch((err) => {
                        console.log(err);
                        res.sendStatus(500).json({err: 'Image Conversion Error'});
                      });
                    }
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.showTrainerGyms = function(req, res) {
  const userEmail = req.params.email;
  req.models.trainer.one({email: userEmail}, function(err, trainer) {
    if (err) {
      return res.sendStatus(500).json({err: err});
    } else {
      console.log('trainer', trainer);
      trainer.getGyms(function(err, gyms) {
        console.log('gyms inside of get gyms', gyms);
        if (err) {
          return res.sendStatus(500).json({err: err});
        } else {
          res.send(200, gyms);
        }
      });
    }
  });
};
