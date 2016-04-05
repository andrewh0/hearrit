var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
  id: Number,
  title: String,
  artist: String,
  url: String,
  recommends: Number
});

var Track = mongoose.model('Track', trackSchema);
