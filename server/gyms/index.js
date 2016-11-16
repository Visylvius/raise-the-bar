var rp = require('request-promise');
var _ = require('underscore');

exports.getGyms = function(req, res) {
  var address = req.body.address;
  var distance = req.body.distance;
  if (!process.env.API_KEY) {
    var env = require('../../env.js');
  }
  rp('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + encodeURIComponent(process.env.API_KEY))
    .then(function(newAddress) {
      newAddress = JSON.parse(newAddress);
      if (newAddress.status === 'OK' && newAddress.results.length) {
        var location = newAddress.results[0].geometry.location;
        // console.log(location);
        return rp('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng) + '&radius=' + encodeURIComponent(distance) + '&keyword=gym&key=' + encodeURIComponent(process.env.API_KEY));
      } else {
        throw new Error('Address not found');
      }
    })
    .then(function(gyms) {
      var gymList = JSON.parse(gyms);
      console.log(gymList.results);
      if (gymList.status === 'OK' && gymList.results.length) {
          // return new Promise(function(resolve, reject) {
          //   req.models.gym.create(gymList.results.map(function(gym){
          //     return {
          //       name: gym.name,
          //       placeId: gym.place_id,
          //       address: gym.vicinity,
          //       dailyHours: gym.opening_hours
          //     };
          //   }), function(err, gyms) {
          //     if (err) {
          //       reject(err);
          //     } else {
          //       resolve(gyms);
          //     }
          //   });
          // });
          res.send(200, gyms);
      }
    })
    .then(function(gyms) {

    })
    .catch(function(err) {
      res.send(500, err.message);
    });
};

exports.getSpecificGym = function(req, res) {
  var placeId = req.params.placeId;
  if (!process.env.API_KEY) {
    var env = require('../../env.js');
  }
  rp('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + process.env.API_KEY)
    .then(function(gym) {
      if (gym.status === 'OK') {
        var photoId = gym.result.photos[0].photo_reference;

      }
      // console.log(gym);
      res.send(200, gym);
    });
};

exports.saveSpecificGym = function(req, res) {
  const userEmail = req.body.email;
  const placeId = req.params.placeId;
  const userGym = req.body.gym;
  const userType = req.body.type;
  const startedWorkingOut = req.body.startedWorkingOut;
  // console.log('userGym', userGym);
  console.log('user type', userType);
  // if (type === 'trainer')
  console.log(userType.type === 'athlete');
  if (userType.type === 'athlete') {
    req.models.athlete.one({email: userEmail}, function(err, athlete) {
      if (err) {
        return res.status(500).json({err: err});
      }
      if (!athlete) {
        return res.status(400);
      }
      //if !athlete then return res.sendStatus(400) <== client problem
      // console.log('athlete', athlete);
      // console.log('a', Object.keys(athlete));
      // console.log('a', Object.keys(athlete.__proto__));
      // console.log('userGym', userGym);
      athlete.getGyms((err, gyms) => {
        const gymValues = _.where(gyms, {placeId});
        console.log('gymValues'. gymValues);
        if (gymValues.length > 0) {
          gym = gymValues[0];
          gym.name = gym.name;
          gym.placeId = gym.placeId;
          gym.address = gym.address;
          gym.id = gym.id;
          gym.phoneNumer = gym.phoneNumber;
          gym.url = gym.url;
          gym.dailyHours = gym.dailyHours;
          gym.extra.startedWorkingOut = gym.startedWorkingOut;
          gym.imgId = gym.photos[0].photo_reference;
          // gym.startedWorkingOut = gym.startedWorkingOut;
          //TODO if save doesn't save the extra.startedWorkingOut
          //try using athlete.addGyms if the gym.save doesn't work.
          gym.save((err) => {
            if (err) {
              return res.status(500).json({err: err});
            }
            console.log('in first if statement');
            res.send(200, gym);
          });
          console.log(gymValues[0].name, 'gymValues');
        } else {
          console.log('in gym models create', userGym.photos ? userGym.photos.length : userGym.photos);
          req.models.gym.create({
            name: userGym.name,
            placeId: userGym.place_id,
            address: userGym.formatted_address,
            phoneNumber: userGym.formatted_phone_number,
            url: userGym.url,
            dailyHours: userGym.opening_hours,
            imgId: userGym.photos && userGym.photos.length > 0 ? userGym.photos[0].photo_reference : null
          }, function(err, gym) {
            // console.log('gym in models.create', gym);
            console.log('inside req.models.create athlete');
            if (err) {
              console.log('err in 129', err);
              res.status(500).json({err: err});
            } else {
              // console.log('athlete line 98', athlete);
              //if !gym return sendStaus(400) <== incorrect place id
              athlete.addGyms(gym, function(err) {
                if (err) {
                  return res.status(500).json({err: err});
                } else {
                  res.send(200, athlete);
                }
              });
            }
          });
        }
      });
      // console.log('userGym in req.models.athlete', userGym);
    });
  } else if (userType.type === 'trainer') {
    req.models.trainer.one({email: userEmail}, function(err, trainer) {
      if (err) {
        return res.sendStatus(500).json({err: err});
      }
      trainer.getGyms((err, gyms) => {
        const gymValues = _.where(gyms, {placeId});
        if (gymValues) {
          gym = gymValues[0];
          gym.name = gym.name;
          gym.placeId = gym.placeId;
          gym.address = gym.address;
          gym.id = gym.id;
          gym.phoneNumer = gym.phoneNumber;
          gym.url = gym.url;
          gym.dailyHours = gym.dailyHours;
          gym.extra.startedWorkingOut = gym.startedWorkingOut;
          gym.imgId = gym.photos[0].photo_reference;
          gym.save((err) => {
            if (err) {
              return res.sendStatus(500).json({err: err});
            }
            console.log('in first if statement');
            res.send(200, gym);
          });
          console.log(gymValues[0].name, 'gymValues');
        } else {
          req.models.gym.create({
            name: userGym.name,
            placeId: userGym.place_id,
            address: userGym.formatted_address,
            phoneNumber: userGym.formatted_phone_number,
            url: userGym.url,
            dailyHours: userGym.opening_hours,
            imgId: userGym.photos[0].photo_reference
          }, function(err, gym) {
            // console.log('gym in models.create', gym);
            // console.log('inside req.models.create athlete');
            if (err) {
              res.sendStatus(500).json({err: err});
            } else {
              // console.log('trainer line 98', trainer);
              //if !gym return sendStaus(400) <== incorrect place id
              trainer.addGyms(gym, function(err) {
                if (err) {
                  return res.sendStatus(500).json({err: err});
                } else {
                  res.send(200, trainer);
                }
              });
            }
          });
        }



      });
      //if !athlete then return res.sendStatus(400) <== client problem
      // console.log('athlete', athlete);
      // console.log('a', Object.keys(athlete));
      // console.log('a', Object.keys(athlete.__proto__));
    });
  }
};

exports.toggleGymToActive = (req, res) => {
  const userEmail = req.body.email;
  const type = req.body.type;
  const placeId = req.params.placeId
  console.log('userEmail', userEmail, 'type', type, 'placeId', placeId);
  if (type === 'athlete') {
    req.models.athlete.one({email: userEmail}, (err, athlete) => {
      athlete.getGyms((err, gyms) => {
        if (err) {
          return res.sendStatus(500).json({err});
        }
        gyms.forEach((gym) => {
          console.log('gym', gym);
          if (gym.placeId === placeId) {
            gym.extra.startedWorkingOut = (Date.now() / 1000);
            gym.save((err) => {
              if (err) {
                return res.send(500);
              }
              console.log(gym);
              res.send(200, gym);
            });
          } else {
            console.log('there is not a match');
          }
        });
      });
    });
  } else if (type === 'trainer') {
    req.models.trainer.one({email: userEmail}, (err, trainer) => {
      trainer.getGyms((err, gyms) => {
        if (err) {
          return res.sendStatus(500).json({err});
        }
        gyms.forEach((gym) => {
          console.log('gym', gym);
          if (gym.placeId === placeId) {
            gym.extra.startedWorkingOut = (Date.now() / 1000);
            gym.save((err) => {
              if (err) {
                return res.send(500);
              }
              console.log(gym);
              res.send(200, gym);
            });
          } else {
            console.log('there is not a match');
          }
        });
      });
    });
  }
};
