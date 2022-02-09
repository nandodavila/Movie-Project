import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
      _id
      username
      email
      password
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
        listId
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
      username
      email
      password
      watchedMovies{
        _id
        omdbId
        title
        year
        isWatched
      }
      completedList{
        listId
      }
      quizHighScore
      totalWatchedHours
    }
  }
`;
