const { User, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    // users: async () => {
    //   return User.find()
    //     .select('-__v -password')
    //     .populate('comments')
    //     .populate('friends');
    // },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('comments');
    },
    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    }
},

  Mutation: {
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { input }, { user }) => {
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, { user }) => {
      if (user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You have to be logged in!");
    }
  },
  addComment: async (parent, args, context) => {
    if (context.user) {
      const comment = await Comment.create({ ...args, username: context.user.username });

      await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { comments: comment._id } },
        { new: true }
      );

      return comment;
    }

    throw new AuthenticationError('You need to be logged in!');
  },
  addReaction: async (parent, { CommentId, reactionBody }, context) => {
    if (context.user) {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        { $push: { reactions: { reactionBody, username: context.user.username } } },
        { new: true, runValidators: true }
      );

      return updatedComment;
    }

    throw new AuthenticationError('You need to be logged in!');
  },
};

module.exports = resolvers;
