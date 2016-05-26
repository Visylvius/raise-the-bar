var express = require('express');
var app = express();
var port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log('server is listening on' + port);
});

module.exports = app;
