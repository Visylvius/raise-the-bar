var athleteSchema = require('./athlete');
var trainerSchema = require('./trainer');
var gymSchema = require('./gym');
var config = {
  define: function(db, models, next) {
    models.athlete = db.define('athlete', athleteSchema.properties);
    models.trainer = db.define('trainer', trainerSchema.properties);
    models.gym = db.define('gym', gymSchema.properties);
    db.sync(function(err) {
      if (err) {
        throw err;
      }
      next();
    });
  }
};

module.exports = config;
