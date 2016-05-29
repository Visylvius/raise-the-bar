var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
require('./config/middleware.js')(app, express);
require('./routes')(app);
app.listen(port, function() {
  console.log('server is listening on ' + port);
});

app.get('/', function(req, res) {
  res.send('hello');
});
module.exports = app;
