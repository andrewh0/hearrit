var express = require('express');
var SC = require('node-soundcloud');
var keys = require('./config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
  console.log(req.body.trackID);
  res.json({hello: 'hi'});
});

module.exports = app;
