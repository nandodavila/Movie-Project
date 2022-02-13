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
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

const List = model('List', listSchema);
module.exports = List;