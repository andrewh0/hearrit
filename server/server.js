var express = require('express');
var SC = require('node-soundcloud');
var keys = require('./config');

SC.init({
  id: keys.clientID,
  secret: keys.clientSecret
  // uri: 'http://example.com/callback'
})

var app = express();


app.listen(8000);
app.use(express.static('client'));

// SC.get('/resolve', {
//   url: 'https://soundcloud.com/kanyewest/ultralight-beam'
// }, function(err, user) {
//   console.log('kanye\'s id', user);
// });

app.get('/', function(req, res) {
  SC.get('/tracks', {q: 'buskers'}, function(err, track) {
    if (err) {
      console.log('err', err);
      // resjson(err);
    } else {
      // res.json(track);
      res.render('index');
    }
  });
});

app.get('/songs', function(req, res) {
  SC.get('/tracks', {q: 'buskers'}, function(err, track) {
    if (err) {
      console.log('err', err);
      // resjson(err);
    } else {
      // res.json(track);
      res.render('index');
    }
  });
});

module.exports = app;
