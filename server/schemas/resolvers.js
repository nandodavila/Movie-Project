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
    list: async (parent, {listId}) => {
      return List.findOne({_id: listId})
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
      console.log(args)
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
      if (context.user.email) {
        console.log(args, "this is args UserMovie")

        
        return await User.findOneAndUpdate(
          {email: context.user.email},  
          { $push: {watchedMovies: args.watchedMovies} }, 
          { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUserCompletedList: async (parent, args, context) => {
      console.log(args, "this is args")
      const newListId = args.completedLists._id
      if (context.user.email) {
        console.log(context.user.email);
        return await User.findOneAndUpdate(
          {email: context.user.email},  
          { $push: {completedLists: newListId} }, 
          { new: true }).populate("List");
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;