// const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args , context) => {
      return User.findOne({ username: context.user.username }).populate('watchedMovies');
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
