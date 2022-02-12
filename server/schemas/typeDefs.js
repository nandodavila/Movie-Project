const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String!
  email: String!
  watchedMovies: [WatchedMovie]
  completedLists: [List]
  quizHighScore: Int
  totalWatchedHours: Int
}



type WatchedMovie {
    _id: ID!
    title: String!
    year: Int!
    omdbId: String!
    isWatched: Boolean
}

type Auth {
  token: ID
  user: User
}

type List {
    _id: ID!
    name: String!
    message: String!
    badge: String
    movies:[Movie]
    createdBy(_id: String):[User]
}

type Movie {
  _id: ID!
  title: String!
  year: Int!
  omdbId: String!
}

type Query {
  me: User
  users: [User]
  user: User
  lists: [List]
}

input MovieInput {
  title: String!
  year: String!
  omdbId: String!
}

type Mutation {
    createList(name: String!, message: String!, badge: String, movies: [MovieInput], createdBy: String!): List
    updateUser(username: String, email: String, password: String): User
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
