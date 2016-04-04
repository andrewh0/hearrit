var express = require('express');
var SC = require('node-soundcloud');
var keys = require('./config');

SC.init({
  id: keys.clientID,
  secret: keys.clientSecret,
  uri: 'http://example.com/callback'
})

var app = express();

// app.use(__dirname + '/client/');

app.listen(8000);

app.get('/', function(req, res) {
  SC.get('/tracks/13158665', function(err, track) {
    if (err) {
      console.log('err', err);
      // resjson(err);
    } else {
      res.json(track);
    }
  });
});

module.exports = app;
