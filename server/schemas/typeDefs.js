const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    input BookInput {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
        books: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        saveBook(book: BookInput!): User
        removeBook(bookId: String!): User
    }
`

module.exports = typeDefs;