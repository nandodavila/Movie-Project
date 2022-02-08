import { gql } from '@apollo/client';
// change mutation name
export const CREATE_LIST = gql`
  mutation createList($name: String!, $message: String!, $badge: String) {
    createList(name: $name, message: $message, badge: $badge, movies: $movies, createdBy: $createdBy) {
      name
      message
      badge
      movies
      createdBy
    }
  }
`;

 export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }`
;

  export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }`
;
