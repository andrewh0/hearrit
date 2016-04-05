var Track = require('./trackModel.js');

module.exports = {
  addTrack: function(req, res, next) {
    Track.findOne({trackID: req.body.track.trackID})
    .then(function(foundTrack) {
      if (foundTrack) {
        res.json(foundTrack);
      } else {
        Track.create(req.body.track, function(err, track) {
          if (err) {
            console.log('Error creating new track: ', err);
            next(err);
          }
          console.log('Track has been added to the DB');
          res.json(track);
        });
      }
    })
    // .catch(function(error) {
    //   next(error);
    // })
  },
  addRecommend: function(req, res, next) {
    Track.findOne({trackID: req.body.track.trackID})
    .then(function(track) {
      if (!track) {
        next(new Error('Could not find track with ID:', req.body.track.trackID));
      }
      track.trackID++;
      track.save(function(err, savedTrack) {
        if (err) {
          console.log('Error saving track', err);
          next(err);
        }
        res.json(savedTrack);
      })
    })
    .fail(function(error) {
      next(error);
    })
  }
}
