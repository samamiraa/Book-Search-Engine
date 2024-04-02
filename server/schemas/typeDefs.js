const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
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
`