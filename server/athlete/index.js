var fs = require('fs');
//why can I use an import statement here?
//i.e import fs from 'fs';



exports.getAthlete = function(req, res) {
  req.models.athlete.all(function(err, athlete) {
    if (err) {
      throw err;
    } else {
      res.json(athlete);
    }
  });
};


exports.postAthlete = function(req, res) {
  req.models.athlete.create({
    displayName: req.body.displayName,
    name: req.body.name,
    liftingStyle: req.body.liftingStyle,
    location: req.body.location,
    trainer: req.body.trainer,
    password: req.body.password,
    hasTrainer: req.body.hasTrainer,
    preferedGyms: req.body.preferedGyms,
    preferedLiftingTimes: req.body.preferedLiftingTimes
  }, function(err, athlete) {
    if (err) {
      throw err;
    } else {
      const avatar = req.body.avatar;
      console.log(avatar);
      // console.log('current directory', __dirname);
      // fs.readFile(avatar, (err, avatar) => {
      //   fs.writeFile('../dist/images/binary_avatar.jpg', avatar, (err) => {});
      //   var base64Image = avatar.toString('base64');
      //   var decodedImage = Buffer.from(base64Image, 'base64');
      //   fs.writeFile('../dist/images/proper_avatar.jpg', decodedImage, (err) => {});
      //   if (err) {
      //     res.sendStatus(404);
      //   } else {

      //   }
      // });
      //use fs to read dataUrl into an img file.
      //save img into dist folder
      //use athlete id as the img name
      //don't send the athlete until the img has been properly saved
      res.json(athlete);
    }
  });
};

exports.getIndividualAthlete = function(req, res) {
  req.models.athlete.get(req.params.id, function(err, athlete) {
    if (err) {
      throw err;
    } else {
      res.json(athlete);
    }
  });
};

exports.deleteAthlete = function(req, res) {
  req.models.athlete.get(req.params.id, function(err, athlete) {
    athlete.remove(function(err) {
      if (err) {
        throw err;
      } else {
        res.sendStatus(204);
      }
    });
  });
};

exports.updateAthlete = function(req, res) {
  req.models.athlete.get(req.params.id, function(err, athlete) {
    if (err) {
      throw err;
    } else {
      athlete.displayName = req.body.displayName;
      athlete.name =  req.body.name;
      athlete.liftingStyle = req.body.liftingStyle;
      athlete.location = req.body.location;
      athlete.trainer = req.body.trainer;
      athlete.password = req.body.password;
      athlete.hasTrainer = req.body.hasTrainer;
      athlete.preferedGyms = req.body.preferedGyms;

      athlete.save(function(err) {
        if (err) {
          throw err;
        } else {
          res.json(athlete);
        }
      });
    }
  });
};
