var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  recommendedTracks: [{
    id: Number,
    title: String,
    artist: String,
    url: String
  }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
