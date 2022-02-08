const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const movieWatchedSchema = new Schema({
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
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
  password: {
    type: String,
    required: true,
    bcrypt: true,
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
