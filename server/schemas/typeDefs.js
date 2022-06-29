const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCar(input: carInput): User
    removeCar(carId: ID!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    carCount: Int
    savedCars: [Car]
  }

  type Car {
    carId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input carInput {
    carId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
