const { User, List } = require('../models');
const { AuthenticationError, ValidationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args , context) => {
      if (context.user){
      return User.findOne({ username: context.user.username })
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
    users: async (parent, args, context) => {
      const users = await User.find();
      return users;
    }
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
    }
  }
};

module.exports = resolvers;
