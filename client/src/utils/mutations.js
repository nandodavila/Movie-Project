import { gql } from '@apollo/client';
// change mutation name
export const CREATE_LIST = gql`
  mutation createList($name: String!, $message: String!, $badge: String, $movies: [MovieInput], $createdBy: CreatedBy!) {
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

export const UPDATE_USER_WATCHED = gql`
mutation updateUserMovie ($UserMovieWatched: UserMovieWatched) {
  updateUserMovie (watchedMovies: $UserMovieWatched) {
    username
    email
		watchedMovies {
    		title
    		year
    		omdbId
    		isWatched
    	}
		}
  }
`

export const UPDATE_COMPLETED_LIST = gql`
mutation updateUserCompletedList ($UserCompletedList: UserCompletedList) {
  updateUserCompletedLists (completedLists: $UserCompletedList) {
    username
    email
		completedLists {
      name
      message
      badge
    }
  }
}
`