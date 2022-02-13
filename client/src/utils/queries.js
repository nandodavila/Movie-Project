import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
      _id
      username
      email
      quizHighScore
      totalWatchedHours
      watchedMovies {
        _id
        omdbId
        title
        year
        isWatched
      }
      completedLists {
        _id
        name
        message
        badge
        movies{
          title
          year
          omdbId
        }
        createdBy
      }
    }
  }
`;

export const GET_LISTS = gql`
query getLists {
    lists {
        _id
        name
        message
        badge
        movies{
          title
          year
          omdbId
        }
    }
}
`;

export const QUERY_USER = gql`
query user  {
    user {
      _id
      username
      email
      quizHighScore
      totalWatchedHours
      watchedMovies {
        _id
        omdbId
        title
        year
        isWatched
      }
      completedLists {
        _id
      }
    }
  }
`

;
