const { User, List } = require('../models');
const { AuthenticationError, ValidationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args , context) => {
      if (context.user){
        const currentUser = await User.findOne({ email: context.user.email})
      return currentUser
      }
      throw new ValidationError('Cannot find this user!');
    },
    lists: async (parent, args) => {
      return List.find({})
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({});

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    createList: async (parent, args) => {
      const list = await List.create(args)
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    updateUserMovie: async (parent, args, context) => {
      if (context.user.username) {
        console.log(args, "this is args")
        return await User.findOneAndUpdate(
          {email: context.user.username},  
          { $push: {watchedMovies: args.watchedMovies} }, 
          { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUserCompletedList: async (parent, {completedLists}, context) => {

      const newListId = completedLists.map((list)=>list._id)
      const newCompletedList = await List.findOne({_id: newListId});
      if (context.user) {
        console.log(context.user);
        return await User.findOneAndUpdate(
          {_id: context.user._id},  
          { $push: {completedLists: newCompletedList} }, 
          { new: true });
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
