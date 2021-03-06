var express = require('express');
var SC = require('node-soundcloud');
var keys = require('./config');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var Track = require('./tracks/trackModel.js');
var User = require('./users/userModel.js')

SC.init({
  id: keys.clientID,
  secret: keys.clientSecret
})

mongoose.connect('mongodb://localhost/hearrit');

var app = express();

app.listen(8000);
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'THIS IS A SECRET.'
}));

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
  var selectedTrack = req.body.track;
  var currentUser = req.session.user;

  var alreadyRecommended = function() {
    for (var i = 0; i < currentUser.recommendedTracks.length; i++) {
      if (currentUser.recommendedTracks[i].id === selectedTrack.id) {
        return true;
      }
    }
    return false;
  }

  if (alreadyRecommended()) {
    res.send(selectedTrack);
  } else {
    Track.findOne({id: selectedTrack.id}, function (error, track) {
      if (error) {
        console.log(error);
      }
      if (track === null) {
        Track.create(selectedTrack, function(err, newTrack) {
          if (err) {
            console.log('Error creating a new track', err);
          }
          newTrack.recommends = 1;
          newTrack.save(function(err, savedTrack) {
            if (err) {
              console.log('Error updating recommend count: ', err);
            }
            // SAVE TRACK TO USER DOC
            User.findOneAndUpdate(
              {username: currentUser.username},
              {$push: {recommendedTracks: savedTrack}},
              {upsert: false},
              function(error, user) {
                if (error) {
                  console.log('Error', error);
                }
                currentUser.recommendedTracks.push(savedTrack);
                res.send(savedTrack);
              }
            );
          });
        });
      } else {
        track.recommends += 1;
        track.save(function(err, savedTrack) {
          if (err) {
            console.log('Error updating recommend count: ', err);
          }
          User.findOneAndUpdate(
            {username: currentUser.username},
            {$push: {recommendedTracks: savedTrack}},
            {upsert: false},
            function(error, user) {
              if (error) {
                console.log('Error', error);
              }
              console.log('THE USER IS: ', user);
              currentUser.recommendedTracks.push(savedTrack);
              res.send(savedTrack);
            }
          );
        });
      }
    });
  }
});

app.get('/api/recommended', function(req, res) {
  var user = req.session;
  User.findOne({username: user.user.username}, function(err, foundUser) {
    if (err) {
      console.log('Error getting user:', err);
    }
    res.json(foundUser);
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
        req.session.regenerate(function(err) {
          if (err) {
            console.log('Could not create session: ', err);
          }
          req.session.user = createdUser;
          res.json(createdUser);
        });
      });
    } else {
      if (user.password === password) {
        req.session.regenerate(function(err) {
          if (err) {
            console.log('Could not create session: ', err);
          }
          req.session.user = user;
          res.json(user); 
        });
      } else {
        res.json({err: 'Password is incorrect.'});
      }
    }
  })
});

app.get('/api/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log('Could not sign out properly', err);
    }
    res.status(200).send();
  });
});
