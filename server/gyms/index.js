var rp = require('request-promise');

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
      console.log(gym);
      res.send(200, gym);
    });
};

exports.saveSpecificGym = function(req, res) {
  const userEmail = req.body.email;
  const placeId = req.params.placeId;
  const userGym = req.body.gym;
  // console.log('userGym', userGym);
  console.log('req.models', req.models.athlete.one({}, function(err, athlete) {}));
  req.models.athlete.one({email: userEmail}, function(err, athlete) {
    if (err) {
      return res.sendStatus(500).json({err: err});
    }
    //if !athlete then return res.sendStatus(400) <== client problem
    // console.log('athlete', athlete);
    // console.log('a', Object.keys(athlete));
    // console.log('a', Object.keys(athlete.__proto__));
    console.log('userGym in req.models.athlete', userGym.opening_hours);
    req.models.gym.create({
      name: userGym.name,
      placeId: userGym.place_id,
      address: userGym.formatted_address,
      phoneNumber: userGym.formatted_phone_number,
      url: userGym.url,
      dailyHours: userGym.opening_hours
    }, function(err, gym) {
      console.log('gym in models.create', gym);
      if (err) {
        res.sendStatus(500).json({err: err});
      } else {
        //if !gym return sendStaus(400) <== incorrect place id
        athlete.addGyms(gym, function(err) {
          if (err) {
            res.sendStatus(500).json({err: err});
          } else {
            res.send(200, athlete);
          }
        });
      }
    });
  });
};
