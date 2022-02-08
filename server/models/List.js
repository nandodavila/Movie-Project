const { Schema, model } = require('mongoose');
const { type } = require('os');
const User = require('./User');

const movieSchema = new Schema({
    title: { type: String, required: true },
    year: {type: Number, required: true},
    omdbId: {type: String, required: true} 
  });

const ListSchema = new Schema({
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
    type: Schema.Types.String,
    ref: 'user',
  }
})


const List = model('list', ListSchema);

module.exports = List;
