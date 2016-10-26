var athleteSchema = require('./athlete');
var trainerSchema = require('./trainer');
var gymSchema = require('./gym');
var bioSchema = require('./bio');
var inboxSchema = require('./inbox');

var config = {
  define: function(db, models, next) {
    models.athlete = db.define('athlete', athleteSchema.properties);
    models.trainer = db.define('trainer', trainerSchema.properties);
    models.inbox = db.define('inbox', inboxSchema.properties);
    models.gym = db.define('gym', gymSchema.properties);
    models.bio = db.define('bio', bioSchema.properties);
    models.athlete.hasOne('athlete_bio', models.bio);
    models.trainer.hasOne('trainer_bio', models.bio);
    models.athlete.hasMany('gyms', models.gym, {startedWorkingOut: 'integer'});
    models.trainer.hasMany('gyms', models.gym, {startedWorkingOut: 'integer'});
    db.sync(function(err) {
      if (err) {
        throw err;
      }
      next();
    });
  }
};

module.exports = config;


//TODO add startedWorkingOut to the hasMany table
