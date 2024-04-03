import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                user {
                    email
                    password
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
            createUser(username: $username, email: $email, password: $password) {
                token
                user {
                    _id
                    bookCount
                    email
                    password
                    username
                    savedBooks {
                    authors
                    bookId
                    description
                    image
                    link
                    title
                }
            }
        }
    }
`