const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    popularLyrics: Result
    singleLyric(title: String!): Result
    savedLyrics: [Lyric]
  }

  type Result {
    page: Int
    results: [Lyric]
  }

  type Lyric {
    id: String
    title: String
    overview: String
    poster_path: String
    release_date: String
    vote_average: String
  }

  type User {
    _id: ID
    username: String!
    email: String
    savedLyrics: [Lyric]

  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLyric(id: String, title: String!, overview: String!, poster_path: String!, release_date: String, vote_average: String): User
    removeLyric(id: String!): User
  }
  

`;

module.exports = typeDefs;






