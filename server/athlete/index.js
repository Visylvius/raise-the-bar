var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var lwip = promise.promisifyAll(require('lwip'));
promise.promisifyAll(require('lwip/lib/Image').prototype);
promise.promisifyAll(require('lwip/lib/Batch').prototype);

const cloudinary = require('../cloudinary-helpers');
const Datauri = require('datauri');

const datauri = new Datauri();

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
    preferedLiftingTimes: req.body.preferedLiftingTimes,
    email: req.body.email,
    imgId: req.body.imgId
  }, function(err, athlete) {
    if (err) {
      return res.status(500).json({err});
    } else {
      const avatar = req.body.avatar.split(',');
      const imgBuffer = Buffer.from(avatar[1], 'base64');
      const type = avatar[0].match('/jpeg|png|jpg/');
      // console.log('imgBuffer', imgBuffer);
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
          .then((buffer) => {
            // console.log('buffer in lwip', Array.isArray(buffer));
            // console.log('athlete.imgId', athlete.imgId);
            datauri.format('jpg', buffer);
            cloudinary.uploadPhoto(datauri.content, athlete.imgId);
            // fs.writeFileAsync(`../dist/avatars/athlete/${athlete.imgId}.jpg`, buffer);
          })
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
      return res.status(500).json({error: err});
    } else {
      athlete.getAthlete_bio(function(err, bio) {
        if (err) {
          res.status(500).json({error: err});
        } else {
          res.json(athlete);
        }
      });
    }
  });
};

exports.deleteAthlete = function(req, res) {
  console.log('req.params', req.params);
  req.models.athlete.find({email: req.params.email}, (err, athlete) => {
    console.log('athlete', athlete);
    athlete[0].remove((err) => {
      if (err) {
        return res.status(500).json({err});
      }
      console.log('athlete was successfully deleted');
      res.sendStatus(204);
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
      athlete.imgId = req.body.imgId;
      athlete.save(function(err) {
        if (err) {
          throw err;
        } else {
          athlete.getAthlete_bio(function(err, bio) {
            console.log('req.body line 151', req.body);
            // console.log('bio line 146', bio.liftingStyles);
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
                          .then((buffer) => fs.writeFileAsync(`../dist/avatars/athlete/${athlete.imgId}.jpg`, buffer))
                          .then(() => res.json(athlete))
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
              console.log('bio line 193', bio);
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
                      .then((buffer) => fs.writeFileAsync(`../dist/avatars/athlete/${athlete.imgId}.jpg`, buffer))
                      .then(() => res.json(athlete))
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


exports.showAthleteGyms = function(req, res) {
  const userEmail = req.params.email;
  req.models.athlete.one({email: userEmail}, function(err, athlete) {
    if (err) {
      return res.sendStatus(500).json({err: err});
    } else {
      athlete.getGyms(function(err, gyms) {

        // const placeId = 'ChIJR9FqTriwj4ARw_N_z-yKat0';
        // gyms.forEach((gym) => {
        //   console.log('gym placeId', gym.placeId);
        // });
        // gyms.filter((gym, index) => {
        //   if (gym.placeId === placeId) {
        //     console.log('I have found the gym with the placeId', gym.placeId, placeId);
        //   } else {
        //     console.log('there is no place with that Id');
        //   }
        // });
        // console.log('gyms', gyms);
        // const gymId = gyms[0].placeId;
        // console.log('gymId', gymId);
        // req.models.gym.

        // gyms.find({name: "The Little Gym of Mountain View"}, function(err, results) {
        //   console.log('results in gyms.find', results);
        // });
        // athlete.hasGyms(, function(err, results) {
        //   console.log('results in gyms.find', results);
        // });
        // console.log('gyms inside of get gyms', gyms);
        if (err) {
          console.log(res.headersSent);
          // console.log(res.sendStatus(500));
          res.status(500);
          console.log(res.headersSent);
          res.json({err});
          // return res.sendStatus(500).json({err: err});
        } else {
          res.send(200, gyms);
        }
      });
    }
  });
};
