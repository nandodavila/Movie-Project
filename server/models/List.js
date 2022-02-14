const { Schema, model } = require('mongoose');
const User = require('./User');

const movieSchema = new Schema({
    title: { type: String, required: true },
    year: {type: Number, required: true},
    omdbId: {type: String, required: true} 
  });

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  movies: [movieSchema],
  // This should reference user in the future for more functionality but simple string is fine for now
  createdBy: {
      username: {
        type: String,
        required: true
      }
  }
})

const List = model('List', listSchema);
module.exports = List;