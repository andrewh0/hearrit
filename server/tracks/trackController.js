var Track = require('./trackModel.js');

module.exports = {
  addTrack: function(req, res, next) {
    Track.findOne({trackID: req.body.track.trackID})
    .then(function(foundTrack) {
      if (foundTrack) {
        res.json(foundTrack);
      }
      Track.create()
    })
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
    .fail(error) {
      next(error);
    }
  }
}
