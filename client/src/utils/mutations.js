import { gql } from '@apollo/client';
// change mutation name
export const CREATE_MATCHUP = gql`
`;

export const CREATE_LIST = gql`
  mutation createList() {
    createList(name: $name, message: $message, badge: $badge, movies: $movies, createdBy: $createdBy) {
      name
      message
      badge
      movies
      createdBy
    }
  }
`;
