var express = require('express');
var SC = require('node-soundcloud');
var keys = require('./config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var tracks = require('./tracks/trackController.js');
var Track = require('./tracks/trackModel.js');

SC.init({
  id: keys.clientID,
  secret: keys.clientSecret
  // uri: 'http://example.com/callback'
})

mongoose.connect('mongodb://localhost/hearrit');

var app = express();

app.listen(8000);
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// SC.get('/resolve', {
//   url: 'https://soundcloud.com/kanyewest/ultralight-beam'
// }, function(err, user) {
//   console.log('kanye\'s id', user);
// });

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/api/search', function(req, res) {
  console.log(req.body);
  SC.get('/tracks', req.body.query, function(err, track) {
    if (err) {
      console.log('err', err);
    } else {
      res.json(track);
    }
  });
});

app.post('/api/recommend', function(req, res) {
  console.log('Recommended', req.body.track);
  var selectedTrack = req.body.track;

  Track.findOne({id: selectedTrack.id}, function (error, track) {
    if (error) {
      console.log(error);
    }
    console.log(track);
    if (track === null) {
      // console.log('creating track!');
      Track.create(selectedTrack, function(err, newTrack) {
        if (err) {
          console.log(err);
        }
        newTrack.recommends = 1;
        newTrack.save(function(err, saved) {
          if (err) {
            console.log('Error updating recommend count: ', err);
          }
          res.send(saved);
        });
      });
    } else {
      // if track already exists in the db
      // console.log('recommends++');
      track.recommends += 1;
      track.save(function(err, saved) {
        if (err) {
          console.log('Error updating recommend count: ', err);
        }
        res.send(track);
      });
    }
  });


  // res.json({hello: 'hi'});
});


module.exports = app;
