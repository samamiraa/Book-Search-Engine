const { signToken, AuthenticationError } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({ username, email, password });
                const token = signToken(user);

                return { token, user };
            } catch (error) {
                console.error('Error creating user: ', error);
            }
        },
        login: async (parent, { email, password }) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    throw AuthenticationError;
                }

                const checkPw = await user.isCorrectPassword(password);

                if (!checkPw) {
                    throw AuthenticationError;
                }

                const token = signToken(user);
                return { token, user };
            } catch (error) {
                console.error('Error logging in user: ', error);
            }
        },
        saveBook: async (parent, { book }, context) => {
                try {
                    if (context.user) {
                        const { authors, description, title, bookId, image, link } = book;

                        return User.findOneAndUpdate(
                            { _id: context.user._id },
                            { $addToSet: 
                                { savedBooks:  
                                    authors, 
                                    description, 
                                    title, 
                                    bookId, 
                                    image, 
                                    link  
                                } 
                            },
                            { new: true, runValidators: true }
                        )
                    } else {
                        throw AuthenticationError;
                    }
                } catch (error) {
                    console.error('Error saving book: ', error);
                }
        },
    },
};

module.exports = resolvers;