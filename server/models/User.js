const { Schema, model } = require('mongoose');

const movieWatchedSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: {type: Number, required: true},
    omdbId: {type: String, required: true},
    isWatched: {type: Boolean, require: true, default: true} 
  });

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchedMovies: [movieWatchedSchema],
  completedList: [{
    type: Number,
  }],
  quizHighScore: {
      type: Number
  },
  totalWatchedHours: {
      type: Number
  }
});

const User = model('user', UserSchema);

module.exports = User;
