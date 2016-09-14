var rp = require('request-promise');

exports.getGyms = function(req, res) {
  var address = req.body.address;
  var distance = req.body.distance;
  if (!process.env.API_KEY) {
    var env = require('../../env.js');
  }
  rp('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + process.env.API_KEY)
    .then(function(newAddress) {
      newAddress = JSON.parse(newAddress);
      if (newAddress.status === 'OK' && newAddress.results.length) {
        var location = newAddress.results[0].geometry.location;
        // console.log(location);
        return rp('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location.lat + ',' + location.lng + '&radius=' + distance + '&keyword=gym&key=' + process.env.API_KEY);
      } else {
        throw new Error('Address not found');
      }
    })
    .then(function(gyms) {
      var gymList = JSON.parse(gyms);
      console.log(gymList.results);
      if (gymList.status === 'OK' && gymList.results.length) {
          return new Promise(function(resolve, reject) {
            req.models.gym.create(gymList.results.map(function(gym){
              return {
                name: gym.name,
                placeId: gym.place_id,
                address: gym.vicinity,
                dailyHours: gym.opening_hours,
                photos: gym.photos
              };
            }), function(err, gyms) {
              if (err) {
                reject(err);
              } else {
                resolve(gyms);
              }
            });
          });
      }
    })
    .then(function(gyms) {
      res.send(200, gyms);
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
      console.log(gym);
      res.send(200, gym);
    });
};
