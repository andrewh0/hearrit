var express = require('express');
var SC = require('node-soundcloud');
var keys = require('./config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var tracks = require('./tracks/trackController.js');
var Track = require('./tracks/trackModel.js');
var User = require('./users/userModel.js')

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
      console.log('Error searching for track: ', err);
    } else {
      res.json(track);
    }
  });
});

app.post('/api/recommend', function(req, res) {
  // console.log('Recommended', req.body.track);
  var selectedTrack = req.body.track;
  // var currentUser = req.body.user;
  // Check currentUser to see if track has already been Recommended
  // if already recommended, res.send(track);
  // else...

  Track.findOne({id: selectedTrack.id}, function (error, track) {
    if (error) {
      console.log(error);
    }
    console.log(track);
    if (track === null) {
      Track.create(selectedTrack, function(err, newTrack) {
        if (err) {
          console.log('Error creating a new track', err);
        }
        newTrack.recommends = 1;
        newTrack.save(function(err, saved) {
          if (err) {
            console.log('Error updating recommend count: ', err);
          }
          // SAVE TRACK TO USER DOC
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
        // SAVE TRACK TO USER DOC
        res.send(track);
      });
    }
  });
});

app.post('/api/chart', function(req, res) {
  var currUser = req.body.user;
  Track.find({}, function(error, tracks) {
    if (error) {
      console.log('Error getting chart: ', error);
    }
    res.json(tracks);
  });
});

app.post('/api/login', function(req, res) {
  var password = req.body.password;
  var username = req.body.username;
  User.findOne({username: username}, function(error, user) {
    if (user === null) {
      User.create({
        username: username,
        password: password
      }, function(error, createdUser) {
        res.json(createdUser);
      });
    } else {
      if (user.password === password) {
        res.json(user);
      } else {
        res.json({err: 'Password is incorrect.'});
      }
    }
  })
});
