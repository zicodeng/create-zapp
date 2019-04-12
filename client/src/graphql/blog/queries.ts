import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      title
      author {
        firstName
        lastName
      }
      votes
    }
  }
`;
