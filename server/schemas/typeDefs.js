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
  me: [User]
  lists: [List]
}

type Mutation {
    createList(name: String!, message: String!): List
}
`;

module.exports = typeDefs;
