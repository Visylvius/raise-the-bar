
exports.getGyms = function(req, res) {
  var address = req.body.address;
  rp('https://maps.googleapis.com/maps/api/geocode/json?' + address + '&key=AIzaSyALGeTDHSBu-A1D8FltPiVBlgJZU7Cpmp0')
    .then(function(address) {
      res.send(address);
    });
};
