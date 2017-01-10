var express = require('express');
var app = express();

var port = process.env.PORT || 4000;
var routes = require('./routes');
var fs = require('fs');
var cloudinary = require('cloudinary');
const path = require('path');

require('./config/middleware.js')(app, express);
app.use('/api', routes);

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

var server = app.listen(port, function() {
  console.log('server is listening on ' + port);
});

app.get('/*', function(req, res) {
  console.log('dirname', __dirname);
  res.sendFile('../../dist/index.html');
});

module.exports = app;
