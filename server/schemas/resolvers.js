const { signToken, AuthenticationError } = require('../utils/auth');
const { User } = require('../models');

const resolvers  = {
    Query: {
       me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id });
          }
          throw AuthenticationError;
       },
    },

    Mutation: {

    },
};

module.exports = resolvers;