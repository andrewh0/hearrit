var express = require('express');

var app = express();

app.listen(8000);

app.get('/', function(req, res) {
  res.send('hello');
});

module.exports = app;
