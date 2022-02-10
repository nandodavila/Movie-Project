const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


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
    unique: true,
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

UserSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', UserSchema);

module.exports = User;
