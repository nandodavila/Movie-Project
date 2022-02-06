const { Schema, model } = require('mongoose');
const { type } = require('os');

const movieSchema = new mongoose.Schema({
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
  badges: {
    type: String,
    required: true,
  },
  movies: [movieSchema],
  createdBy: {
      type: String
  }
});

const List = model('list', ListSchema);

module.exports = List;
