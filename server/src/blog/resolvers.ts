import { filter, find } from 'lodash';

import { Author, Post } from './interfaces';

// Fake data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
] as Author[];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
] as Post[];

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => {
      const author = find(authors, { id });
      if (!author) {
        throw new Error(`Couldn't find author with id ${id}`);
      }
      return author;
    },
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId }) as Post | undefined;
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
};

export default resolvers;
