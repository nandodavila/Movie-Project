const { User, List } = require('../models');
const { AuthenticationError, ValidationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args , context) => {
      if (context.user.username){
      return User.findOne({ username: context.user.username }).populate('watchedMovies');
      }
      throw new ValidationError('Cannot find this user!');
    },
    lists: async (parent, args) => {
      return Lists.find({}).populate('movies');
    },
  },
  // Mutation: {
  //   createMatchup: async (parent, args) => {
  //     const matchup = await Matchup.create(args);
  //     return matchup;
  //   },
  //   createVote: async (parent, { _id, techNum }) => {
  //     const vote = await Matchup.findOneAndUpdate(
  //       { _id },
  //       { $inc: { [`tech${techNum}_votes`]: 1 } },
  //       { new: true }
  //     );
  //     return vote;
  //   },
  // },
};

module.exports = resolvers;
