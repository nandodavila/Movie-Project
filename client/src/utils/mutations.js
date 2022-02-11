import { gql } from '@apollo/client';
// change mutation name
export const CREATE_LIST = gql`
  mutation createList($name: String!, $message: String!, $badge: String, $movies: [MovieInput], $createdBy: String!) {
    createList(name: $name, message: $message, badge: $badge, movies: $movies, createdBy: $createdBy) {
      name
      message
      badge
      movies{
        title
        year
        omdbId
      }
      createdBy{
        username
      }
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
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
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
