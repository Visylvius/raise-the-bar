var express = require('express');
var app = express();

var port = process.env.PORT || 4000;
var routes = require('./routes');
var fs = require('fs');

require('./config/middleware.js')(app, express);
app.use('/api', routes);

var server = app.listen(port, function() {
  console.log('server is listening on ' + port);
});

app.get('*', function(req, res) {
  res.send(fs.readFileSync(__dirname + '/../dist/index.html', 'utf-8'));
});


module.exports = app;
